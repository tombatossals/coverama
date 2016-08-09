import { combineReducers } from 'redux'
import userReducers from './user'
import playlistsReducers from './playlists'
import tracksReducers from './tracks'
import artistReducers from './artist'
import albumsReducers from './albums'

const rootReducer = combineReducers({
  user: userReducers,
  playlists: playlistsReducers,
  tracks: tracksReducers,
  artist: artistReducers,
  albums: albumsReducers
})

export default rootReducer
