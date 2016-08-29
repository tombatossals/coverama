import React from 'react'
import Track from './Track'
import './styles.css'

const Playlist = ({ playlist }) => (
  <div className="detail">
    <div className="playlist">
      <div className="info">
        <h1>{playlist.name}</h1>
        <div className="cover">
          <img src={playlist.image_url} />
        </div>
      </div>
      <div className="tracks">
        <h2>Tracks</h2>
        {playlist.tracks.map(track =>
          <Track key={track.id} track={track} playlist={playlist} />
        )}
      </div>
    </div>
  </div>
)

Playlist.propTypes = {
  playlist: React.PropTypes.object.isRequired
}

export default Playlist
