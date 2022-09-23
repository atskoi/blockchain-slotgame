import PropTypes from 'prop-types'
import { Navigate } from 'react-router-dom'
// routes
import { PATH_AUTH, PATH_USER } from '../routes/paths'

// ----------------------------------------------------------------------

AdminGuard.propTypes = {
  children: PropTypes.node,
}

export default function AdminGuard({ children }) {
  // const { isAuthenticated, user } = useAuth()
  const user = JSON.parse(window.localStorage.getItem('user'))

  if (!user) {
    return <Navigate to={PATH_AUTH.login} />
  } else if (user.role !== 'admin') {
    return <Navigate to={PATH_USER.home} />
  }

  return <>{children}</>
}
