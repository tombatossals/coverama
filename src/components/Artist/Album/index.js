import React from 'react'
import { Link } from 'react-router'
import './styles.css'
import play from './play.32.png'

const Album = ({ album }) => {
  return (
    <div className="album">
      <Link to={`/artist/${album.artist_id}/album/${album.id}`}>
        <img className="cover" src={album.image_url} alt={album.name} />
        <div className="info">
          {album.name}
        </div>
        <div className="footer">Album name</div>
        <div className="hover">
          <img src={play} role="presentation" />
        </div>
      </Link>
    </div>
  )
}

Album.propTypes = {
  album: React.PropTypes.object.isRequired
}

export default Album
