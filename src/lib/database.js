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

export const dbInsert = (data, table) =>
  r.table(table)
    .insert(data, { conflict: 'update' })

export const removePlaylist = (playlistID, tableName) =>
  r.table(tableName)
    .filter({ playlist_id: playlistID }).delete()

export const closeDBConnection = () => r.getPoolMaster().drain()

