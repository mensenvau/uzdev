import { prisma } from "../../utils/prisma.util.js";

export async function fnGroupList({ limit = 10, page = 1, search = "" }) {
  const safe_limit = Number.isFinite(Number(limit)) && Number(limit) > 0 ? Number(limit) : 10;
  const safe_page = Number.isFinite(Number(page)) && Number(page) > 0 ? Number(page) : 1;
  const skip = (safe_page - 1) * safe_limit;

  const where = search
    ? { OR: [{ name: { contains: search } }, { description: { contains: search } }] }
    : {};

  const [groups, total] = await Promise.all([
    prisma.group.findMany({ where, orderBy: { created_at: "desc" }, skip, take: safe_limit }),
    prisma.group.count({ where }),
  ]);

  return { limit: safe_limit, page: safe_page, total, groups };
}

export async function fnGroupGet(id) {
  const group = await prisma.group.findUnique({
    where: { id: Number(id) },
    include: { users: { include: { user: true } } },
  });

  if (!group) throw new Error("Group not found");

  return { ...group, users: group.users.map((gu) => gu.user) };
}

export async function fnGroupCreate(name, description) {
  const group = await prisma.group.create({ data: { name, description } });
  return await fnGroupGet(group.id);
}

export async function fnGroupUpdate(id, { name, description }) {
  const data = {};
  if (name !== undefined) data.name = name;
  if (description !== undefined) data.description = description;
  if (Object.keys(data).length === 0) throw new Error("No fields to update");

  await prisma.group.update({ where: { id: Number(id) }, data });
  return await fnGroupGet(id);
}

export async function fnGroupDelete(id) {
  const result = await prisma.group.delete({ where: { id: Number(id) } }).catch(() => null);
  if (!result) throw new Error("Group not found");
  return true;
}

export async function fnGroupAssign(group_id, user_id) {
  await prisma.groupUser.create({ data: { group_id: Number(group_id), user_id: Number(user_id) } });
  return true;
}

export async function fnGroupRemove(group_id, user_id) {
  const removed = await prisma.groupUser.deleteMany({ where: { group_id: Number(group_id), user_id: Number(user_id) } });
  if (removed.count === 0) throw new Error("User not in group");
  return true;
}
