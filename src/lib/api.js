import Horizon from '@horizon/client'

const horizon = new Horizon({
  authType: 'anonymous',
  secure: false
})

horizon.connect()

/* Create tables */
horizon('playlists_tracks').fetch().subscribe()
horizon('playlists').fetch().subscribe()
horizon('tracks').fetch().subscribe()
horizon('albums').fetch().subscribe()
horizon('artists').fetch().subscribe()

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    if (horizon.hasAuthToken()) {
      horizon.connect()
      return horizon.currentUser().fetch().subscribe(user => {
        resolve(user)
      }, err => reject({ message: err.message }))
    }

    return reject({ message: 'Invalid auth token' })
  })
}

const getPlaylist = (id) => new Promise((resolve, reject) =>
  horizon('playlists').find(id).fetch().subscribe(playlist =>
    horizon('tracks').findAll({ playlist_id: id }).fetch().subscribe(tracks =>
      resolve(Object.assign({}, playlist, { tracks })),
      err => reject({ message: err })),
    err => reject({ message: err }))
)

const getPlaylists = () => new Promise((resolve, reject) =>
  horizon('playlists').fetch().subscribe(playlists =>
    resolve(playlists),
  err => reject({ message: err }))
)

const getTracksByPlaylistId = (id) => new Promise((resolve, reject) =>
  horizon('tracks').findAll({ playlist_id: id }).fetch().subscribe(tracks =>
    resolve(tracks),
    err => reject({ message: err }))
)

const getTracksByAlbumId = (albumId) => new Promise((resolve, reject) =>
  horizon('tracks').findAll({ album_id: albumId }).fetch().defaultIfEmpty().subscribe(tracks => {
    if (tracks !== null && tracks.length > 1) {
      return resolve(tracks)
    }
    window.fetch('/api/collect', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ table: 'tracks', albumId })
    }).then(res => res.json()).then(() =>
      horizon('albums').findAll({ album_id: albumId }).fetch().subscribe(albums =>
        resolve(albums), err => reject({ message: err }))
    ).catch(err => reject(err))
  }, err => reject({ message: err }))
)

const getAlbumsByArtistId = (artistId) => new Promise((resolve, reject) => {
  horizon('albums').findAll({ artist_id: artistId }).fetch().defaultIfEmpty().subscribe(albums => {
    if (albums !== null && albums.length > 1) {
      return resolve(albums)
    }
    window.fetch('/api/collect', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ table: 'albums', artistId })
    }).then(res => res.json()).then(() =>
      horizon('albums').findAll({ artist_id: artistId }).fetch().subscribe(albums =>
        resolve(albums), err => reject({ message: err }))
    ).catch(err => reject(err))
  }, err => reject({ message: err }))
})

const getArtist = (id) => new Promise((resolve, reject) => {
  horizon('artists').find(id).fetch().defaultIfEmpty().subscribe(artist => {
    if (artist !== null) {
      getAlbumsByArtistId(id).then(albums => {
        resolve(Object.assign({}, artist, { albums }))
      }).catch(err => reject({ message: err }))
    }
    return window.fetch('/api/collect', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ table: 'artists', id })
    }).then(res => res.json()).then(() =>
      horizon('artists').find(id).fetch().subscribe(artist =>
        getAlbumsByArtistId(id).then(albums => {
          resolve(Object.assign({}, artist, { albums }))
        }).catch(err => reject({ message: err })),
        err => reject({ message: err }))).catch(err => reject(err))
  }, err => reject({ message: err }))
})

const getAlbum = (id) => new Promise((resolve, reject) => {
  horizon('albums').find(id).fetch().defaultIfEmpty().subscribe(album => {
    if (album !== null) {
      return resolve(album)
    }
    window.fetch('/api/collect', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ table: 'albums', id })
    }).then(res => res.json()).then(() =>
      horizon('albums').find(id).fetch().subscribe(album =>
        resolve(album), err => reject({ message: err }))
    ).catch(err => reject(err))
  }, err => reject({ message: err }))
})

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
  getCurrentUser,
  githubLogin,
  googleLogin,
  logout,
  getStatus,
  onReady,
  getPlaylist,
  getPlaylists,
  getArtist,
  getAlbum,
  getTracksByPlaylistId,
  getTracksByAlbumId
}
