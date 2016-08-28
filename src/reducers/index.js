import { combineReducers } from 'redux'
import playlistsReducers from './playlists'
import playlistReducers from './playlist'
import trackReducers from './track'
import artistReducers from './artist'
import artistsReducers from './artists'
import albumReducers from './album'
import albumsReducers from './albums'
import playerReducers from './player'

const rootReducer = combineReducers({
  playlists: playlistsReducers,
  playlist: playlistReducers,
  track: trackReducers,
  artist: artistReducers,
  artists: artistsReducers,
  album: albumReducers,
  albums: albumsReducers,
  player: playerReducers
})

export default rootReducer
