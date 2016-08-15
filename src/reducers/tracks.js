import { handleActions } from 'redux-actions'
import { AsyncStatus, PlaylistActions, TrackActions } from '../lib/constants'

const initialPlaylistState = {
  status: AsyncStatus.IDLE
}

export default handleActions({
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
          entities: action.payload.entities.tracks,
          ids: Object.keys(action.payload.entities.tracks),
          playlistId: action.payload.result,
          playlistSlug: action.payload.playlistSlug
        }
      default:
        return state
    }
  },
  [TrackActions.GET_TRACKS]: (state, action) => {
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
          entities: action.payload.entities.tracks,
          ids: action.payload.result,
          artistSlug: action.payload.artistSlug,
          albumSlug: action.payload.albumSlug
        }
      default:
        return state
    }
  }
}, initialPlaylistState)
