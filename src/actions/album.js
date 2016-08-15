import { AsyncStatus, AlbumActions } from '../lib/constants'
import { createAction } from 'redux-actions'
import { arrayOf, normalize } from 'normalizr'
import API from '../lib/api'
import { albumSchema } from '../lib/schemas'

export const getAlbumsByArtistSlug = (slug) =>
  dispatch => {
    const getAlbumAction = createAction(AlbumActions.GET_ALBUMS)

    dispatch(getAlbumAction({
      status: AsyncStatus.REQUEST
    }))

    return API.getAlbumsByArtistSlug(slug).then(data => {
      const normalized = normalize(data, arrayOf(albumSchema))
      dispatch(getAlbumAction({
        status: AsyncStatus.SUCCESS,
        entities: normalized.entities.playlists,
        result: normalized.result
      }))
    }).catch(err => dispatch(getAlbumAction({
      status: AsyncStatus.FAILED,
      message: err.message
    })))
  }
