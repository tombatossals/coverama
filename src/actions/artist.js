import { AsyncStatus, ArtistActions } from '../lib/constants'
import { createAction } from 'redux-actions'
import API from '../lib/api'

export const getArtist = (id) =>
  dispatch => {
    const getArtistAction = createAction(ArtistActions.GET_ARTIST)

    dispatch(getArtistAction({
      status: AsyncStatus.REQUEST
    }))

    return API.getArtist(id).then(data => {
      dispatch(getArtistAction({
        status: AsyncStatus.SUCCESS,
        data
      }))
    }).catch(err => dispatch(getArtistAction({
      status: AsyncStatus.FAILED,
      message: err.message
    })))
  }
