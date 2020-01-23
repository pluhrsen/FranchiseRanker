import axios from 'axios'

/**
 * ACTION TYPES
 */
const SET_MOVIE_FRANCHISE = 'SET_MOVIE_FRANCHISE'
const UPDATE_MOVIE_FRANCHISE = 'UPDATE_MOVIE_FRANCHISE'

/**
 * ACTION CREATORS
 */
export const setMovieFranchise = movies => ({type: SET_MOVIE_FRANCHISE, movies})

export const updateMovieFranchise = movies => ({
  type: SET_MOVIE_FRANCHISE,
  movies
})

/**
 * THUNK CREATORS
 */
export const fetchMovieFranchise = franchiseId => {
  return async dispatch => {
    try {
      const response = await axios.get(`/api/movies/${franchiseId}`)
      const action = setMovieFranchise(response.data)
      dispatch(action)
    } catch (err) {
      console.error(err)
    }
  }
}

export const updateMovieRanks = info => {
  return async dispatch => {
    const response = await axios.put(`/api/movies/${info.franchiseId}`, info)
    const action = updateMovieFranchise(response.data)
    dispatch(action)
  }
}

/**
 * REDUCER
 */
const movieFranchiseReducer = (state = [], action) => {
  switch (action.type) {
    case SET_MOVIE_FRANCHISE:
      return action.movies
    case UPDATE_MOVIE_FRANCHISE:
      return action.movies
    default:
      return state
  }
}

export default movieFranchiseReducer
