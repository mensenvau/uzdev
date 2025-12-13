import { sendForbidden } from '../utils/response.util.js'
import { queryMany } from '../utils/db.util.js'

export async function userHasPolicy(userId, policyName) {
  const result = await queryMany(
    `SELECT COUNT(*) as count
     FROM user_roles ur
     JOIN role_policies rp ON ur.role_id = rp.role_id
     JOIN policies p ON rp.policy_id = p.id
     WHERE ur.user_id = ? AND p.name = ?`,
    [userId, policyName]
  )

  return result[0].count > 0
}

export function policyMiddleware(requiredPolicy) {
  return async (req, res, next) => {
    try {
      if (!req.user) {
        return sendForbidden(res, 'Authentication required')
      }

      const hasPolicy = await userHasPolicy(req.user.id, requiredPolicy)

      if (!hasPolicy) {
        return sendForbidden(res, `Missing required policy: ${requiredPolicy}`)
      }

      next()
    } catch (error) {
      return sendForbidden(res, 'Policy check failed')
    }
  }
}

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
      return sendForbidden(res, 'Policy check failed')
    }
  }
}

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
