import { prisma } from "../../utils/db.util.js";

export async function fnPolicyList({ limit = 10, page = 1, search = "" }) {
  const safe_limit = Number.isFinite(Number(limit)) && Number(limit) > 0 ? Number(limit) : 10;
  const safe_page = Number.isFinite(Number(page)) && Number(page) > 0 ? Number(page) : 1;
  const skip = (safe_page - 1) * safe_limit;

  const where = search
    ? { OR: [{ name: { contains: search } }, { description: { contains: search } }] }
    : {};

  const [policies, total] = await Promise.all([
    prisma.policy.findMany({ where, orderBy: { created_at: "desc" }, skip, take: safe_limit }),
    prisma.policy.count({ where }),
  ]);

  return { limit: safe_limit, page: safe_page, total, policies };
}

export async function fnPolicyGet(id) {
  const policy = await prisma.policy.findUnique({ where: { id: Number(id) } });
  if (!policy) throw new Error("Policy not found");
  return policy;
}

export async function fnPolicyCreate(name, description) {
  const policy = await prisma.policy.create({ data: { name, description } });
  return await fnPolicyGet(policy.id);
}

export async function fnPolicyUpdate(id, { name, description }) {
  const data = {};
  if (name !== undefined) data.name = name;
  if (description !== undefined) data.description = description;
  if (Object.keys(data).length === 0) throw new Error("No fields to update");

  await prisma.policy.update({ where: { id: Number(id) }, data });
  return await fnPolicyGet(id);
}

export async function fnPolicyDelete(id) {
  const deleted = await prisma.policy.delete({ where: { id: Number(id) } }).catch(() => null);
  if (!deleted) throw new Error("Policy not found");
  return true;
}

export async function fnPolicyAssign(role_id, policy_id) {
  await prisma.rolePolicy.create({
    data: { role: { connect: { id: Number(role_id) } }, policy: { connect: { id: Number(policy_id) } } },
  });
  return true;
}

export async function fnPolicyRemove(role_id, policy_id) {
  const removed = await prisma.rolePolicy.deleteMany({ where: { role_id: Number(role_id), policy_id: Number(policy_id) } });
  if (removed.count === 0) throw new Error("Policy assignment not found");
  return true;
}
