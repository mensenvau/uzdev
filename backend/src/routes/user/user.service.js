import { hashPassword } from "../../utils/password.util.js";
import { prisma } from "../../utils/db.util.js";

export async function fnUserList({ limit = 10, page = 1, search = "" }) {
  const safe_limit = Number.isFinite(Number(limit)) && Number(limit) > 0 ? Number(limit) : 10;
  const safe_page = Number.isFinite(Number(page)) && Number(page) > 0 ? Number(page) : 1;
  const skip = (safe_page - 1) * safe_limit;

  const where = search ? { OR: [{ email: { contains: search } }, { first_name: { contains: search } }, { last_name: { contains: search } }, { phone: { contains: search } }] } : {};

  const [users, total] = await Promise.all([
    prisma.user.findMany({
      where,
      select: { id: true, email: true, first_name: true, last_name: true, phone: true, created_at: true, default_role_id: true },
      orderBy: { created_at: "desc" },
      take: safe_limit,
      skip,
    }),
    prisma.user.count({ where }),
  ]);

  return { limit: safe_limit, page: safe_page, total, users };
}

export async function fnUserGet(id) {
  const user = await prisma.user.findUnique({
    where: { id: Number(id) },
    include: {
      roles: { include: { role: true } },
      groups: { include: { group: true } },
      default_role: true,
    },
  });
  if (!user) throw new Error("User not found");
  return {
    id: user.id,
    email: user.email,
    first_name: user.first_name,
    last_name: user.last_name,
    phone: user.phone,
    created_at: user.created_at,
    default_role_id: user.default_role_id,
    default_role: user.default_role,
    roles: user.roles.map((ur) => ur.role),
    groups: user.groups.map((ug) => ug.group),
  };
}

export async function fnUserCreate(email, password, first_name, last_name, phone) {
  const hashed_password = await hashPassword(password);
  const user = await prisma.user.create({
    data: { email, username: email, first_name, last_name, phone, password: hashed_password },
  });
  return await fnUserGet(user.id);
}

export async function fnUserUpdate(id, { email, first_name, last_name, phone, default_role_id }) {
  const data = {};

  if (email !== undefined) data.email = email;
  if (first_name !== undefined) data.first_name = first_name;
  if (last_name !== undefined) data.last_name = last_name;
  if (phone !== undefined) data.phone = phone;

  if (default_role_id !== undefined) {
    const hasRole = await prisma.userRole.findFirst({
      where: { user_id: Number(id), role_id: Number(default_role_id) },
      select: { id: true },
    });
    if (!hasRole) throw new Error("Default role must be one of the user's roles");
    data.default_role_id = Number(default_role_id);
  }

  if (Object.keys(data).length === 0) throw new Error("No fields to update");

  await prisma.user.update({ where: { id: Number(id) }, data });
  return await fnUserGet(id);
}

export async function fnUserDelete(id) {
  try {
    await prisma.user.delete({ where: { id: Number(id) } });
    return true;
  } catch (error) {
    throw new Error("User not found");
  }
}
