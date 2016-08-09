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
    resolve(api)
  }))

export const spotifyFetchData = params => {
  switch (params.table) {
    case 'playlists':
      return init.then(api =>
        api.getPlaylist(params.username, params.id).then(data => ({
          playlist: {
            description: data.body.description,
            external_urls: data.body.external_urls.spotify,
            id: data.body.id,
            image_url: data.body.images[0].url,
            name: data.body.name
          },
          playlistTracks: data.body.tracks.items.map(item => ({
            added_at: item.playlist_id,
            added_by: item.added_by,
            playlist_id: item.playlist_id,
            track_id: item.track.id
          })),
          tracks: data.body.tracks.items.map(item => ({
            album_id: item.track.album.id,
            playlist_id: data.body.id,
            album_name: item.track.album.name,
            image_url: item.track.album.images[0].url,
            artist_id: item.track.artists[0].id,
            artist_name: item.track.artists[0].name,
            disc_number: item.track.disc_number,
            duration_ms: item.track.duration_ms,
            explicit: item.track.explicit,
            external_url: item.track.external_urls.spotify,
            href: item.track.href,
            id: item.track.id,
            name: item.track.name,
            popularity: item.track.popularity,
            preview_url: item.track.preview_url,
            track_number: item.track.track_number
          }))
        })))
    case 'albums':
      if (params.id) {
        return init.then(api =>
          api.getAlbum(params.id).then(data => ({
            id: data.body.id,
            external_url: data.body.external_urls.spotify,
            image_url: data.body.images[0].url,
            name: data.body.name,
            artist_id: data.artistId
          })))
      }

      return init.then(api => new Promise((resolve, reject) =>
        api.getArtistAlbums(params.artistId, {
          limit: 50,
          album_type: 'album',
          market: 'ES'
        }).then(data => resolve(data.body.items.map(album => ({
          id: album.id,
          external_url: album.external_urls.spotify,
          image_url: album.images[0].url,
          name: album.name,
          artist_id: params.artistId
        })))).catch(err => console.log(err))
      ).catch(err => console.log(err)))

    case 'tracks':
      return init.then(api =>
        api.getAlbumTracks(params.albumId)).then(data => ({
          album_id: data.body.album.id,
          album_name: data.body.album.name,
          image_url: data.body.album.images[0].url,
          artist_id: data.body.artists[0].id,
          artist_name: data.body.artists[0].name,
          disc_number: data.body.disc_number,
          duration_ms: data.body.duration_ms,
          explicit: data.body.explicit,
          external_url: data.body.external_urls.spotify,
          href: data.body.href,
          id: data.body.id,
          name: data.body.name,
          popularity: data.body.popularity,
          preview_url: data.body.preview_url,
          track_number: data.body.track_number
        }))
    case 'artists':
      return init.then(api =>
        api.getArtist(params.id)).then(data => ({
          id: data.body.id,
          external_url: data.body.external_urls.spotify,
          genres: data.body.genres.slice(),
          followers: data.body.followers.total,
          image_url: data.body.images[0].url,
          name: data.body.name,
          popularity: data.body.popularity
        }))
  }
}
