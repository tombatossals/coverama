import { handleActions } from 'redux-actions'
import { AsyncStatus, ArtistActions, AlbumActions } from '../lib/constants'

const initialAlbumState = {
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
          entities: action.payload.entities.albums,
          ids: Object.keys(action.payload.entities.albums),
          artistSlug: action.payload.artistSlug
        }
      default:
        return state
    }
  },
  [AlbumActions.GET_ALBUM]: (state, action) => {
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
