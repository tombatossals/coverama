import React from 'react'
import './styles.css'

const Album = ({ album, artist }) => (
  <div className="album">
    <div className="cover">
      <img src={album.images[1].url} alt={album.name} />
    </div>
    <div className="info">
      <h1>Album</h1>
      <h1>{album.name}</h1>
    </div>
  </div>
)

Album.propTypes = {
  album: React.PropTypes.object,
  artist: React.PropTypes.object
}

export default Album
