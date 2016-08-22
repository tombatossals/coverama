import SpotifyWebAPI from 'spotify-web-api-node'
import config from '../../config'
import slug from 'limax'

const getSpotifyAPI = (config) => new SpotifyWebAPI({
  clientId: config.clientID,
  clientSecret: config.clientSecret,
  redirectUri: config.redirectURI
})

const init = () => new Promise((resolve, reject) => {
  const api = getSpotifyAPI(config.spotify)
  api.clientCredentialsGrant().then(data => {
    api.setAccessToken(data.body['access_token'])
    resolve(api)
  }).catch(err => console.log(err))
})

export const spotifyFetchData = params => {
  switch (params.table) {
    case 'playlists':
      return init().then(api =>
        api.getPlaylist(params.username, params.id).then(data => ({
          playlist: {
            description: data.body.description,
            external_urls: data.body.external_urls.spotify,
            id: data.body.id,
            image_url: data.body.images[0].url,
            name: data.body.name,
            slug: slug(data.body.name),
            url: `/playlists/${slug(data.body.name)}`
          },
          playlistTracks: data.body.tracks.items.map(item => ({
            added_at: item.playlist_id,
            added_by: item.added_by,
            playlist_id: item.playlist_id,
            track_id: item.track.id
          })),
          tracks: data.body.tracks.items.map(item => ({
            playlist_id: data.body.id,
            album_id: item.track.album.id,
            album_slug: slug(item.track.album.name),
            image_url: item.track.album.images[0].url,
            artist_id: item.track.artists[0].id,
            artist_slug: slug(item.track.artists[0].name),
            disc_number: item.track.disc_number,
            duration_ms: item.track.duration_ms,
            explicit: item.track.explicit,
            external_url: item.track.external_urls.spotify,
            href: item.track.href,
            id: item.track.id,
            name: item.track.name,
            slug: slug(item.track.name),
            popularity: item.track.popularity,
            preview_url: item.track.preview_url,
            track_number: item.track.track_number
          }))
        }))).catch(err => console.log(err))
    case 'albums':
      return init().then(api => new Promise((resolve, reject) =>
        api.getArtistAlbums(params.artistId, {
          limit: 50,
          album_type: 'album',
          market: 'ES'
        }).then(data => resolve(data.body.items.map(album => ({
          id: album.id,
          external_url: album.external_urls.spotify,
          image_url: album.images[0].url,
          name: album.name,
          slug: slug(album.name),
          url: `/artists/${params.artistSlug}/albums/${slug(album.name)}`,
          artist_id: params.artistId,
          artist_slug: params.artistSlug
        })))).catch(err => console.log(err))
      )).catch(err => console.log(err))

    case 'tracks':
      return init().then(api => new Promise((resolve, reject) =>
        api.getAlbumTracks(params.album.id).then(data =>
          resolve(data.body.items.map(track => ({
            album_id: params.album.id,
            album_slug: params.album.slug,
            image_url: params.album.image_url,
            artist_id: track.artists[0].id,
            artist_slug: slug(track.artists[0].name),
            disc_number: track.disc_number,
            duration_ms: track.duration_ms,
            explicit: track.explicit,
            external_url: track.external_urls.spotify,
            href: track.href,
            id: track.id,
            name: track.name,
            slug: slug(track.name),
            popularity: track.popularity,
            preview_url: track.preview_url,
            track_number: track.track_number
          })))).catch(err => console.log(err))
        )).catch(err => console.log(err))
    case 'artists':
      return init().then(api =>
        api.getArtist(params.id).then(data => ({
          id: data.body.id,
          external_url: data.body.external_urls.spotify,
          genres: data.body.genres.slice(),
          followers: data.body.followers.total,
          image_url: data.body.images[0].url,
          name: data.body.name,
          slug: slug(data.body.name),
          url: `/artists/${slug(data.body.name)}`,
          popularity: data.body.popularity
        })).catch(err => console.log(err))
      ).catch(err => console.log(err))
  }
}
