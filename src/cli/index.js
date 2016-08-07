import ArgParser from '../lib/argparser'
import { spotifyFetchData } from '../lib/spotify'
import {
  insertPlayListTracks,
  insertPlayList,
  insertTracks,
  closeDBConnection,
  getTables
} from '../lib/database'
import util from 'util'

var argv = new ArgParser()

switch (argv.getCommand()) {
  case 'list':
    spotifyFetchData(argv.getPlayList())
      .then(tracks => {
        console.log(util.inspect(tracks, {showHidden: false, depth: null}))
        closeDBConnection()
      })
      .catch(err => console.log(err))
    break
  case 'insert':
    const playlist = argv.getPlayList()
    getTables().then(tables =>
      getPlayListAndTracks(playlist)
        .then(playlist => {
          const playlistTracks = playlist.tracks.items.map(item => ({
            added_at: item.playlist_id,
            added_by: item.added_by,
            playlist_id: item.playlist_id,
            track_id: item.track.id
          }))

          const tracks = playlist.tracks.items.map(item => item.track)
          Promise.all([
            insertPlayList(playlist, tables.playlists),
            insertTracks(tracks, tables.tracks),
            insertPlayListTracks(playlistTracks, tables.playlists_tracks)
          ]).then(result => {
            console.log(result)
            closeDBConnection()
          }).catch(err => console.log(err))
        }).catch(err => console.log(err))
    )
    break
  case 'remove':
  default:
}
