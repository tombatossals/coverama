import { AsyncStatus, PlayListActions } from '../lib/constants'
import { createAction } from 'redux-actions'
import API from '../lib/api'

export const getPlayList = () =>
  dispatch => {
    const getPlayListAction = createAction(PlayListActions.GET_PLAYLIST)

    dispatch(getPlayListAction({
      status: AsyncStatus.REQUEST
    }))

    return API.getPlayList().then(data => {
      dispatch(getPlayListAction({
        status: AsyncStatus.SUCCESS,
        data
      }))
    }).catch(err => dispatch(getPlayListAction({
      status: AsyncStatus.FAILED,
      message: err.message
    })))
  }

export const getPlayLists = () =>
  dispatch => {
    const getPlayListsAction = createAction(PlayListActions.GET_PLAYLISTS)

    dispatch(getPlayListsAction({
      status: AsyncStatus.REQUEST
    }))

    return API.getPlayLists().then(data => {
      dispatch(getPlayListsAction({
        status: AsyncStatus.SUCCESS,
        data
      }))
    }).catch(err => dispatch(getPlayListsAction({
      status: AsyncStatus.FAILED,
      message: err.message
    })))
  }
