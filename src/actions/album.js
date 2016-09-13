import { AsyncStatus, AlbumActions } from '../lib/constants'
import { createAction } from 'redux-actions'
import API from '../lib/api'

export const getAlbumBySlug = (slug, artistSlug) =>
  dispatch => {
    const getAlbumAction = createAction(AlbumActions.GET_ALBUM)

    dispatch(getAlbumAction({
      status: AsyncStatus.REQUEST
    }))

    return API.getAlbumBySlug(slug, artistSlug).then(data => {
      dispatch(getAlbumAction({
        status: AsyncStatus.SUCCESS,
        data
      }))
    }).catch(err => dispatch(getAlbumAction({
      status: AsyncStatus.FAILED,
      message: err.message
    })))
  }

export const getAlbums = (sort, letter, offset) =>
  dispatch => {
    const getAlbumsAction = createAction(AlbumActions.GET_ALBUMS)

    dispatch(getAlbumsAction({
      status: AsyncStatus.REQUEST
    }))

    return API.getAlbums(sort, letter, 10, offset).then(data => {
      dispatch(getAlbumsAction({
        status: AsyncStatus.SUCCESS,
        data
      }))
    }).catch(err => dispatch(getAlbumsAction({
      status: AsyncStatus.FAILED,
      message: err.message
    })))
  }
