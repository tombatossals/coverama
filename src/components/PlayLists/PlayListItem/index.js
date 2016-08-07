import React from 'react'
import { Link } from 'react-router'
import './styles.css'
import play from './play.64.png'

const PlayListItem = ({ playlist }) => {
  return (
    <li className="playlist-item">
      <Link to={`/playlist/${playlist.id}`}>
        <img className="cover" src={playlist.images[0].url} alt={playlist.name} />
        <div className="info">{playlist.name}</div>
        <div className="footer">Playlist name</div>
        <div className="hover">
          <img src={play} role="presentation" />
        </div>
      </Link>
    </li>
  )
}

PlayListItem.propTypes = {
  playlist: React.PropTypes.object
}

export default PlayListItem
