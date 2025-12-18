/**
 * Policy Middleware
 * Checks user permissions using role-based policies
 */

const { sendForbidden } = require('../utils/response.util');
const { query } = require('../utils/db');

/**
 * Check if user has a specific policy
 * @param {number} userId - User ID
 * @param {string} policyName - Policy name to check
 * @returns {Promise<boolean>} True if user has the policy
 */
async function userHasPolicy(userId, policyName) {
  const sql = `
    SELECT DISTINCT p.name
    FROM system_users u
    INNER JOIN system_user_roles ur ON ur.user_id = u.id
    INNER JOIN system_role_policies rp ON rp.role_id = ur.role_id
    INNER JOIN system_policies p ON p.id = rp.policy_id
    WHERE u.id = ? AND p.name = ?
    LIMIT 1
  `;

  const results = await query(sql, [userId, policyName]);
  return results.length > 0;
}

/**
 * Middleware to check single policy
 * @param {string} requiredPolicy - Policy name required
 * @returns {Function} Express middleware
 */
function policyMiddleware(requiredPolicy) {
  return async (req, res, next) => {
    try {
      if (!req.user) {
        return sendForbidden(res, 'Authentication required');
      }

      const hasPolicy = await userHasPolicy(req.user.id, requiredPolicy);

      if (!hasPolicy) {
        return sendForbidden(res, `Missing required policy: ${requiredPolicy}`);
      }

      next();
    } catch (error) {
      console.error('Policy check error:', error);
      return sendForbidden(res, 'Policy check failed');
    }
  };
}

/**
 * Middleware to check if user has ANY of the specified policies
 * @param {string[]} policies - Array of policy names
 * @returns {Function} Express middleware
 */
function anyPolicyMiddleware(policies) {
  return async (req, res, next) => {
    try {
      if (!req.user) {
        return sendForbidden(res, 'Authentication required');
      }

      for (const policy of policies) {
        const hasPolicy = await userHasPolicy(req.user.id, policy);
        if (hasPolicy) {
          return next();
        }
      }

      return sendForbidden(res, `Missing required policies: ${policies.join(', ')}`);
    } catch (error) {
      console.error('Policy check error:', error);
      return sendForbidden(res, 'Policy check failed');
    }
  };
}

/**
 * Middleware to check if user has ALL of the specified policies
 * @param {string[]} policies - Array of policy names
 * @returns {Function} Express middleware
 */
function allPoliciesMiddleware(policies) {
  return async (req, res, next) => {
    try {
      if (!req.user) {
        return sendForbidden(res, 'Authentication required');
      }

      for (const policy of policies) {
        const hasPolicy = await userHasPolicy(req.user.id, policy);
        if (!hasPolicy) {
          return sendForbidden(res, `Missing required policy: ${policy}`);
        }
      }

      next();
    } catch (error) {
      console.error('Policy check error:', error);
      return sendForbidden(res, 'Policy check failed');
    }
  };
}

module.exports = {
  policyMiddleware,
  anyPolicyMiddleware,
  allPoliciesMiddleware,
  userHasPolicy,
};
