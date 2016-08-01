import r from 'rethinkdbdash'

export const insertPlayList = (data) =>
  new Promise((resolve, reject) => {
    for (const track of data.tracks) {
      console.log(track)
    }
    resolve(data)
})
