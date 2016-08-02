import ArgParser from '../lib/argparser'
import { getPlayListAndTracks } from '../lib/spotify'
import {
  insertPlayListTracks,
  insertPlayList,
  insertTracks,
  closeDBConnection,
  getTables
} from '../lib/database'
import config from '../../config'
import util from 'util'

var argv = new ArgParser()

switch (argv.getCommand()) {
  case 'list':
    getPlayListAndTracks(argv.getPlayList(), config.spotify)
      .then(tracks => {
        console.log(util.inspect(tracks, {showHidden: false, depth: null}))
        closeDBConnection()
      })
      .catch(err => console.log(err))
    break
  case 'insert':
    const playlist = argv.getPlayList()
    getTables().then(tables =>
      getPlayListAndTracks(playlist, config.spotify)
        .then(data => {
          const playlist = { id: data.tracks[0].playlist_id }
          const playlistTracks = data.tracks.map(item => ({
            added_at: item.playlist_id,
            added_by: item.added_by,
            playlist_id: item.playlist_id,
            track_id: item.track.id
          }))

          const tracks = data.tracks.map(item => item.track)
          insertPlayList(playlist, tables.playlists)
            .then(result =>
              insertTracks(tracks, tables.tracks).then(result =>
                insertPlayListTracks(playlistTracks, tables.playlists_tracks).then(result => {
                  console.log(result)
                  closeDBConnection()
                })
                .catch(err => console.log(err))
              .catch(err => console.log(err))))
            .catch(err => console.log(err))
        })
    )
    break
  case 'remove':
  default:
}
