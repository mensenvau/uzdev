const { prisma } = require('../../utils/prisma.util');

async function fnRoleList({ limit = 10, page = 1, search = "" }) {
  const safe_limit = Number.isFinite(Number(limit)) && Number(limit) > 0 ? Number(limit) : 10;
  const safe_page = Number.isFinite(Number(page)) && Number(page) > 0 ? Number(page) : 1;
  const skip = (safe_page - 1) * safe_limit;

  const where = search
    ? {
        OR: [{ name: { contains: search } }, { description: { contains: search } }],
      }
    : {};

  const [roles, total] = await Promise.all([
    prisma.role.findMany({ where, orderBy: { created_at: "desc" }, skip, take: safe_limit }),
    prisma.role.count({ where }),
  ]);

  return { limit: safe_limit, page: safe_page, total, roles };
}

async function fnRoleGet(id) {
  const role = await prisma.role.findUnique({
    where: { id: Number(id) },
    include: {
      policies: { include: { policy: true } },
      users: { include: { user: true } },
    },
  });

  if (!role) throw new Error("Role not found");

  return {
    id: role.id,
    name: role.name,
    description: role.description,
    created_at: role.created_at,
    policies: role.policies.map((rp) => rp.policy),
    users: role.users.map((ur) => ur.user),
  };
}

async function fnRoleCreate(name, description) {
  const role = await prisma.role.create({ data: { name, description } });
  return await fnRoleGet(role.id);
}

async function fnRoleUpdate(id, { name, description }) {
  const data = {};
  if (name !== undefined) data.name = name;
  if (description !== undefined) data.description = description;
  if (Object.keys(data).length === 0) throw new Error("No fields to update");

  await prisma.role.update({ where: { id: Number(id) }, data });
  return await fnRoleGet(id);
}

async function fnRoleDelete(id) {
  try {
    await prisma.role.delete({ where: { id: Number(id) } });
    return true;
  } catch (error) {
    throw new Error("Role not found");
  }
}

async function fnRoleAssign(user_id, role_id) {
  await prisma.userRole.create({
    data: { user: { connect: { id: Number(user_id) } }, role: { connect: { id: Number(role_id) } } },
  });
  return true;
}

async function fnRoleRemove(user_id, role_id) {
  const removed = await prisma.userRole.deleteMany({ where: { user_id: Number(user_id), role_id: Number(role_id) } });
  if (removed.count === 0) throw new Error("Role assignment not found");

  const user = await prisma.user.findUnique({ where: { id: Number(user_id) }, select: { default_role_id: true } });
  if (user?.default_role_id === Number(role_id)) {
    const replacement = await prisma.userRole.findFirst({ where: { user_id: Number(user_id) }, select: { role_id: true } });
    await prisma.user.update({ where: { id: Number(user_id) }, data: { default_role_id: replacement?.role_id ?? null } });
  }
  return true;
}

module.exports = {
  fnRoleList,
  fnRoleGet,
  fnRoleCreate,
  fnRoleUpdate,
  fnRoleDelete,
  fnRoleAssign,
  fnRoleRemove,
};
