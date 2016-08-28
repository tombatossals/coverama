import React from 'react'
import { Link } from 'react-router'
import './styles.css'
import Loading from '../Loading'
import AudioPlayer from '../AudioPlayer'

const Player = ({ playlist }) => {
  if (!playlist) {
    return null
  }
  return (
    <div className="Player">
      { !playlist.playlist && !playlist.artist &&
        <Loading align="left" type="spin" width={64} height={64} color="#EEE" />
      }
      { playlist.playlist
      ? <div className="main">
        <div className="info">
          { playlist.playlist
          ? <h1>
            <Link to={playlist.playlist.url}>
              {playlist.playlist.name}&nbsp;
              <span className="subtitle">playlist</span>
            </Link>
          </h1> : null }
          { playlist.artist
          ? <h2>
            <Link to={playlist.artist.url}>
              {playlist.artist.name}&nbsp;
              <span className="subtitle">artist</span>
            </Link>
          </h2> : null }
          { playlist.album
          ? <h3>
            <Link to={playlist.album.url}>
              {playlist.album.name}&nbsp;
              <span className="subtitle">album</span>
            </Link>
          </h3> : null }
          <div className="player">
            <AudioPlayer tracks={playlist} src={playlist[0].url} />
          </div>
        </div>
        <Link className="cover" to={playlist.playlist.url}>
          <img src={playlist.playlist.image_url} alt={playlist.playlist.name} />
        </Link>
      </div> : null }
      { !playlist.playlist && playlist.artist
      ? <div className="main">
        <div className="info">
          { playlist.artist
          ? <h2>
            <Link to={playlist.artist.url}>
              {playlist.artist.name}&nbsp;
              <span className="subtitle">artist</span>
            </Link>
          </h2> : null }
          { playlist.album
          ? <h3>
            <Link to={playlist.album.url}>
              {playlist.album.name}&nbsp;
              <span className="subtitle">album</span>
            </Link>
          </h3> : null }
          <div className="player">
            <AudioPlayer tracks={playlist} src={playlist[0].url} />
          </div>
        </div>
        <Link className="cover" to={playlist.artist.url}>
          <img src={playlist.album.image_url} alt={playlist.album.name} />
        </Link>
      </div> : null }
    </div>
  )
}

Player.propTypes = {
  playlist: React.PropTypes.object.isRequired,
  tracks: React.PropTypes.array.isRequired
}

export default Player
