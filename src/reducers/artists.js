import { handleActions } from 'redux-actions'
import { AsyncStatus, ArtistActions } from '../lib/constants'

const initialArtistsState = {
  status: AsyncStatus.IDLE
}

export default handleActions({
  [ArtistActions.GET_ARTISTS]: (state, action) => {
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
}, initialArtistsState)
