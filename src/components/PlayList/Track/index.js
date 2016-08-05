import React from 'react'
import { Link } from 'react-router'
import './styles.css'
import play from './play.png'

const Track = ({ track }) => {
  return (
    <li className="track">
      <Link to={`/track/${track.id}`}>
        <img className="cover" src={track.album.images[1].url} alt={track.name} />
        <div className="info">{track.name}</div>
        <p className="footer">Playlist name</p>
        <div className="hover">
          <img src={play} role="presentation" />
        </div>
      </Link>
    </li>
  )
}

Track.propTypes = {
  track: React.PropTypes.object
}

export default Track
