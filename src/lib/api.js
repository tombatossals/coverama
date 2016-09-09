import Horizon from '@horizon/client'

const horizon = new Horizon({
  authType: 'anonymous',
  secure: process.env.NODE_ENV !== 'development',
  host: process.env.NODE_ENV === 'development' ? 'localhost:5000' : undefined
})

const host = process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : ''

horizon.connect()

/* Create tables */
horizon('playlists_tracks').fetch().subscribe()
horizon('playlists').fetch().subscribe()
horizon('tracks').fetch().subscribe()
horizon('albums').fetch().subscribe()
horizon('artists').fetch().subscribe()

const getPlaylistBySlug = (slug) => new Promise((resolve, reject) =>
  horizon('playlists').find({ slug: slug }).fetch().subscribe(playlist =>
    horizon('tracks').findAll({ playlist_id: playlist.id }).fetch().subscribe(tracks =>
      resolve(Object.assign({}, playlist, { tracks }))
    , err => reject(err))
    , err => reject(err))
)

const getTrackBySlug = (slug, albumSlug, artistSlug) => new Promise((resolve, reject) =>
  horizon('tracks').find({ slug: slug, album_slug: albumSlug, artist_slug: artistSlug })
    .fetch().subscribe(track => resolve(track)
  , err => reject(err))
)

const getPlaylists = (sort, letter) => new Promise((resolve, reject) =>
  horizon('playlists').order(sort).fetch().filter(list => {
    return list.filter(playlist => playlist.name.indexOf(letter) === 0)
  }).defaultIfEmpty().subscribe(playlists => resolve(playlists), err => reject(err)))

const getAlbums = (sort, letter, limit, offset) => new Promise((resolve, reject) =>
  horizon('albums').order(sort).limit(limit).fetch().defaultIfEmpty().subscribe(albums => resolve(albums), err => reject(err)))

const getArtists = (sortColumn, filterLetter) => new Promise((resolve, reject) =>
  horizon('artists').order(sortColumn).fetch().defaultIfEmpty().subscribe(artists => resolve(artists), err => reject(err)))

const getAlbumBySlug = (slug, artistSlug) => new Promise((resolve, reject) =>
  horizon('tracks').findAll({ album_slug: slug, artist_slug: artistSlug }).fetch().defaultIfEmpty().subscribe(tracks => {
    if (tracks !== null && tracks.length > 1) {
      tracks.sort((t1, t2) => {
        return t1.disc_number === t2.disc_number
           ? t1.track_number - t2.track_number
           : t1.disc_number - t2.disc_number
      })
      horizon('albums').find({ slug: slug, artist_slug: artistSlug }).fetch().subscribe(album =>
        resolve(Object.assign({}, album, { tracks })
      , err => reject(err)))
    }

    horizon('albums').find({ slug: slug, artist_slug: artistSlug }).fetch().subscribe(album =>
      window.fetch(`${host}/api/collect`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ table: 'tracks', album })
      }).then(res => res.json()).then(() =>
        horizon('tracks').findAll({ album_slug: slug, artist_slug: artistSlug }).fetch().subscribe(tracks => {
          tracks.sort((t1, t2) => (
            t1.disc_number === t2.disc_number
              ? t1.track_number - t2.track_number
              : t1.disc_number - t2.disc_number
          ))
          resolve(Object.assign({}, album, { tracks }))
        }, err => reject(err))
      ).catch(err => reject(err))
    , err => reject(err))
  }, err => reject(err))
)

const searchByKey = (key) => new Promise((resolve, reject) => {
  horizon('albums').findAll({ name: key }).fetch().defaultIfEmpty().subscribe(albums => {
    resolve(albums)
  }, err => reject(err))
})

const getAlbumsByArtist = (artist) => new Promise((resolve, reject) => {
  horizon('albums').findAll({ artist_id: artist.id }).fetch().defaultIfEmpty().subscribe(albums => {
    if (albums !== null && albums.length > 1) {
      return resolve(albums)
    }
    window.fetch(`${host}/api/collect`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ table: 'albums', artistId: artist.id, artistSlug: artist.slug })
    }).then(res => res.json()).then(() =>
      horizon('albums').findAll({ artist_id: artist.id }).fetch().subscribe(albums => resolve(albums)
      , err => reject(err))
    ).catch(err => reject(err))
  }, err => reject(err))
})

const getAlbumsByArtistSlug = (slug) => new Promise((resolve, reject) => {
  horizon('artists').find({ slug: slug }).fetch().subscribe(artist => {
    getAlbumsByArtist(artist).then(albums => resolve(albums))
  }, err => reject(err))
})

const getArtistFromTracksBySlug = (slug) => new Promise((resolve, reject) =>
  horizon('tracks').find({ artist_slug: slug }).fetch().subscribe(track =>
    resolve({ id: track.artist_id, slug: track.artist_slug })
  , err => reject(err)))

const getArtistBySlug = (slug) => new Promise((resolve, reject) => {
  horizon('artists').find({ slug: slug }).fetch().defaultIfEmpty().subscribe(artist => {
    if (artist !== null) {
      return getAlbumsByArtist(artist).then(albums => {
        resolve(Object.assign({}, artist, { albums }))
      }).catch(err => reject(err))
    }
    getArtistFromTracksBySlug(slug).then(artist => {
      window.fetch(`${host}/api/collect`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ table: 'artists', id: artist.id })
      }).then(res => res.json()).then(() =>
        horizon('artists').find({ slug: slug }).fetch().subscribe(artist => {
          getAlbumsByArtist(artist).then(albums => {
            resolve(Object.assign({}, artist, { albums }))
          }).catch(err => reject(err))
        }, err => reject(err))
      ).catch(err => reject(err))
    .catch(err => reject(err)) })
  }, err => reject(err)) })

const logout = () => {
  Horizon.clearAuthTokens()
}

const getStatus = () => {
  return horizon.status()
}

const githubLogin = () => {
  return horizon.authEndpoint('github')
}

const googleLogin = () => {
  return horizon.authEndpoint('google')
}

const onReady = (cb) => {
  horizon.onReady(cb)
}

export default {
  githubLogin,
  googleLogin,
  logout,
  getStatus,
  onReady,
  getPlaylistBySlug,
  getPlaylists,
  getAlbumBySlug,
  getArtistBySlug,
  getTrackBySlug,
  searchByKey,
  getAlbums,
  getArtists,
  getAlbumsByArtistSlug
}
