import React from 'react'
import './styles.css'

const Track = ({ track }) => (
  <div className="track">
    <h1>Track</h1>
    {track.name}
    <img src={track.album.images[0].url} alt={track.name} />
  </div>
)

Track.propTypes = {
  track: React.PropTypes.object
}

export default Track
