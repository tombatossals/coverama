import { combineReducers } from 'redux'
import playlistsReducers from './playlists'
import tracksReducers from './tracks'
import artistsReducers from './artists'
import albumsReducers from './albums'

const rootReducer = combineReducers({
  playlists: playlistsReducers,
  tracks: tracksReducers,
  artists: artistsReducers,
  albums: albumsReducers
})

export default rootReducer
