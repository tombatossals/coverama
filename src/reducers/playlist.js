import { handleActions } from 'redux-actions'

const initialPlayListState = {
  tracks: []
}

export default handleActions({
  GET_PLAYLIST: (state, action) => action.payload
}, initialPlayListState)
