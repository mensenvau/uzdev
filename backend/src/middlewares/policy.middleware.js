import { sendForbidden } from "../utils/response.util.js";
import { prisma } from "../utils/prisma.util.js";

export async function userHasPolicy(user_id, policy_name) {
  const roles = await prisma.userRole.findMany({
    where: { user_id: Number(user_id) },
    select: {
      role: {
        select: {
          policies: {
            select: {
              policy: { select: { name: true } },
            },
          },
        },
      },
    },
  });

  return roles.some((role_link) => role_link.role.policies.some((role_policy) => role_policy.policy.name === policy_name));
}

export function policyMiddleware(required_policy) {
  return async (req, res, next) => {
    try {
      if (!req.user) {
        return sendForbidden(res, "Authentication required");
      }

      const has_policy = await userHasPolicy(req.user.id, required_policy);
      if (!has_policy) {
        return sendForbidden(res, `Missing required policy: ${required_policy}`);
      }

      next();
    } catch (error) {
      return sendForbidden(res, "Policy check failed");
    }
  };
}

export function anyPolicyMiddleware(policies) {
  return async (req, res, next) => {
    try {
      if (!req.user) {
        return sendForbidden(res, "Authentication required");
      }

      for (const policy of policies) {
        const has_policy = await userHasPolicy(req.user.id, policy);
        if (has_policy) {
          return next();
        }
      }

      return sendForbidden(res, `Missing required policies: ${policies.join(", ")}`);
    } catch (error) {
      return sendForbidden(res, "Policy check failed");
    }
  };
}

export function allPoliciesMiddleware(policies) {
  return async (req, res, next) => {
    try {
      if (!req.user) {
        return sendForbidden(res, "Authentication required");
      }

      for (const policy of policies) {
        const has_policy = await userHasPolicy(req.user.id, policy);
        if (!has_policy) {
          return sendForbidden(res, `Missing required policy: ${policy}`);
        }
      }

      next();
    } catch (error) {
      return sendForbidden(res, "Policy check failed");
    }
  };
}

export default {
  policyMiddleware,
  anyPolicyMiddleware,
  allPoliciesMiddleware,
  userHasPolicy,
};
