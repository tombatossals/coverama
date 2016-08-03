import Horizon from '@horizon/client'

const horizon = new Horizon({
  authType: 'anonymous',
  secure: false
})

horizon.connect()

/*
const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    if (hz.hasAuthToken()) {
      hz.connect()
      return hz.currentUser().fetch().subscribe(user => {
        console.log(user)
        resolve(user)
      }, err => reject({ message: err.message }))
    }

    return reject({ message: 'Invalid auth token' })
  })
}
*/

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    // hz.connect()
    resolve({ id: 'anonymous' })
  })
}

const getPlayList = () => new Promise((resolve, reject) =>
  horizon('playlists').fetch().subscribe(playlists =>
    horizon('tracks').fetch().subscribe(tracks =>
      resolve({ playlist: '123', tracks }),
      err => reject({ message: err })),
    err => reject({ message: err }))
)

const getTrack = (id) => new Promise((resolve, reject) =>
  horizon('tracks').find({ id }).fetch().subscribe(track =>
    resolve(track),
    err => reject({ message: err }))
)

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
  getTrack
}
