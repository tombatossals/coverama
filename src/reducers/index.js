import { combineReducers } from 'redux'
import userReducers from './user'
import playlistReducers from './playlist'

const rootReducer = combineReducers({
  user: userReducers,
  playlist: playlistReducers
})

export default rootReducer
