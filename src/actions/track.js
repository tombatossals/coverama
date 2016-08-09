import { AsyncStatus, TrackActions } from '../lib/constants'
import { createAction } from 'redux-actions'
import API from '../lib/api'

export const getTracksByPlaylistId = (playlistId) =>
  dispatch => {
    const getTracksAction = createAction(TrackActions.GET_TRACKS)

    dispatch(getTracksAction({
      status: AsyncStatus.REQUEST
    }))

    return API.getTracksByPlaylistId(playlistId).then(data => {
      dispatch(getTracksAction({
        status: AsyncStatus.SUCCESS,
        data
      }))
    }).catch(err => dispatch(getTracksAction({
      status: AsyncStatus.FAILED,
      message: err.message
    })))
  }

export const getTracksByAlbumId = (albumId) =>
  dispatch => {
    const getTracksAction = createAction(TrackActions.GET_TRACKS)

    dispatch(getTracksAction({
      status: AsyncStatus.REQUEST
    }))

    return API.getTracksByAlbumId(albumId).then(data => {
      dispatch(getTracksAction({
        status: AsyncStatus.SUCCESS,
        data
      }))
    }).catch(err => dispatch(getTracksAction({
      status: AsyncStatus.FAILED,
      message: err.message
    })))
  }
