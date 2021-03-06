import { handleActions } from 'redux-actions'
import { AsyncStatus, ArtistActions } from '../lib/constants'

const initialArtistState = {
  status: AsyncStatus.IDLE
}

export default handleActions({
  [ArtistActions.GET_ARTIST]: (state, action) => {
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
}, initialArtistState)
