import { Schema, arrayOf } from 'normalizr'

export const playlistSchema = new Schema('playlists')
export const trackSchema = new Schema('tracks')
export const genreSchema = new Schema('genres', { idAttribute: 'name' })
export const albumSchema = new Schema('albums')
export const artistSchema = new Schema('artists')

playlistSchema.define({
  tracks: arrayOf(trackSchema)
})

artistSchema.define({
  albums: arrayOf(albumSchema),
  genres: arrayOf(genreSchema)
})
