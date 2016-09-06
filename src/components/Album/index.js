import React from 'react'
import './styles.css'
import { Link } from 'react-router'

const getDurationString = ms => `${(ms / 1000 / 60) << 0}:${(ms / 1000) % 60 << 0}`

const Album = ({ album, artist }) => (
  <div className="detail">
    <div className="album">
      <div className="main">
        <div className="info">
          <div className="cover">
            <img src={album.image_url} alt={album.name} />
          </div>
          <h1>{album.name}</h1>
          <h2>{album.artist_name}</h2>
          <p><Link to={album.external_url}>{album.external_url}</Link></p>
        </div>

        <div className="tracks">
          <h2>Tracks</h2>
          {album.tracks.map(track =>
            <div key={track.id} className="track">
              <div className="number">{track.track_number}.</div>
              <div className="name">
                <Link to={`/artists/${artist.slug}/albums/${album.slug}/tracks/${track.slug}`}>{track.name}</Link>
              </div>
              <div className="duration">{getDurationString(track.duration_ms)}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
)

Album.propTypes = {
  album: React.PropTypes.object,
  artist: React.PropTypes.object
}

export default Album
