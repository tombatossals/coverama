import { handleActions } from 'redux-actions'
import { AsyncStatus, AlbumActions } from '../lib/constants'

const initialAlbumState = {
  status: AsyncStatus.IDLE
}

export default handleActions({
  [AlbumActions.GET_ALBUM]: (state, action) => {
    switch (action.payload.status) {
      case AsyncStatus.FAILED:
        return {
          status: AsyncStatus.FAILED,
          message: action.payload.message
        }
      case AsyncStatus.REQUEST:
        return Object.assign({}, state, { status: AsyncStatus.REQUEST })
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
