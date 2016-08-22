import { AsyncStatus, PlaylistActions } from '../lib/constants'
import { createAction } from 'redux-actions'
import API from '../lib/api'

export const getPlaylists = () =>
  dispatch => {
    const getPlaylistsAction = createAction(PlaylistActions.GET_PLAYLISTS)

    dispatch(getPlaylistsAction({
      status: AsyncStatus.REQUEST
    }))

    return API.getPlaylists().then(data => {
      dispatch(getPlaylistsAction({
        status: AsyncStatus.SUCCESS,
        data
      }))
    }).catch(err => dispatch(getPlaylistsAction({
      status: AsyncStatus.FAILED,
      message: err.message
    })))
  }

export const getPlaylistBySlug = (slug) =>
  dispatch => {
    const getPlaylistAction = createAction(PlaylistActions.GET_PLAYLIST)

    dispatch(getPlaylistAction({
      status: AsyncStatus.REQUEST
    }))

    return API.getPlaylistBySlug(slug).then(data => {
      dispatch(getPlaylistAction({
        status: AsyncStatus.SUCCESS,
        data
      }))
    }).catch(err => dispatch(getPlaylistAction({
      status: AsyncStatus.FAILED,
      message: err.message
    })))
  }

