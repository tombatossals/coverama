import { handleActions } from 'redux-actions'
import { AsyncStatus } from '../lib/constants'

const initialAlbumState = {
  status: AsyncStatus.IDLE
}

export default handleActions({
  GET_ARTIST: (state, action) => {
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
          data: action.payload.data.albums.slice()
        }
      default:
        return state
    }
  },
  GET_ALBUM: (state, action) => {
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
  }
}, initialAlbumState)
