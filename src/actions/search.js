import { AsyncStatus, SearchActions } from '../lib/constants'
import { createAction } from 'redux-actions'
import API from '../lib/api'

export const searchByKey = (key) =>
  dispatch => {
    const getSearchAction = createAction(SearchActions.GET_SEARCH)

    dispatch(getSearchAction({
      status: AsyncStatus.REQUEST
    }))

    return API.searchByKey(key).then(data => {
      dispatch(getSearchAction({
        status: AsyncStatus.SUCCESS,
        data
      }))
    }).catch(err => dispatch(getSearchAction({
      status: AsyncStatus.FAILED,
      message: err.message
    })))
  }
