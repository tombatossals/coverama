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
