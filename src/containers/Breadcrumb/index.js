import React from 'react'
import { connect } from 'react-redux'
import { AsyncStatus } from '../../lib/constants'
import BreadcrumbComponent from '../../components/Breadcrumb'

class Breadcrumb extends React.Component {
  static propTypes = {
    playlists: React.PropTypes.object.isRequired,
    track: React.PropTypes.object.isRequired,
    artist: React.PropTypes.object.isRequired,
    album: React.PropTypes.object.isRequired
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

  updateState = ({ playlists, track, artist, params }) => {
    let breadcrumb = { playlists: { name: 'Playlists', url: '/playlists' } }
    if (playlists.status === AsyncStatus.SUCCESS && params && params.playlistId) {
      const playlist = playlists.data.find(p => p.id === params.playlistId)
      breadcrumb = Object.assign(breadcrumb, {
        playlist: { url: `/playlist/${playlist.id}`, name: playlist.name }
      })
    }

    if (track.status === AsyncStatus.SUCCESS && params && params.trackId) {
      breadcrumb = Object.assign(breadcrumb, {
        artist: {
          url: `/artist/${track.data.artists[0].id}`,
          name: `${track.data.artists[0].name}`
        },
        album: {
          url: `/artist/${track.data.artists[0].id}/album/${track.data.album.id}`,
          name: `${track.data.album.name}`
        },
        track: {
          url: `/playlist/${params.playlistId}/track/${track.data.id}`,
          name: `${track.data.name}`
        }
      })
    }

    if (artist.status === AsyncStatus.SUCCESS && params && params.artistId) {
      breadcrumb = Object.assign(breadcrumb, {
        artist: {
          url: `/artist/${artist.id}`,
          name: `${artist.data.name}`
        }
      })
    }


    this.setState({ breadcrumb })
  }

  render () {
    return <BreadcrumbComponent breadcrumb={this.state.breadcrumb} />
  }
}

const mapStateToProps = ({ playlists, track, artist, album }) => ({
  playlists,
  track,
  artist,
  album
})

export default connect(mapStateToProps)(Breadcrumb)
