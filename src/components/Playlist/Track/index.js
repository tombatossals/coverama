import React from 'react'
import { Link } from 'react-router'
import './styles.css'
import play from './play.32.png'

const Track = ({ track, playlistSlug }) => {
  return (
    <div className="track">
      <Link to={`/playlist/${playlistSlug}/track/${track.slug}`}>
        <img className="cover" src={track.image_url} alt={track.name} />
        <div className="info">
          {track.name}
          <hr />
          {track.artist_name}
        </div>
        <div className="footer">Playlist name</div>
        <div className="hover">
          <img src={play} role="presentation" />
        </div>
      </Link>
    </div>
  )
}

Track.propTypes = {
  track: React.PropTypes.object.isRequired,
  playlistSlug: React.PropTypes.string.isRequired
}

export default Track
