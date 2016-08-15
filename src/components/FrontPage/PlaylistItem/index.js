import React from 'react'
import { Link } from 'react-router'
import './styles.css'
import play from './play.64.png'
import spotify from './spotify.20.png'

const PlaylistItem = ({ playlist }) => {
  return (
    <li className="playlist-item">
      <Link to={`/playlist/${playlist.slug}`}>
        <img className="cover" src={playlist.image_url} alt={playlist.name} />
        <div className="info">{playlist.name}</div>
        <div className="footer">
          <img src={spotify} role="presentation" />
        </div>
        <div className="hover">
          <img src={play} role="presentation" />
        </div>
      </Link>
    </li>
  )
}

PlaylistItem.propTypes = {
  playlist: React.PropTypes.object
}

export default PlaylistItem
