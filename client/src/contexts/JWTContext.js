import React, { createContext, useEffect, useReducer } from 'react'
// utils
import axios from '../utils/axios'
import { isValidToken, setSession } from '../utils/jwt'

// ----------------------------------------------------------------------

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  user: null,
  authModal: null,
}

const handlers = {
  INITIALIZE: (state, action) => {
    const { isAuthenticated, user } = action.payload
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user,
    }
  },
  LOGIN: (state, action) => {
    const { user } = action.payload

    return {
      ...state,
      isAuthenticated: true,
      user,
    }
  },
  LOGOUT: (state) => ({
    ...state,
    isAuthenticated: false,
    user: null,
  }),
  REGISTER: (state, action) => {
    const { user } = action.payload

    return {
      ...state,
      isAuthenticated: true,
      user,
    }
  },
  AUTH_MODAL: (state, action) => {
    const { authModal } = action.payload
    return {
      ...state,
      authModal,
    }
  },
  SET_USER: (state, action) => {
    const { user } = action.payload
    return {
      ...state,
      user,
    }
  },
}

const reducer = (state, action) =>
  handlers[action.type] ? handlers[action.type](state, action) : state

const AuthContext = createContext({
  ...initialState,
  method: 'jwt',
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve(),
  updateProfile: () => Promise.resolve(),
  setUser: () => Promise.resolve(),
})

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    const initialize = async () => {
      try {
        const accessToken = window.localStorage.getItem('accessToken')
        const user = window.localStorage.getItem('user')

        if (accessToken && isValidToken(accessToken)) {
          dispatch({
            type: 'INITIALIZE',
            payload: {
              isAuthenticated: true,
              user: JSON.parse(user),
            },
          })
        } else {
          dispatch({
            type: 'INITIALIZE',
            payload: {
              isAuthenticated: false,
              user: null,
            },
          })
        }
      } catch (err) {
        console.error(err)
        dispatch({
          type: 'INITIALIZE',
          payload: {
            isAuthenticated: false,
            user: null,
          },
        })
      }
    }

    initialize()
  }, [])

  const setUser = (user) => {
    dispatch({
      type: 'SET_USER',
      payload: user,
    })
  }

  const login = async (email, password) => {
    const response = await axios.post('/api/account/login', {
      email,
      password,
    })
    const { accessToken, user } = response.data

    setSession(accessToken, user)
    dispatch({
      type: 'LOGIN',
      payload: {
        user,
      },
    })
  }

  const register = async (data) => {
    try {
      const response = await axios.post('/api/account/register', data)
      const { accessToken, user } = response
      setSession(accessToken, user)
      dispatch({
        type: 'LOGIN',
        payload: {
          user,
        },
      })
      console.log(response)
      // return response
    } catch (error) {
      console.log(error)
      return error
    }
  }
  const updateProfile = async (data) => {
    const response = await axios.post('/api/account/update', data)

    const { user } = response.data

    window.localStorage.setItem('user', JSON.stringify(user))

    dispatch({
      type: 'REGISTER',
      payload: {
        user,
      },
    })

    if (response.status === 200) {
      window.alert('Successfully updated.')
      dispatch(logout())
    }
  }

  const verifyEmail = async (token) => {
    const response = await axios.post('/api/account/verifyEmail', { token })

    const { accessToken, user } = response.data

    window.localStorage.setItem('accessToken', accessToken)
    dispatch({
      type: 'REGISTER',
      payload: {
        user,
      },
    })
  }

  const logout = async () => {
    setSession(null)
    dispatch({ type: 'LOGOUT' })
  }

  const setAuthModal = (authModal) => {
    dispatch({
      type: 'AUTH_MODAL',
      payload: {
        authModal,
      },
    })
  }

  const resetPassword = () => {}

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: 'jwt',
        login,
        logout,
        register,
        resetPassword,
        updateProfile,
        setAuthModal,
        verifyEmail,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider }
