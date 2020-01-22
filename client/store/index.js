import {createStore, combineReducers, applyMiddleware} from 'redux'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
// import user from './user'
import franchiseReducer from './franchise'
import movieFranchiseReducer from './movie'

const reducer = combineReducers({
  franchises: franchiseReducer,
  movies: movieFranchiseReducer
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './franchise'
