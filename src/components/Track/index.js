import React from 'react'
import { Link } from 'react-router'
import './styles.css'

const Track = ({ track, artist, album }) => (
  <div className='detail'>
    <div className='track'>
      <div className='main'>
        <div className='info'>
          <h1>{track.name}&nbsp;<span className='subtitle'>track</span></h1>
          <h2><Link to={artist.url}>{artist.name}</Link></h2>
        </div>
        <div className='cover'>
          <img src={track.image_url} alt={track.name} />
        </div>
      </div>
    </div>
  </div>
)

Track.propTypes = {
  track: React.PropTypes.object,
  artist: React.PropTypes.object
}

export default Track
