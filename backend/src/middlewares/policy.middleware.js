import { sendForbidden } from "../utils/response.util.js";
import { queryMany } from "../utils/db.util.js";

export async function userHasPolicy(user_id, policy_name) {
  const result = await queryMany(
    `SELECT COUNT(*) as count
     FROM system_user_roles ur
     JOIN system_role_policies rp ON ur.role_id = rp.role_id
     JOIN system_policies p ON rp.policy_id = p.id
     WHERE ur.user_id = ? AND p.name = ?`,
    [user_id, policy_name]
  );
  return result[0].count > 0;
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
