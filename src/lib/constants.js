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

export const PlayListActions = {
  GET_PLAYLIST: 'GET_PLAYLIST'
}

export const TrackActions = {
  GET_TRACK: 'GET_TRACK'
}
