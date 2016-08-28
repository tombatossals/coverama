export const AsyncStatus = {
  IDLE: 'IDLE',
  REQUEST: 'REQUEST',
  SUCCESS: 'SUCCESS',
  FAILED: 'FAILED'
}

export const PlayerStatus = {
  HIDDEN: 'HIDDEN',
  IDLE: 'IDLE',
  PLAYING: 'PLAYING'
}

export const PlayerActions = {
  SET_PLAYLIST: 'SET_PLAYLIST',
  START_PLAYER: 'START_PLAYER',
  STOP_PLAYER: 'STOP_PLAYER'
}

export const UserStatus = {
  UNDETERMINED: 'UNDETERMINED',
  AUTHENTICATED: 'AUTHENTICATED',
  ANONYMOUS: 'ANONYMOUS'
}

export const UserActions = {
  USER_LOGIN: 'USER_LOGIN',
  USER_LOGOUT: 'USER_LOGOUT',
  USER_CHECK_AUTH_TOKEN: 'USER_CHECK_AUTH_TOKEN'
}

export const PlaylistActions = {
  GET_PLAYLIST: 'GET_PLAYLIST',
  GET_PLAYLISTS: 'GET_PLAYLISTS',
  SET_ACTIVE_PLAYLIST: 'SET_ACTIVE_PLAYLIST'
}

export const TrackActions = {
  GET_TRACK: 'GET_TRACK'
}

export const ArtistActions = {
  GET_ARTIST: 'GET_ARTIST',
  GET_ARTISTS: 'GET_ARTISTS'
}

export const AlbumActions = {
  GET_ALBUMS: 'GET_ALBUMS',
  GET_ALBUM: 'GET_ALBUM'
}

export const SearchActions = {
  GET_SEARCH: 'GET_SEARCH'
}


