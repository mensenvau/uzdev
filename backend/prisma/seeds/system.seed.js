import { prisma } from "../../src/utils/db.util.js";
import { hashPassword } from "../../src/utils/password.util.js";

async function upsertRole(name, description) {
  return prisma.role.upsert({
    where: { name },
    update: { description },
    create: { name, description },
  });
}

async function upsertPolicy(name, description) {
  return prisma.policy.upsert({
    where: { name },
    update: { description },
    create: { name, description },
  });
}

/**
 * System Module Seed
 * Seeds core authentication and authorization data (system_* tables)
 */
export default async function systemSeed() {
  console.log("🌱 Seeding System module...");
  const roles = {
    super: await upsertRole("super", "Full system access"),
    admin: await upsertRole("admin", "Administrative access"),
    user: await upsertRole("user", "Standard user access"),
    guest: await upsertRole("guest", "Limited guest access"),
  };

  const policy_names = [
    ["me.delete", "Delete own account"],
    ["me.edit", "Edit own profile"],
    ["me.get", "Get own profile"],
    ["form.access_manage", "Manage form access"],
    ["form.create", "Create forms"],
    ["form.delete", "Delete forms"],
    ["form.edit", "Edit forms"],
    ["form.get", "Get form details"],
    ["form.list", "List forms"],
    ["form.review", "Review form responses"],
    ["form.submit", "Submit form responses"],
    ["form.view_responses", "View form responses"],
    ["group.assign", "Add user to group"],
    ["group.create", "Create groups"],
    ["group.delete", "Delete groups"],
    ["group.edit", "Edit groups"],
    ["group.get", "Get group details"],
    ["group.list", "List groups"],
    ["group.remove", "Remove user from group"],
    ["policy.assign", "Assign policies to roles"],
    ["policy.create", "Create policies"],
    ["policy.delete", "Delete policies"],
    ["policy.edit", "Edit policies"],
    ["policy.get", "Get policy details"],
    ["policy.list", "List policies"],
    ["role.assign", "Assign roles to users"],
    ["role.create", "Create roles"],
    ["role.delete", "Delete roles"],
    ["role.edit", "Edit roles"],
    ["role.get", "Get role details"],
    ["role.list", "List roles"],
    ["role.remove", "Remove role from user"],
    ["user.create", "Create users"],
    ["user.delete", "Delete users"],
    ["user.edit", "Edit users"],
    ["user.get", "Get user details"],
    ["user.list", "List users"],
  ];

  const policies = {};
  for (const [name, description] of policy_names) {
    policies[name] = await upsertPolicy(name, description);
  }

  await prisma.rolePolicy.deleteMany({});
  const policy_ids = Object.values(policies).map((p) => p.id);

  await prisma.$transaction([
    prisma.rolePolicy.createMany({
      data: policy_ids.map((policy_id) => ({ role_id: roles.super.id, policy_id })),
      skipDuplicates: true,
    }),
    prisma.rolePolicy.createMany({
      data: policy_ids.filter((id) => !["policy.delete", "role.delete", "user.delete"].includes(Object.values(policies).find((p) => p.id === id)?.name)).map((policy_id) => ({ role_id: roles.admin.id, policy_id })),
      skipDuplicates: true,
    }),
    prisma.rolePolicy.createMany({
      data: ["form.get", "form.list", "form.submit", "me.edit", "me.get"]
        .map((name) => policies[name]?.id)
        .filter(Boolean)
        .map((policy_id) => ({ role_id: roles.user.id, policy_id })),
      skipDuplicates: true,
    }),
    prisma.rolePolicy.createMany({
      data: ["me.get"]
        .map((name) => policies[name]?.id)
        .filter(Boolean)
        .map((policy_id) => ({ role_id: roles.guest.id, policy_id })),
      skipDuplicates: true,
    }),
  ]);

  await prisma.group.deleteMany({});
  await prisma.group.createMany({
    data: [
      { name: "Development", description: "Development team" },
      { name: "HR", description: "Human resources" },
      { name: "Marketing", description: "Marketing team" },
    ],
    skipDuplicates: true,
  });

  const admin_email = "balkibumen@gmail.com";
  const admin_password_hash = await hashPassword("Admin@123");
  const super_user = await prisma.user.upsert({
    where: { email: admin_email },
    update: { password: admin_password_hash, default_role_id: roles.super.id },
    create: {
      email: admin_email,
      username: "admin",
      first_name: "UK",
      last_name: "",
      phone: "+998900000001",
      password: admin_password_hash,
      default_role_id: roles.super.id,
    },
  });

  await prisma.userRole.createMany({
    data: [{ user_id: super_user.id, role_id: roles.super.id }],
    skipDuplicates: true,
  });

  console.log("✅ System module seed completed.");
}
