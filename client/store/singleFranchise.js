import axios from 'axios'

/**
 * ACTION TYPES
 */
const SET_SINGLE_FRANCHISE = 'SET_SINGLE_FRANCHISE'

/**
 * ACTION CREATORS
 */
export const setSingleFranchise = franchise => ({
  type: SET_SINGLE_FRANCHISE,
  franchise
})

/**
 * THUNK CREATORS
 */
export const fetchSingleFranchise = franchiseId => {
  return async dispatch => {
    try {
      const response = await axios.get(`/api/franchises/${franchiseId}`)
      const action = setSingleFranchise(response.data)
      dispatch(action)
    } catch (err) {
      console.error(err)
    }
  }
}

/**
 * REDUCER
 */
const singlefranchiseReducer = (state = [], action) => {
  switch (action.type) {
    case SET_SINGLE_FRANCHISE:
      return action.franchise
    default:
      return state
  }
}

export default singlefranchiseReducer
