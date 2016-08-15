import { handleActions } from 'redux-actions'
import { AsyncStatus, PlaylistActions } from '../lib/constants'

const initialPlaylistsState = {
  status: AsyncStatus.IDLE
}

export default handleActions({
  [PlaylistActions.GET_PLAYLISTS]: (state, action) => {
    switch (action.payload.status) {
      case AsyncStatus.FAILED:
        return {
          status: AsyncStatus.FAILED,
          message: action.payload.message
        }
      case AsyncStatus.REQUEST:
        return {
          status: AsyncStatus.REQUEST
        }
      case AsyncStatus.SUCCESS:
        return {
          status: AsyncStatus.SUCCESS,
          entities: action.payload.entities,
          ids: action.payload.result
        }
      default:
        return state
    }
  },
  [PlaylistActions.GET_PLAYLIST]: (state, action) => {
    switch (action.payload.status) {
      case AsyncStatus.FAILED:
        return {
          status: AsyncStatus.FAILED,
          message: action.payload.message
        }
      case AsyncStatus.REQUEST:
        return {
          status: AsyncStatus.REQUEST
        }
      case AsyncStatus.SUCCESS:
        return {
          status: AsyncStatus.SUCCESS,
          entities: action.payload.entities.playlists,
          ids: [ action.payload.result ]
        }
      default:
        return state
    }
  }
}, initialPlaylistsState)
