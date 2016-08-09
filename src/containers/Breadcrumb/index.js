import React from 'react'
import { connect } from 'react-redux'
import { AsyncStatus } from '../../lib/constants'
import BreadcrumbComponent from '../../components/Breadcrumb'

class Breadcrumb extends React.Component {
  static propTypes = {
    playlists: React.PropTypes.object.isRequired,
    tracks: React.PropTypes.object.isRequired,
    artist: React.PropTypes.object.isRequired,
    albums: React.PropTypes.object.isRequired
  }

  state = {
    breadcrumb: {
      playlists: { name: 'Playlists', url: '/playlists' }
    }
  }

  componentDidMount () {
    this.updateState(this.props);
  }

  componentWillReceiveProps (props) {
    this.updateState(props)
  }

  updateState = ({ playlists, tracks, artist, albums, params }) => {
    let breadcrumb = { playlists: { name: 'Playlists', url: '/playlists' } }
    if (playlists.status === AsyncStatus.SUCCESS && params && params.playlistId) {
      const playlist = playlists.data.find(p => p.id === params.playlistId)
      breadcrumb = Object.assign(breadcrumb, {
        playlist: { url: `/playlist/${playlist.id}`, name: playlist.name }
      })
    }

    if (tracks.status === AsyncStatus.SUCCESS && params && params.trackId) {
      const track = tracks.data.find(t => t.id === params.trackId)
      breadcrumb = Object.assign(breadcrumb, {
        artist: {
          url: `/artist/${track.artist_id}`,
          name: `${track.artist_name}`
        },
        album: {
          url: `/artist/${track.artist_id}/album/${track.album_id}`,
          name: `${track.album_name}`
        },
        track: {
          url: `/playlist/${params.playlistId}/track/${track.id}`,
          name: `${track.name}`
        }
      })
    }

    if (artist.status === AsyncStatus.SUCCESS && params && params.artistId) {
      breadcrumb = Object.assign(breadcrumb, {
        artist: {
          url: `/artist/${artist.data.id}`,
          name: `${artist.data.name}`
        }
      })
    }

    if (albums.status === AsyncStatus.SUCCESS && params && params.albumId) {
      const album = albums.data.find(a => a.id === params.albumId)
      if (album) {
        breadcrumb = Object.assign(breadcrumb, {
          album: {
            url: `/album/${album.id}`,
            name: `${album.name}`
          }
        })
      }
    }

    this.setState({ breadcrumb })
  }

  render () {
    return <BreadcrumbComponent breadcrumb={this.state.breadcrumb} />
  }
}

const mapStateToProps = ({ playlists, tracks, artist, albums }) => ({
  playlists,
  tracks,
  artist,
  albums
})

export default connect(mapStateToProps)(Breadcrumb)
