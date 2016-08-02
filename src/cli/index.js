import ArgParser from '../lib/argparser'
import { getPlayList } from '../lib/spotify'
import { removePlayList, insertPlayList, closeDBConnection } from '../lib/database'
import config from '../../config'
import util from 'util'

var argv = new ArgParser()

switch (argv.getCommand()) {
  case 'list':
    getPlayList(argv.getPlayList(), config.spotify)
      .then(tracks => {
        console.log(util.inspect(tracks, {showHidden: false, depth: null}))
        closeDBConnection()
      })
      .catch(err => console.log(err))
    break
  case 'insert':
    const playlist = argv.getPlayList()
    removePlayList(playlist.id).then(() =>
      getPlayList(playlist, config.spotify)
        .then(data =>
          insertPlayList(data)
            .then(result => {
              console.log(result)
              closeDBConnection()
            })
            .catch(err => console.log(err)))
        .catch(err => console.log(err)))
    break
  case 'remove':
  default:
}
