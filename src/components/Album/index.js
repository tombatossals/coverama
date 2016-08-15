import React from 'react'
import './styles.css'
import { Link } from 'react-router'

const Album = ({ album, artist, tracks }) => (
  <div className="detail">
    <div className="album">
      <div className="main">
        <div className="info">
          <h1>{album.name}</h1>
          <div className="tracks">
            <h2>Tracks</h2>
            {tracks.map(track =>
              <div key={track.id} className="track">
                {track.track_number}.&nbsp;
                <Link to={`/artist/${track.slug}/album/${track.slug}/track/${track.slug}`}>{track.name}</Link>
              </div>
            )}
          </div>
        </div>
        <div className="cover">
          <img src={album.image_url} alt={album.name} />
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
  artist: React.PropTypes.object,
  tracks: React.PropTypes.array
}

export default Album
