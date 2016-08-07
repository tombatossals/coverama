import SpotifyWebAPI from 'spotify-web-api-node'
import config from '../../config'

const getSpotifyAPI = (config) => new SpotifyWebAPI({
  clientId: config.clientID,
  clientSecret: config.clientSecret,
  redirectUri: config.redirectURI
})

const api = getSpotifyAPI(config.spotify)

const init = new Promise((resolve, reject) =>
  api.clientCredentialsGrant().then(data => {
    api.setAccessToken(data.body['access_token'])
    resolve(true)
  }))

export const spotifyFetchData = data => {
  switch (data.table) {
    case 'playlists':
      return init.then(() =>
        api.getPlaylist(data.username, data.id))
    case 'albums':
      return init.then(api.getAlbum(data.id))
    case 'artists':
      return init.then(api.getArtist(data.id))
  }
}
