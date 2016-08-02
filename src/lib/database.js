import rethinkdbdash from 'rethinkdbdash'
import config from '../../config'

const r = rethinkdbdash(config.rethinkdb)

export const getTables = () => {
  return new Promise((resolve, reject) =>
    r.tableList().then(tables => {
      const mapTables = {}
      tables.map(table => {
        mapTables[table.substring(0, table.lastIndexOf('_'))] = table
      })
      resolve(mapTables)
    })
  )
}

export const insertPlayList = (playlist, tableName) =>
  r.table(tableName)
    .insert(playlist)

export const insertTracks = (tracks, tableName) =>
  r.table(tableName)
    .insert(tracks)

export const insertPlayListTracks = (playlistTracks, tableName) =>
  r.table(tableName)
    .insert(playlistTracks)

export const removePlayList = (playlistID, tableName) =>
  r.table(tableName)
    .filter({ playlist_id: playlistID }).delete()

export const closeDBConnection = () => r.getPoolMaster().drain()

