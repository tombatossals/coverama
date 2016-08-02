import React from 'react'
import { Link } from 'react-router'
import './styles.css'

const Track = ({ track }) => {
  return (
    <li className="track">
      <Link to={`/track/${track.id}`}>
        <img src={track.album.images[1].url} alt={track.name} />
        <div>{track.name}</div>
        <p>Rock Band</p>
      </Link>
    </li>
  )
}

Track.propTypes = {
  track: React.PropTypes.object
}

export default Track
