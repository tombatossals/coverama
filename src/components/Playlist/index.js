import React from 'react'
import Track from './Track'
import './styles.css'

const Playlist = ({ playlist }) => (
  <div className="playlist">
  {playlist.tracks.map(track =>
    <Track key={track.id} track={track} playlistId={playlist.id} />
  )}
  </div>
)

Playlist.propTypes = {
  playlist: React.PropTypes.object.isRequired
}

export default Playlist
