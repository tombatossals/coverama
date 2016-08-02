import React from 'react'
import { Link } from 'react-router'
import './styles.css'

const Track = ({ track }) => {
  return (
    <li className="track">
      <Link to={`/track/${track.id}`}>{track.name}</Link>
    </li>
  )
}

Track.propTypes = {
  track: React.PropTypes.object
}

export default Track
