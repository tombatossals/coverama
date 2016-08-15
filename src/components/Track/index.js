import React from 'react'
import './styles.css'

const Track = ({ track }) => (
  <div className="detail">
    <div className="track">
      <div className="main">
        <div className="info">
          <h1>{track.name}&nbsp;<span className="subtitle">track</span></h1>
        </div>
        <div className="cover">
          <img src={track.image_url} alt={track.name} />
        </div>
      </div>
    </div>
  </div>
)

Track.propTypes = {
  track: React.PropTypes.object
}

export default Track
