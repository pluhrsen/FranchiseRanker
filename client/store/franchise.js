import axios from 'axios'

/**
 * ACTION TYPES
 */
const SET_FRANCHISES = 'SET_FRANCHISES'

/**
 * ACTION CREATORS
 */
export const setFranchises = franchises => ({type: SET_FRANCHISES, franchises})

/**
 * THUNK CREATORS
 */
export const fetchFranchises = () => {
  return async dispatch => {
    try {
      const response = await axios.get('api/franchises')
      const action = setFranchises(response.data)
      dispatch(action)
    } catch (err) {
      console.error(err)
    }
  }
}

/**
 * REDUCER
 */
const franchiseReducer = (state = [], action) => {
  switch (action.type) {
    case SET_FRANCHISES:
      return action.franchises
    default:
      return state
  }
}

export default franchiseReducer
