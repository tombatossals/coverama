import horizon from '@horizon/client'

const hz = horizon({
  authType: 'token',
  secure: true
})

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    if (hz.hasAuthToken()) {
      hz.connect()
      return hz.currentUser().fetch().subscribe(user =>
        resolve(user)
      )
    }
    return reject({ message: 'Invalid auth token' })
  })
}

const getPlayList = () => new Promise((resolve, reject) =>
  hz('playlist').fetch().subscribe(tracks =>
    resolve(tracks),
    err => reject({ message: err }))
)

const getTrack = (id) => new Promise((resolve, reject) =>
  hz('playlist').find({ track: { id: id } }).fetch().subscribe(track =>
    resolve(track),
    err => reject({ message: err }))
)

const logout = () => {
  horizon.clearAuthTokens()
}

const getStatus = () => {
  return hz.status()
}

const githubLogin = () => {
  return hz.authEndpoint('github')
}

const googleLogin = () => {
  return hz.authEndpoint('google')
}

const getCountries = () => {
  return hz('countries').fetch()
}

const onReady = (cb) => {
  hz.onReady(cb)
}

export default {
  getCurrentUser,
  githubLogin,
  googleLogin,
  logout,
  getCountries,
  getStatus,
  onReady,
  getPlayList,
  getTrack
}
