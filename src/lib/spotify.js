import SpotifyWebAPI from 'spotify-web-api-node'

const getSpotifyAPI = (config) => new SpotifyWebAPI({
  clientId: config.clientID,
  clientSecret: config.clientSecret,
  redirectUri: config.redirectURI
})

export const getPlayList = (playlist, config) => new Promise((resolve, reject) => {
  const api = getSpotifyAPI(config)
  api.clientCredentialsGrant().then(data => {
    const accessToken = data.body['access_token']
    api.setAccessToken(accessToken)
    api.getPlaylistTracks(playlist.username, playlist.id).then(data => {
      var tracks = data.body.items
      tracks.map(track => {
        track.playlist_id = playlist.id
        track.added_by = playlist.username
      })
      resolve({ tracks, api, accessToken, config })
    }).catch(err => reject(err))
  }).catch(err => reject(err))
})
