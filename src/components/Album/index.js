import React from 'react'
import './styles.css'
import { Link } from 'react-router'

const Album = ({ album, artist }) => (
  <div className="detail">
    <div className="album">
      <div className="main">
        <div className="info">
          <div className="cover">
            <img src={album.image_url} alt={album.name} />
          </div>
          <h1>{album.name}</h1>
          <div className="tracks">
            <h2>Tracks</h2>
            {album.tracks.map(track =>
              <div key={track.id} className="track">
                {track.track_number}.&nbsp;
                <Link to={`/artist/${artist.slug}/album/${album.slug}/track/${track.slug}`}>{track.name}</Link>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="artist">
        <h2>Artist</h2>
        {artist.name}
      </div>
    </div>
  </div>
)

Album.propTypes = {
  album: React.PropTypes.object,
  artist: React.PropTypes.object
}

export default Album
