import { AsyncStatus, AlbumActions } from '../lib/constants'
import { createAction } from 'redux-actions'
import API from '../lib/api'

export const getAlbum = (id) =>
  dispatch => {
    const getAlbumAction = createAction(AlbumActions.GET_ALBUM)

    dispatch(getAlbumAction({
      status: AsyncStatus.REQUEST
    }))

    return API.getAlbum(id).then(data => {
      dispatch(getAlbumAction({
        status: AsyncStatus.SUCCESS,
        data: [ data ]
      }))
    }).catch(err => dispatch(getAlbumAction({
      status: AsyncStatus.FAILED,
      message: err.message
    })))
  }

export const getAlbumsByArtist = (artistId) =>
  dispatch => {
    const getAlbumAction = createAction(AlbumActions.GET_ALBUMS)

    dispatch(getAlbumAction({
      status: AsyncStatus.REQUEST
    }))

    return API.getAlbumByArtistId(artistId).then(data => {
      dispatch(getAlbumAction({
        status: AsyncStatus.SUCCESS,
        data
      }))
    }).catch(err => dispatch(getAlbumAction({
      status: AsyncStatus.FAILED,
      message: err.message
    })))
  }
