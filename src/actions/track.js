import { AsyncStatus, TrackActions } from '../lib/constants'
import { createAction } from 'redux-actions'
import API from '../lib/api'

export const getTrackBySlug = (slug, albumSlug, artistSlug) =>
  dispatch => {
    const getTrackAction = createAction(TrackActions.GET_TRACK)

    dispatch(getTrackAction({
      status: AsyncStatus.REQUEST
    }))

    return API.getTrackBySlug(slug, albumSlug, artistSlug).then(data => {
      dispatch(getTrackAction({
        status: AsyncStatus.SUCCESS,
        data
      }))
    }).catch(err => dispatch(getTrackAction({
      status: AsyncStatus.FAILED,
      message: err.message
    })))
  }

export const setTracks = (tracks) => console.log(tracks)
