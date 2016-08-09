import ArgParser from '../lib/argparser'
import { spotifyFetchData } from '../lib/spotify'
import {
  dbInsert,
  closeDBConnection,
  getTables
} from '../lib/database'
import util from 'util'

var argv = new ArgParser()

switch (argv.getCommand()) {
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
    getTables().then(tables =>
      spotifyFetchData(playlist).then(data =>
        Promise.all([
          dbInsert(data.playlist, tables.playlists),
          dbInsert(data.tracks, tables.tracks),
          dbInsert(data.playlistTracks, tables.playlists_tracks)
        ]).then(result => {
          console.log(result)
          closeDBConnection()
        }).catch(err => console.log(err))
      ).catch(err => console.log(err)))
    break
  case 'remove':
  default:
}
