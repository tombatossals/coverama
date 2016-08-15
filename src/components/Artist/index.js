import React from 'react'
import './styles.css'
import Album from './Album'

const Artist = ({ artist, albums }) => (
  <div className="detail">
    <div className="artist">
      <div className="main">
        <div className="info">
          <h1>{artist.name}</h1>
        </div>
        <div className="photo">
          <img src={artist.image_url} alt={artist.name} />
        </div>
      </div>
      <div className="albums">
        <h2>Albums</h2>
        { albums.ids.map(albumId =>
          <Album key={albumId} album={albums.entities[albumId]} />
        )}
      </div>
    </div>
  </div>
)

Artist.propTypes = {
  artist: React.PropTypes.object.isRequired,
  albums: React.PropTypes.object.isRequired
}

export default Artist
