import React from 'react'
import './styles.css'
import Album from './Album'

const Artist = ({ artist, albums }) => (
  <div className="artist-detail">
    <div className="artist">
      <div className="photo">
        <img src={artist.image_url} alt={artist.name} />
      </div>
      <div className="info">
        <h1>Artist</h1>
        <h1>{artist.name}</h1>
      </div>
    </div>
    <div className="albums">
      { albums.map(album =>
        <Album key={album.id} album={album} />
      )}
    </div>
  </div>
)

Artist.propTypes = {
  artist: React.PropTypes.object.isRequired,
  albums: React.PropTypes.array.isRequired
}

export default Artist
