import { AsyncStatus, ArtistActions } from '../lib/constants'
import { createAction } from 'redux-actions'
import API from '../lib/api'

export const getArtistBySlug = (slug) =>
  dispatch => {
    const getArtistAction = createAction(ArtistActions.GET_ARTIST)

    dispatch(getArtistAction({
      status: AsyncStatus.REQUEST
    }))

    return API.getArtistBySlug(slug).then(data => {
      dispatch(getArtistAction({
        status: AsyncStatus.SUCCESS,
        data
      }))
    }).catch(err => dispatch(getArtistAction({
      status: AsyncStatus.FAILED,
      message: err.message
    })))
  }

export const getArtists = () =>
  dispatch => {
    const getArtistsAction = createAction(ArtistActions.GET_ARTISTS)

    dispatch(getArtistsAction({
      status: AsyncStatus.REQUEST
    }))

    return API.getArtists().then(data => {
      dispatch(getArtistsAction({
        status: AsyncStatus.SUCCESS,
        data
      }))
    }).catch(err => dispatch(getArtistsAction({
      status: AsyncStatus.FAILED,
      message: err.message
    })))
  }
