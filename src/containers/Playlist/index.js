import React from 'react'
import PlaylistComponent from '../../components/Playlist'
import { getPlaylistBySlug } from '../../actions'
import { connect } from 'react-redux'
import { AsyncStatus } from '../../lib/constants'
import Loading from '../../components/Loading'

class Playlist extends React.Component {
  static propTypes = {
    getPlaylistBySlug: React.PropTypes.func.isRequired,
    playlists: React.PropTypes.object.isRequired
  }

  componentDidMount () {
    this.fetchDataIfNeeded(this.props)
  }

  componentWillReceiveProps (props) {
    this.fetchDataIfNeeded(props)
  }

  fetchDataIfNeeded = (props) => {
    if (props.playlists.status === AsyncStatus.IDLE) {
      return props.getPlaylistBySlug(props.params.playlistSlug)
    }

    if (props.tracks.status === AsyncStatus.IDLE) {
      return props.getPlaylistBySlug(props.params.playlistSlug)
    }

    if (props.tracks.status === AsyncStatus.SUCCESS &&
        props.tracks.playlistSlug !== props.params.playlistSlug) {
      return props.getPlaylistBySlug(props.params.playlistSlug)
    }
  }

  findBySlug(data, slug) {
    for (const id of data.ids) {
      if (data.entities[id].slug === slug) {
        return data.entities[id]
      }
    }
  }

  render () {
    if (this.props.playlists.status !== AsyncStatus.SUCCESS
       || this.props.tracks.status !== AsyncStatus.SUCCESS) {
      return <Loading type="spin" width={96} height={96} />
    }

    const playlist = this.findBySlug(this.props.playlists, this.props.params.playlistSlug)
    return <PlaylistComponent playlist={playlist} tracks={this.props.tracks} />
  }
}

const mapStateToProps = ({ playlists, tracks }) => ({
  playlists,
  tracks
})

export default connect(mapStateToProps, { getPlaylistBySlug })(Playlist)
