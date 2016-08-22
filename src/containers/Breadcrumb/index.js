import React from 'react'
import { connect } from 'react-redux'
import { AsyncStatus } from '../../lib/constants'
import BreadcrumbComponent from '../../components/Breadcrumb'

class Breadcrumb extends React.Component {
  static propTypes = {
    playlist: React.PropTypes.object.isRequired,
    track: React.PropTypes.object.isRequired,
    artist: React.PropTypes.object.isRequired,
    album: React.PropTypes.object.isRequired
  }

  state = {
    breadcrumb: {}
  }

  componentDidMount () {
    this.updateState(this.props);
  }

  componentWillReceiveProps (props) {
    this.updateState(props)
  }

  updateState = ({ playlist, track, artist, album, params }) => {
    let breadcrumb = {}
    if (playlist.status === AsyncStatus.SUCCESS && params && params.playlistSlug) {
      breadcrumb = Object.assign(breadcrumb, {
        playlist: {
          url: playlist.data.url,
          name: playlist.data.name,
          image_url: playlist.data.image_url
      }})
    }

    if (track.status === AsyncStatus.SUCCESS &&
        artist.status === AsyncStatus.SUCCESS &&
        params && params.trackSlug) {
      const album = artist.data.albums.find(a => a.slug === track.data.album_slug)
      if (track && album) {
        breadcrumb = Object.assign(breadcrumb, {
          album: {
            url: album.url,
            name: album.name,
            image_url: album.image_url
          },
          track: {
            url: params.playlistSlug
                ? `/playlists/${params.playlistSlug}/tracks/${track.slug}`
                : `/artists/${params.artistSlug}/tracks/${track.slug}`,
            name: track.name
          }
        })
      }
    }

    if (artist.status === AsyncStatus.SUCCESS && params && params.artistSlug) {
      breadcrumb = Object.assign(breadcrumb, {
        artist: {
          url: artist.data.url,
          name: `${artist.data.name}`,
          image_url: artist.data.image_url
        }
      })
    }

    if (artist.status === AsyncStatus.SUCCESS && album.status === AsyncStatus.SUCCESS && params && params.albumSlug) {
      breadcrumb = Object.assign(breadcrumb, {
        album: {
          url: album.data.url,
          name: `${album.data.name}`
        }
      })
    }
    this.setState({ breadcrumb })
  }

  render () {
    if (Object.keys(this.state.breadcrumb).length === 0) {
      return null
    }

    if (Object.keys(this.state.breadcrumb).length === 1 &&
        this.state.breadcrumb.hasOwnProperty('artist')) {
      return null
    }

    return <BreadcrumbComponent breadcrumb={this.state.breadcrumb} />
  }
}

const mapStateToProps = ({ playlist, track, artist, album }) => ({
  playlist,
  track,
  artist,
  album
})

export default connect(mapStateToProps)(Breadcrumb)
