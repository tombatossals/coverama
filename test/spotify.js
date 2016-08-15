import { spotifyFetchData } from '../src/lib/spotify'
import { expect } from 'chai'

// import util from 'util'

describe('spotify', () => {
  it('fetches playlists', () =>
    spotifyFetchData({
      username: 'bufanuvols',
      id: '36jKx9x02RnlsOvD8CWfc0',
      table: 'playlists'
    }).then(data => expect(data.tracks.length).to.equal(53)))

  it('fetches artist', () =>
    spotifyFetchData({
      id: '5ypxebeHEIXjMtJb17uJlI',
      table: 'artists'
    }).then(data => expect(data.name).to.equal('Jet')))

  it('fetches album', () =>
    spotifyFetchData({
      artistId: '5ypxebeHEIXjMtJb17uJlI',
      table: 'albums'
    }).then(albums => console.log(albums)))

})
