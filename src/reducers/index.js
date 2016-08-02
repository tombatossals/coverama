import { combineReducers } from 'redux'
import userReducers from './user'
import playlistReducers from './playlist'
import trackReducers from './track'

const rootReducer = combineReducers({
  user: userReducers,
  playlist: playlistReducers,
  track: trackReducers
})

export default rootReducer
