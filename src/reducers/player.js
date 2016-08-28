import { handleActions } from 'redux-actions'
import { PlayerStatus, PlayerActions } from '../lib/constants'

const initialPlayerState = {
  status: PlayerStatus.IDLE,
  tracks: [{
    "album_id":  "2Pw51hAGvWpTA3AYl2WVuu",
    "album_slug":  "4-expanded" ,
    "artist_id":  "6IRouO5mvvfcyxtPDKMYFN" ,
    "artist_slug":  "foreigner" ,
    "disc_number": 1 ,
    "duration_ms": 270976 ,
    "explicit": false ,
    "external_url": "https://open.spotify.com/track/08onVqQ8YicJ98Ycm1qoLf",
    "href": "https://api.spotify.com/v1/tracks/08onVqQ8YicJ98Ycm1qoLf",
    "id":  "08onVqQ8YicJ98Ycm1qoLf",
    "image_url": "https://i.scdn.co/image/d8fcf17a0c8d083f488a02334b2355ddba6fb9a1",
    "name":  "Urgent",
    "preview_url": "https://p.scdn.co/mp3-preview/35d5fe17e9ee87d635c788956ddb6eeada1a5103",
    "slug":  "urgent" ,
    "track_number": 6
  }]
}

export default handleActions({
  [PlayerActions.SET_PLAYLIST]: (state, action) => action.payload
}, initialPlayerState)
