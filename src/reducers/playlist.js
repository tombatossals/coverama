import { handleActions } from 'redux-actions'
import { AsyncStatus } from '../lib/constants'

const initialPlayListState = {
  playlist: {},
  tracks: []
}

export default handleActions({
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
          data: action.payload.data
        }
      default:
        return state
    }
  }
}, initialPlayListState)
