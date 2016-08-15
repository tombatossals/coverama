import React from 'react'
import Track from './Track'
import './styles.css'

const Playlist = ({ playlist, tracks }) => (
  <div className="detail">
    <div className="playlist">
      <h2>Tracks</h2>
      {tracks.ids.map(trackId =>
        <Track key={trackId} track={tracks.entities[trackId]} playlistSlug={playlist.slug} />
      )}
    </div>
  </div>
)

Playlist.propTypes = {
  playlist: React.PropTypes.object.isRequired,
  tracks: React.PropTypes.object.isRequired
}

export default Playlist
