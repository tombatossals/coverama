import rethinkdbdash from 'rethinkdbdash'
import config from '../../config'

const r = rethinkdbdash(config.rethinkdb)

export const insertPlayList = (data) =>
  r.table('playlist_44aaf67e7baf')
    .insert(data.tracks)

export const removePlayList = (playlistID) =>
  r.table('playlist_44aaf67e7baf')
    .filter({ playlist_id: playlistID }).delete()

export const closeDBConnection = () => r.getPoolMaster().drain()

