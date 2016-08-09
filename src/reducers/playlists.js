import { handleActions } from 'redux-actions'
import { AsyncStatus } from '../lib/constants'

const initialPlaylistsState = {
  status: AsyncStatus.IDLE
}

export default handleActions({
  GET_PLAYLISTS: (state, action) => {
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
          data: action.payload.data
        }
      default:
        return state
    }
  },
  GET_PLAYLIST: (state, action) => {
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
          data: state.data && state.data.length > 0 ? state.data : [ action.payload.data ]
        }
      default:
        return state
    }
  }
}, initialPlaylistsState)
