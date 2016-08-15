import { AsyncStatus, PlaylistActions } from '../lib/constants'
import { createAction } from 'redux-actions'
import { arrayOf, normalize } from 'normalizr'
import { playlistSchema } from '../lib/schemas'

import API from '../lib/api'

export const getPlaylists = () =>
  dispatch => {
    const getPlaylistsAction = createAction(PlaylistActions.GET_PLAYLISTS)

    dispatch(getPlaylistsAction({
      status: AsyncStatus.REQUEST
    }))

    return API.getPlaylists().then(data => {
      const normalized = normalize(data, arrayOf(playlistSchema))
      dispatch(getPlaylistsAction({
        status: AsyncStatus.SUCCESS,
        entities: normalized.entities.playlists,
        result: normalized.result
      }))
    }).catch(err => dispatch(getPlaylistsAction({
      status: AsyncStatus.FAILED,
      message: err.message
    })))
  }

export const getPlaylistBySlug = (slug) =>
  dispatch => {
    const getPlaylistsAction = createAction(PlaylistActions.GET_PLAYLIST)

    dispatch(getPlaylistsAction({
      status: AsyncStatus.REQUEST
    }))

    return API.getPlaylistBySlug(slug).then(data => {
      const normalized = normalize(data, playlistSchema)
      dispatch(getPlaylistsAction({
        status: AsyncStatus.SUCCESS,
        entities: normalized.entities,
        result: normalized.result,
        playlistSlug: slug
      }))
    }).catch(err => dispatch(getPlaylistsAction({
      status: AsyncStatus.FAILED,
      message: err.message
    })))
  }

