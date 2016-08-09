export const AsyncStatus = {
  IDLE: 'IDLE',
  REQUEST: 'REQUEST',
  SUCCESS: 'SUCCESS',
  FAILED: 'FAILED'
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
  GET_TRACKS: 'GET_TRACKS'
}

export const ArtistActions = {
  GET_ARTIST: 'GET_ARTIST'
}

export const AlbumActions = {
  GET_ALBUM: 'GET_ALBUM'
}

