import axios from 'axios'

/**
 * ACTION TYPES
 */
const SET_MOVIE_FRANCHISE = 'SET_MOVIE_FRANCHISE'

/**
 * ACTION CREATORS
 */
export const setMovieFranchise = movies => ({type: SET_MOVIE_FRANCHISE, movies})

/**
 * THUNK CREATORS
 */
export const fetchMovieFranchise = franchiseId => {
  return async dispatch => {
    try {
      const response = await axios.get(`/api/movies/${franchiseId}`)
      console.log('response?', response)
      const action = setMovieFranchise(response.data)
      console.log('action?', response.data)
      dispatch(action)
    } catch (err) {
      console.error(err)
    }
  }
}

/**
 * REDUCER
 */
const movieFranchiseReducer = (state = [], action) => {
  switch (action.type) {
    case SET_MOVIE_FRANCHISE:
      return action.movies
    default:
      return state
  }
}

export default movieFranchiseReducer
