import { AsyncStatus, PlayListActions } from '../lib/constants'
import { createAction } from 'redux-actions'
import API from '../lib/api'

export const getTrack = (id) =>
  dispatch => {
    const getTrackAction = createAction(PlayListActions.GET_TRACK)

    dispatch(getTrackAction({
      status: AsyncStatus.REQUEST
    }))

    return API.getTrack(id).then(data => {
      dispatch(getTrackAction({
        status: AsyncStatus.SUCCESS,
        data
      }))
    }).catch(err => dispatch(getTrackAction({
      status: AsyncStatus.FAILED,
      message: err.message
    })))
  }
