import React from 'react'
import './styles.css'
import Album from './Album'

const Artist = ({ artist }) => (
  <div className="detail">
    <div className="artist">
      <div className="albums">
        <h2>Albums</h2>
        { artist.albums.map(album =>
          <Album key={album.id} album={album} />
        )}
      </div>
    </div>
  </div>
)

Artist.propTypes = {
  artist: React.PropTypes.object.isRequired
}

export default Artist
