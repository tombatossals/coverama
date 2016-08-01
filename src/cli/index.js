import ArgParser from '../lib/argparser'
import { getPlayList } from '../lib/spotify'
import { insertPlayList } from '../lib/database'
import config from '../../config'
import util from 'util'

var argv = new ArgParser()

switch (argv.getCommand()) {
  case 'list':
    getPlayList(argv.getPlayList(), config.spotify)
      .then(tracks => console.log(util.inspect(tracks, {showHidden: false, depth: null})))
      .catch(err => console.log(err))
    break
  case 'insert':
    getPlayList(argv.getPlayList(), config.spotify)
      .then(data => insertPlayList(data))
      .catch(err => console.log(err))
    break
  case 'remove':
  default:
}
