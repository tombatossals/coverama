import React from 'react'
import './styles.css'

const Track = ({ track }) => (
  <div className="track-detail">
    <div className="cover">
      <img src={track.album.images[1].url} alt={track.name} />
    </div>
    <div className="info">
      <h1>{track.name}</h1>
    </div>
  </div>
)

Track.propTypes = {
  track: React.PropTypes.object
}

export default Track
