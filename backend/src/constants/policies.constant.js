/**
 * System policies (permissions)
 */
export const POLICIES = {
  // Self management
  ME_GET: 'me.get',
  ME_EDIT: 'me.edit',
  ME_DELETE: 'me.delete',

  // User management
  USER_LIST: 'user.list',
  USER_GET: 'user.get',
  USER_CREATE: 'user.create',
  USER_EDIT: 'user.edit',
  USER_DELETE: 'user.delete',

  // Role management
  ROLE_LIST: 'role.list',
  ROLE_GET: 'role.get',
  ROLE_CREATE: 'role.create',
  ROLE_EDIT: 'role.edit',
  ROLE_DELETE: 'role.delete',
  ROLE_ASSIGN: 'role.assign',

  // Policy management
  POLICY_LIST: 'policy.list',
  POLICY_GET: 'policy.get',
  POLICY_CREATE: 'policy.create',
  POLICY_EDIT: 'policy.edit',
  POLICY_DELETE: 'policy.delete',
  POLICY_ASSIGN: 'policy.assign',

  // Group management
  GROUP_LIST: 'group.list',
  GROUP_GET: 'group.get',
  GROUP_CREATE: 'group.create',
  GROUP_EDIT: 'group.edit',
  GROUP_DELETE: 'group.delete',
  GROUP_ASSIGN: 'group.assign',

  // Form management
  FORM_LIST: 'form.list',
  FORM_GET: 'form.get',
  FORM_CREATE: 'form.create',
  FORM_EDIT: 'form.edit',
  FORM_DELETE: 'form.delete',
  FORM_SUBMIT: 'form.submit',
  FORM_VIEW_RESPONSES: 'form.view_responses',
  FORM_REVIEW: 'form.review',
  FORM_ACCESS_MANAGE: 'form.access_manage'
}

export default POLICIES
