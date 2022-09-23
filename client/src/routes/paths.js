// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`
}

const ROOTS_ADMIN = '/admin'
const ROOTS_AUTH = '/auth'

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login'),
  loginUnprotected: path(ROOTS_AUTH, '/login-unprotected'),
  register: path(ROOTS_AUTH, '/register'),
  registerUnprotected: path(ROOTS_AUTH, '/register-unprotected'),
  resetPassword: path(ROOTS_AUTH, '/reset-password'),
  verify: path(ROOTS_AUTH, '/verify'),
}

export const PATH_USER = {
  home: '/',
}

export const PATH_DASHBOARD = {
  root: ROOTS_ADMIN,
  userManagement: path(ROOTS_ADMIN, '/userManagement'),
  eventManagement: path(ROOTS_ADMIN, '/eventManagement'),
}
