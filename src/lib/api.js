import Horizon from '@horizon/client'

const horizon = new Horizon({
  authType: 'anonymous',
  secure: false
})

horizon.connect()

/* Create tables */
// horizon('playlists_tracks').fetch().subscribe()
// horizon('playlists').fetch().subscribe()
// horizon('tracks').fetch().subscribe()
// horizon('albums').fetch().subscribe()
// horizon('artists').fetch().subscribe()

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

const getPlayList = () => new Promise((resolve, reject) =>
  horizon('playlists').fetch().subscribe(playlists =>
    horizon('tracks').fetch().subscribe(tracks =>
      resolve({ playlist: '123', tracks }),
      err => reject({ message: err })),
    err => reject({ message: err }))
)

const getPlayLists = () => new Promise((resolve, reject) =>
  horizon('playlists').fetch().subscribe(playlists =>
    resolve(playlists),
  err => reject({ message: err }))
)

const getTrack = (id) => new Promise((resolve, reject) =>
  horizon('tracks').find({ id }).fetch().subscribe(track =>
    resolve(track),
    err => reject({ message: err }))
)

const getArtist = (id) => new Promise((resolve, reject) => {
  horizon('artists').find(id).fetch().defaultIfEmpty().subscribe(artist => {
    if (artist !== null) {
      return resolve(artist)
    }

    return window.fetch('/api/collect', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ table: 'artists', id })
    }).then(res => res.json()).then(() =>
      horizon('artists').find(id).fetch().defaultIfEmpty().subscribe(artist => resolve(artist),
        err => reject({ message: err }))).catch(err => reject(err))
  }, err => {
    reject({ message: err })
  })
})

const getAlbum = (id) => new Promise((resolve, reject) => {
  horizon('albums').find(id).fetch().defaultIfEmpty().subscribe(album => {
    if (album !== null) {
      return resolve(album)
    }

    return window.fetch('/api/collect', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ table: 'albums', id })
    }).then(res => res.json()).then(() =>
      horizon('albums').find(id).fetch().defaultIfEmpty().subscribe(album => resolve(album),
        err => reject({ message: err }))).catch(err => reject(err))
  }, err => {
    reject({ message: err })
  })
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
  getPlayList,
  getPlayLists,
  getArtist,
  getAlbum,
  getTrack
}
