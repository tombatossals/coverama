import React from 'react'
import './styles.css'

const Artist = ({ artist }) => (
  <div className="artist">
    <div className="photo">
      <img src={artist.images[1].url} alt={artist.name} />
    </div>
    <div className="info">
      <h1>{artist.name}</h1>
    </div>
  </div>
)

Artist.propTypes = {
  artist: React.PropTypes.object
}

export default Artist
