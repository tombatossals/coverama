import { AsyncStatus, ArtistActions } from '../lib/constants'
import { createAction } from 'redux-actions'
import { normalize } from 'normalizr'
import API from '../lib/api'
import { artistSchema } from '../lib/schemas'

export const getArtistBySlug = (slug) =>
  dispatch => {
    const getArtistAction = createAction(ArtistActions.GET_ARTIST)

    dispatch(getArtistAction({
      status: AsyncStatus.REQUEST
    }))

    return API.getArtistBySlug(slug).then(data => {
      const normalized = normalize(data, artistSchema)
      dispatch(getArtistAction({
        status: AsyncStatus.SUCCESS,
        entities: normalized.entities,
        result: normalized.result,
        artistSlug: slug
      }))
    }).catch(err => dispatch(getArtistAction({
      status: AsyncStatus.FAILED,
      message: err.message
    })))
  }
