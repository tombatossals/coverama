import React from 'react'
import { Link } from 'react-router'
import './styles.css'
import Loading from '../Loading'

const Breadcrumb = ({ breadcrumb }) => {
  if (!breadcrumb) {
    return null
  }
  return (
    <div className="breadcrumb">
      { !breadcrumb.playlist && !breadcrumb.artist &&
        <Loading align="left" type="spin" width={64} height={64} color="#EEE" />
      }
      { breadcrumb.playlist
      ? <div className="playlist">
        <Link className="cover" to={breadcrumb.playlist.url}>
          <img src={breadcrumb.playlist.image_url} alt={breadcrumb.playlist.name} />
        </Link>
        <div className="info">
          { breadcrumb.playlist
          ? <h1>
            <Link to={breadcrumb.playlist.url}>
              {breadcrumb.playlist.name}&nbsp;
              <span className="subtitle">playlist</span>
            </Link>
          </h1> : null }
          { breadcrumb.artist
          ? <h2>
            <Link to={breadcrumb.artist.url}>
              {breadcrumb.artist.name}&nbsp;
              <span className="subtitle">artist</span>
            </Link>
          </h2> : null }
          { breadcrumb.album
          ? <h3>
            <Link to={breadcrumb.album.url}>
              {breadcrumb.album.name}&nbsp;
              <span className="subtitle">album</span>
            </Link>
          </h3> : null }
        </div>
      </div> : null }
      { !breadcrumb.playlist && breadcrumb.album
      ? <div className="playlist">
        <Link className="cover" to={breadcrumb.artist.url}>
          <img src={breadcrumb.artist.image_url} alt={breadcrumb.artist.name} />
        </Link>
        <div className="info">
          { breadcrumb.artist
          ? <h2>
            <Link to={breadcrumb.artist.url}>
              {breadcrumb.artist.name}&nbsp;
              <span className="subtitle">artist</span>
            </Link>
          </h2> : null }
          { breadcrumb.album
          ? <h3>
            <Link to={breadcrumb.album.url}>
              {breadcrumb.album.name}&nbsp;
              <span className="subtitle">album</span>
            </Link>
          </h3> : null }
        </div>
      </div> : null }
    </div>
  )
}

Breadcrumb.propTypes = {
  breadcrumb: React.PropTypes.object.isRequired
}

export default Breadcrumb
