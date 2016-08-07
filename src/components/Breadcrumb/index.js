import React from 'react'
import './styles.css'
import { Link } from 'react-router'

const Breadcrumb = ({ breadcrumb }) => {
  if (!breadcrumb) {
    return null
  }
  return (
    <div className="breadcrumb">
      <Link to={breadcrumb.playlists.url}>{breadcrumb.playlists.name}</Link>
      {breadcrumb.playlist
        ? <Link to={breadcrumb.playlist.url}>{breadcrumb.playlist.name}</Link>
        : null
      }
      {breadcrumb.artist
        ? <Link to={breadcrumb.artist.url}>{breadcrumb.artist.name}</Link>
        : null
      }
      {breadcrumb.album
        ? <Link to={breadcrumb.album.url}>{breadcrumb.album.name}</Link>
        : null
      }
      {breadcrumb.track
        ? <Link to={breadcrumb.track.url}>{breadcrumb.track.name}</Link>
        : null
      }
    </div>
  )
}

Breadcrumb.propTypes = {
  breadcrumb: React.PropTypes.object.isRequired
}

export default Breadcrumb
