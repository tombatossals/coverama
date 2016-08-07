import { combineReducers } from 'redux'
import userReducers from './user'
import playlistsReducers from './playlists'
import trackReducers from './track'
import artistReducers from './artist'
import albumReducers from './album'

const rootReducer = combineReducers({
  user: userReducers,
  playlists: playlistsReducers,
  track: trackReducers,
  artist: artistReducers,
  album: albumReducers
})

export default rootReducer
