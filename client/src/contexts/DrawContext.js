import { createContext, useEffect, useReducer } from 'react'
// utils
import axios from '../utils/axios'

// ----------------------------------------------------------------------

const initialState = {
  isCreatedEvent: false,
  current_event: null,
  tables: [],
  users: [],
  days: [],
  expectedUsersAmount: 0,
  currentDay: 1,
  finalWinner: [],
  tickets: [],
  avatars: [],
  loading: false,
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
  SET_LOADING: (state, action) => {
    return {
      ...state,
      loading: action.payload,
    }
  },
  SET_CURRENT_EVENT: (state, action) => {
    const { current_event } = action.payload

    return {
      ...state,
      isCreatedEvent: true,
      current_event,
    }
  },
  SET_TABLES: (state, action) => {
    const { tables, currentDay } = action.payload
    return {
      ...state,
      tables,
      currentDay,
    }
  },
  SET_USERS: (state, action) => {
    const { users } = action.payload
    return {
      ...state,
      users: [...state.users, ...users],
    }
  },
  SET_EXPECTED_USERS_AMOUNT: (state, action) => {
    const { expectedUsersAmount } = action.payload
    return {
      ...state,
      expectedUsersAmount,
    }
  },
  CLEAR_USERS: (state, action) => {
    return {
      ...state,
      users: [],
    }
  },
  SET_DAYS: (state, action) => {
    const { days } = action.payload
    return {
      ...state,
      days,
    }
  },
  PRODUCTS: (state, action) => {
    const { products } = action.payload
    return {
      ...state,
      products,
    }
  },
  SET_FINAL_WINNER: (state, action) => {
    return {
      ...state,
      finalWinner: action.payload,
    }
  },
  SET_TICKETS: (state, action) => {
    console.log(action.payload)
    return {
      ...state,
      tickets: action.payload,
    }
  },
  SET_AVATARS: (state, action) => {
    const { avatars } = action.payload
    console.log(avatars)
    return {
      ...state,
      avatars: avatars,
    }
  },
}

const reducer = (state, action) =>
  handlers[action.type] ? handlers[action.type](state, action) : state

const DrawContext = createContext({
  ...initialState,
  create_event: () => Promise.resolve(),
  create_sEvent: () => Promise.resolve(),
  create_mEvent: () => Promise.resolve(),

  getRandomTables: () => Promise.resolve(),
  getRandomTablesByUserId: () => Promise.resolve(),
  getSearchData: () => Promise.resolve(),
  clearUsers: () => Promise.resolve(),
  getRandomTablesByDayIdAndRoomNumber: () => Promise.resolve(),

  // Mr.new
  getAllDays: () => Promise.resolve(),
  getSatelliteUsersByEventId: () => Promise.resolve(),
  searchSatelliteUsersBySatelliteEventId: () => Promise.resolve(),
  getEventById: () => Promise.resolve(),

  getProducts: () => Promise.resolve(),
  purchase: () => Promise.resolve(),
  getCurrentEvent: () => Promise.resolve(),

  // playgame
  assignSatelliteTable: () => Promise.resolve(),
  makeTable: () => Promise.resolve(),
  roomDraw: () => Promise.resolve(),
  endDay: () => Promise.resolve(),
  finalRoom: () => Promise.resolve(),
  getFinalWinner: () => Promise.resolve(),
  getFinalWinnerBypage: () => Promise.resolve(),

  sendEmailToAdmin: () => Promise.resolve(),
  getAllUsers: () => Promise.resolve(),
  getTicketsByUserId: () => Promise.resolve(),
  getAllAvatars: () => Promise.resolve(),
  updatePassword: () => Promise.resolve(),
  create_mock: () => Promise.resolve(),
})

function DrawProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    const initialize = async () => {}

    initialize()
  }, [])

  // Create Events

  const create_event = async (data) => {
    dispatch({
      type: 'SET_LOADING',
      payload: true,
    })
    const response = await axios.post('/api/draw/create_event', data)
    dispatch({
      type: 'SET_LOADING',
      payload: false,
    })

    if (response.data === 'OK') {
      dispatch(getCurrentEvent())
      dispatch(getAllDays())
    }
  }

  const create_sEvent = async (data) => {
    const response = await axios.post('/api/draw/create_sEvent', data)
    const { current_event } = response.data

    dispatch({
      type: 'SET_CURRENT_EVENT',
      payload: {
        current_event,
      },
    })
  }

  const create_mEvent = async (data) => {
    const response = await axios.post('/api/draw/create_mEvent', data)

    const { current_event } = response.data

    dispatch({
      type: 'SET_CURRENT_EVENT',
      payload: {
        current_event,
      },
    })
  }

  /**
   * Get 12 random tables
   */
  const getRandomTables = async () => {
    const response = await axios.post('/api/draw/getRandomTables')
    const { status, data } = response
    if (status === 200) {
      dispatch(getAllDays())
      dispatch(getFinalWinner())
      dispatch({
        type: 'SET_TABLES',
        payload: {
          tables: data,
        },
      })
    }
  }

  /**
   * Get 12 random tables by user id
   * @param {string} userId
   */
  const getRandomTablesByUserId = async (userId, currentDay) => {
    const response = await axios.post(
      `/api/draw/getRandomTablesByUserId/${userId}/${currentDay - 1}`,
    )
    const { status, data } = response

    if (status === 200) {
      dispatch(getAllDays())
      dispatch(getFinalWinner())
      dispatch({
        type: 'SET_TABLES',
        payload: {
          tables: data.table,
          currentDay
        },
      })
    }
  }

  /**
   * Search users
   * @param {string} key
   * @param {object} pageData
   */
  const getSearchData = async (key, pageData) => {
    const response = !!key
      ? await axios.post('/api/draw/search', { ...pageData, key })
      : await axios.post('/api/draw/getAllUsers', pageData)
    const { status, data } = response
    if (status === 200) {
      dispatch({
        type: 'SET_EXPECTED_USERS_AMOUNT',
        payload: {
          expectedUsersAmount: data.metadata[0] ? data.metadata[0].total : 0,
        },
      })
      dispatch({
        type: 'SET_USERS',
        payload: {
          users: data.data,
        },
      })
    }
  }

  const clearUsers = () => {
    dispatch({
      type: 'CLEAR_USERS',
      payload: {
        users: [],
      },
    })
  }

  const getRandomTablesByDayIdAndRoomNumber = async (reqData) => {
    const response = await axios.post(
      '/api/draw/getRandomTablesByDayIdAndRoomNumber',
      reqData,
    )
    const { status, data } = response

    if (status === 200) {
      dispatch({
        type: 'SET_TABLES',
        payload: {
          tables: data,
          currentDay: reqData.dayNum,
        },
      })
      dispatch(getAllDays())
      dispatch(getCurrentEvent())
      dispatch(getFinalWinner())
    }
  }

  const getAllDays = async () => {
    const response = await axios.post('/api/draw/getAllDays')
    const { status, data } = response

    if (status === 200) {
      dispatch({
        type: 'SET_DAYS',
        payload: {
          days: data,
        },
      })
    }
  }

  const getProducts = async () => {
    const response = await axios.post('/api/draw/products')
    const { products } = response.data

    dispatch({
      type: 'PRODUCTS',
      payload: {
        products,
      },
    })
  }

  const purchase = async (user) => {
    let cart = JSON.parse(localStorage.getItem('cart'))
    const response = await axios.post('/api/draw/payment', { cart, user })

    // if (response.data.xStatus === 'Approved') {
    if (response.data === 'OK') {
      window.localStorage.removeItem('products')
      window.localStorage.removeItem('cart')
      window.location.href = '/thanks'
    }
  }

  const getCurrentEvent = async () => {
    const response = await axios.post('/api/draw/current_event')
    const { current_event } = response.data
    const firstData = current_event

    dispatch({
      type: 'SET_CURRENT_EVENT',
      payload: {
        current_event: firstData,
      },
    })
  }

  // Play Game

  const assignSatelliteTable = async (id, roomNum) => {
    const response = await axios.post('/api/draw/assignSatelliteTable', {
      satelliteId: id,
      roomnumber: roomNum,
    })

    if (response.data === 'OK') {
      dispatch(getAllDays())
      dispatch(getCurrentEvent())
    } else if('not exist') {
      window.alert(
        'There is no this ticket.',
      )
    } else {
      window.alert(
        'This room is ' + response.data + '. Please choose another room.',
      )
    }
  }

  const makeTable = async () => {
    dispatch({
      type: 'SET_LOADING',
      payload: true,
    })
    const response = await axios.post('/api/draw/makeTable')
    dispatch({
      type: 'SET_LOADING',
      payload: false,
    })
    if (response.data === 'OK') {
      dispatch(getAllDays())
      dispatch(getCurrentEvent())
    } else {
      window.alert(response.data)
    }
  }

  const roomDraw = async (roomId, daynumber) => {
    dispatch({
      type: 'SET_LOADING',
      payload: true,
    })
    const response = await axios.post(
      '/api/draw/roomDraw/' + roomId + '/' + daynumber,
    )
    dispatch({
      type: 'SET_LOADING',
      payload: false,
    })

    if (response.data === 'OK') {
      dispatch(getCurrentEvent())
      dispatch(getAllDays())
    }
  }

  const endDay = async (daynumber) => {
    dispatch({
      type: 'SET_LOADING',
      payload: true,
    })
    const response = await axios.post('/api/draw/endDay/' + daynumber)
    dispatch({
      type: 'SET_LOADING',
      payload: false,
    })

    if (response.data === 'OK') {
      dispatch(getCurrentEvent())
      dispatch(getAllDays())
    }
  }

  const finalRoom = async (winner) => {
    dispatch({
      type: 'SET_LOADING',
      payload: true,
    })
    const response = await axios.post('/api/draw/finalRoom/' + winner)
    dispatch({
      type: 'SET_LOADING',
      payload: false,
    })
    window.alert('Event Finished')
    if (response.data === 'OK') {
      dispatch(getCurrentEvent())
      dispatch(getAllDays())
    }
  }

  const getFinalWinner = async () => {
    const response = await axios.post('/api/draw/getFinalWinner')

    if (response.data) {
      dispatch({
        type: 'SET_FINAL_WINNER',
        payload: response.data,
      })
    }
  }

  const getFinalWinnerBypage = async (pageData) => {
    const response = await axios.post('/api/draw/getFinalWinnerBypage')

    if (response.data) {
      dispatch({
        type: 'SET_FINAL_WINNER',
        payload: response.data,
      })
    }
  }

  // Mr.new

  const getSatelliteUsersByEventId = async (eventId, pageData) => {
    const response = await axios.put(
      `/api/draw/getSatelliteUsersByEventId/${eventId}`,
      pageData,
    )
    const { status, data } = response

    if (status === 200) {
      console.log(data)
      dispatch({
        type: 'SET_EXPECTED_USERS_AMOUNT',
        payload: {
          expectedUsersAmount: data.metadata[0] ? data.metadata[0].total : 0,
        },
      })
      dispatch({
        type: 'SET_USERS',
        payload: {
          users: data.data,
        },
      })
    }
  }

  const searchSatelliteUsersBySatelliteEventId = async (
    satelliteEventId,
    reqData,
  ) => {
    const response = await axios.put(
      `/api/draw/searchSatelliteUsersBySatelliteEventId/${satelliteEventId}`,
      reqData,
    )
    const { status, data } = response

    if (status === 200) {
      dispatch({
        type: 'SET_EXPECTED_USERS_AMOUNT',
        payload: {
          expectedUsersAmount: data.metadata[0] ? data.metadata[0].total : 0,
        },
      })
      dispatch({
        type: 'SET_USERS',
        payload: {
          users: data.data,
        },
      })
    }
  }

  const getEventById = async (eventId) => {
    const response = await axios.post(`/api/draw/getEventById/${eventId}`)
    const { status, data } = response
    if (status === 200) {
      await dispatch({
        type: 'SET_CURRENT_EVENT',
        payload: {
          current_event: data,
        },
      })
    }
  }

  /**
   * Send user's email to the admin's email account
   * @param {object} messageData
   * @returns
   */
  const sendEmailToAdmin = async (messageData) => {
    const response = await axios.post('/api/draw/sendEmailToAdmin', messageData)
    return response
  }

  /**
   * Get all users without regarding if he/she purchased some ticket
   * @param {object} pageData
   */
  const getAllUsers = async (pageData) => {
    const response = await axios.post('/api/account/getAllUsers', {...pageData})
    console.log(response)
    const { status, data } = response
    if (status === 200) {
      dispatch({
        type: 'SET_EXPECTED_USERS_AMOUNT',
        payload: {
          expectedUsersAmount: data.totalNumber,
        },
      })
      dispatch({
        type: 'SET_USERS',
        payload: {
          users: data.data,
        },
      })
    }
  }

  const updatePassword = async (data) => {
    console.log(data)
    const response = await axios.post('/api/draw/resetPassword', data)
    console.log('response', response.data)
    return response.data
  }

  const getAllAvatars = async () => {
    const response = await axios.post('/api/account/getAllAvatars')
    const { status, data } = response
    if (status === 200) {
      dispatch({
        type: 'SET_AVATARS',
        payload: {
          avatars: data,
        },
      })
    }
  }

  const getTicketsByUserId = async (userId) => {
    const response = await axios.post(`/api/draw/getTicketsByUserId/${userId}`)
    const { status, data } = response
    if (status === 200) {
      dispatch({
        type: 'SET_TICKETS',
        payload: data,
      })
    }
  }

  const create_mock = async (mockdata) => {
    dispatch({
      type: 'SET_LOADING',
      payload: true,
    })
    const response = await axios.post('/api/draw/create_mock', mockdata)
    dispatch({
      type: 'SET_LOADING',
      payload: false,
    })
    // const { status, data } = response
    if (response.data === 'OK') {
      dispatch(getCurrentEvent())
      dispatch(getAllDays())
    }
  }

  return (
    <DrawContext.Provider
      value={{
        ...state,
        create_event,
        create_sEvent,
        create_mEvent,
        getRandomTables,
        getRandomTablesByUserId,
        getSearchData,
        clearUsers,
        getProducts,
        purchase,
        getAllDays,
        getCurrentEvent,
        assignSatelliteTable,
        makeTable,
        roomDraw,
        getSatelliteUsersByEventId,
        searchSatelliteUsersBySatelliteEventId,
        getEventById,
        getRandomTablesByDayIdAndRoomNumber,
        endDay,
        finalRoom,
        getFinalWinner,
        getFinalWinnerBypage,
        sendEmailToAdmin,
        getAllUsers,
        getTicketsByUserId,
        getAllAvatars,
        updatePassword,
        create_mock,
      }}
    >
      {children}
    </DrawContext.Provider>
  )
}

export { DrawContext, DrawProvider }
