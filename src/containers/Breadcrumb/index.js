import React from 'react'
import { connect } from 'react-redux'
import { AsyncStatus } from '../../lib/constants'
import BreadcrumbComponent from '../../components/Breadcrumb'

class Breadcrumb extends React.Component {
  static propTypes = {
    playlists: React.PropTypes.object.isRequired,
    tracks: React.PropTypes.object.isRequired,
    artists: React.PropTypes.object.isRequired,
    albums: React.PropTypes.object.isRequired
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

  findBySlug(data, slug) {
    for (const id of data.ids) {
      if (data.entities[id].slug === slug) {
        return data.entities[id]
      }
    }
  }

  updateState = ({ playlists, tracks, artists, albums, params }) => {
    let breadcrumb = {}
    if (playlists.status === AsyncStatus.SUCCESS && params && params.playlistSlug) {
      const playlist = this.findBySlug(playlists, params.playlistSlug)
      breadcrumb = Object.assign(breadcrumb, {
        playlist: {
          url: `/playlist/${playlist.slug}`,
          name: playlist.name,
          image_url: playlist.image_url
      }})
    }

    if (tracks.status === AsyncStatus.SUCCESS && params && params.trackSlug) {
      const track = this.findBySlug(tracks, params.trackSlug)
      breadcrumb = Object.assign(breadcrumb, {
        artist: {
          url: `/artist/${track.artist_slug}`,
          name: track.artist_name,
          image_url: track.artist_image_url
        },
        album: {
          url: `/artist/${track.artist_slug}/album/${track.album_slug}`,
          name: track.album_name,
          image_url: track.album_image_url
        },
        track: {
          url: params.playlistSlug
               ? `/playlist/${params.playlistSlug}/track/${track.slug}`
               : `/artist/${params.artistSlug}/track/${track.slug}`,
          name: track.name
        }
      })
    }

    if (artists.status === AsyncStatus.SUCCESS && params && params.artistSlug) {
      const artist = this.findBySlug(artists, params.artistSlug)

      if (artist) {
        breadcrumb = Object.assign(breadcrumb, {
          artist: {
            url: `/artist/${artist.slug}`,
            name: `${artist.name}`,
            image_url: artist.image_url
          }
        })
      }
    }

    if (albums.status === AsyncStatus.SUCCESS && params && params.albumSlug &&
        params.artistSlug && albums.artistSlug === params.artistSlug) {
      const album = this.findBySlug(albums, params.albumSlug)
      if (album) {
        breadcrumb = Object.assign(breadcrumb, {
          album: {
            url: `/artist/${album.artist_slug}/album/${album.slug}`,
            name: `${album.name}`
          }
        })
      }
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

const mapStateToProps = ({ playlists, tracks, artists, albums }) => ({
  playlists,
  tracks,
  artists,
  albums
})

export default connect(mapStateToProps)(Breadcrumb)
