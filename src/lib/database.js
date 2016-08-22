import rethinkdbdash from 'rethinkdbdash'
import config from '../../config'
import jimp from 'jimp'

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

const updateHeight = (tableName, item, width) =>
  jimp.read(item.image_url).then(image =>
    r.table(tableName).update(Object.assign({}, item, {
      image_height: Math.round(image.bitmap.height * width / image.bitmap.width)
    }))).catch(err => console.log(err))

export const updateImages = (tableName, width) =>
  r.table(tableName).then(items => {
    const promises = []
    items.map(item => promises.push(updateHeight(tableName, item, width)))
    return Promise.all(promises)
  })

export const dbDelete = (tables) => {
  const actions = []
  for (const id of Object.keys(tables)) {
    actions.push(r.table(tables[id]).delete())
  }
  return Promise.all(actions)
}

export const removePlaylist = (playlistID, tableName) =>
  r.table(tableName)
    .filter({ playlist_id: playlistID }).delete()

export const closeDBConnection = () => r.getPoolMaster().drain()

