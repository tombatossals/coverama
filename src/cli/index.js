import ArgParser from '../lib/argparser'
import { spotifyFetchData } from '../lib/spotify'
import {
  dbInsert,
  dbDelete,
  updateImages,
  closeDBConnection,
  getTables
} from '../lib/database'
import util from 'util'

var argv = new ArgParser()

switch (argv.getCommand()) {
  case 'clear':
    getTables()
      .then(tables => dbDelete(tables).then(closeDBConnection))
      .catch(err => console.log(err))
    break
  case 'compute':
    const table = argv.getFirstArgument()
    const width = argv.getSecondArgument()
    getTables()
      .then(tables => updateImages(tables[table], width).then(closeDBConnection))
      .catch(err => console.log(err))
    break
  case 'list':
    spotifyFetchData(argv.getPlaylist())
      .then(tracks => {
        console.log(util.inspect(tracks, {showHidden: false, depth: null}))
        closeDBConnection()
      })
      .catch(err => console.log(err))
    break
  case 'insert':
    const playlist = argv.getPlaylist()
    spotifyFetchData(playlist).then(data =>
      Promise.all([
        dbInsert(data.playlist, 'playlists'),
        dbInsert(data.tracks, 'tracks'),
        dbInsert(data.playlistTracks, 'playlists_tracks')
      ]).then(result => {
        console.log(result)
        closeDBConnection()
      }).catch(err => console.log(err)))
    break
  case 'remove':
  default:
}
