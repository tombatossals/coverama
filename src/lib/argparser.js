import * as yargs from 'yargs'
import * as url from 'url'

export default class {
  constructor () {
    this.argv = yargs.demand(2)
      .usage('Usage: $0 <action> <RockBand Playlist ID>')
      .check(this.check)
      .argv
  }

  check (argv, options) {
    return true
  }

  getCommand () {
    return this.argv._[0]
  }

  getPlaylist () {
    var pathname = url.parse(this.argv._[1]).pathname.split('/')

    return {
      username: pathname.slice(-3)[0],
      id: pathname.slice(-1)[0],
      table: 'playlists'
    }
  }
}
