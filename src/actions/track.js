import { AsyncStatus, TrackActions } from '../lib/constants'
import { createAction } from 'redux-actions'
import { normalize, arrayOf } from 'normalizr'
import API from '../lib/api'
import { trackSchema } from '../lib/schemas'

export const getTracksByAlbumSlug = (slug, artistSlug) =>
  dispatch => {
    const getTracksAction = createAction(TrackActions.GET_TRACKS)

    dispatch(getTracksAction({
      status: AsyncStatus.REQUEST
    }))

    return API.getTracksByAlbumSlug(slug, artistSlug).then(data => {
      const normalized = normalize(data, arrayOf(trackSchema))
      console.log(slug)
      dispatch(getTracksAction({
        status: AsyncStatus.SUCCESS,
        entities: normalized.entities,
        result: normalized.result,
        artistSlug: artistSlug,
        albumSlug: slug
      }))
    }).catch(err => dispatch(getTracksAction({
      status: AsyncStatus.FAILED,
      message: err.message
    })))
  }
