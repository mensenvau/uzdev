import { sendForbidden } from '../utils/response.util.js'
import { query } from '../config/db.config.js'

/**
 * Check if user has required policy
 * @param {number} userId - User ID
 * @param {string} policyName - Required policy name
 * @returns {Promise<boolean>}
 */
export async function userHasPolicy(userId, policyName) {
  const result = await query(
    `SELECT COUNT(*) as count
     FROM user_roles ur
     JOIN role_policies rp ON ur.role_id = rp.role_id
     JOIN policies p ON rp.policy_id = p.id
     WHERE ur.user_id = ? AND p.name = ?`,
    [userId, policyName]
  )

  return result[0].count > 0
}

/**
 * Policy middleware factory
 * Returns middleware that checks for required policy
 * @param {string} requiredPolicy - Required policy name
 * @returns {Function} Express middleware
 */
export function policyMiddleware(requiredPolicy) {
  return async (req, res, next) => {
    try {
      // User must be authenticated (set by authMiddleware)
      if (!req.user) {
        return sendForbidden(res, 'Authentication required')
      }

      const hasPolicy = await userHasPolicy(req.user.id, requiredPolicy)

      if (!hasPolicy) {
        return sendForbidden(res, `Missing required policy: ${requiredPolicy}`)
      }

      next()
    } catch (error) {
      console.error('Policy middleware error:', error)
      return sendForbidden(res, 'Policy check failed')
    }
  }
}

/**
 * Check multiple policies (user needs at least one)
 * @param {Array<string>} policies - Array of policy names
 * @returns {Function} Express middleware
 */
export function anyPolicyMiddleware(policies) {
  return async (req, res, next) => {
    try {
      if (!req.user) {
        return sendForbidden(res, 'Authentication required')
      }

      for (const policy of policies) {
        const hasPolicy = await userHasPolicy(req.user.id, policy)
        if (hasPolicy) {
          return next()
        }
      }

      return sendForbidden(res, `Missing required policies: ${policies.join(', ')}`)
    } catch (error) {
      console.error('Policy middleware error:', error)
      return sendForbidden(res, 'Policy check failed')
    }
  }
}

/**
 * Check multiple policies (user needs all of them)
 * @param {Array<string>} policies - Array of policy names
 * @returns {Function} Express middleware
 */
export function allPoliciesMiddleware(policies) {
  return async (req, res, next) => {
    try {
      if (!req.user) {
        return sendForbidden(res, 'Authentication required')
      }

      for (const policy of policies) {
        const hasPolicy = await userHasPolicy(req.user.id, policy)
        if (!hasPolicy) {
          return sendForbidden(res, `Missing required policy: ${policy}`)
        }
      }

      next()
    } catch (error) {
      console.error('Policy middleware error:', error)
      return sendForbidden(res, 'Policy check failed')
    }
  }
}

export default {
  policyMiddleware,
  anyPolicyMiddleware,
  allPoliciesMiddleware,
  userHasPolicy
}
