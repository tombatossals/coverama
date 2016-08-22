import React from 'react'
import PlaylistComponent from '../../components/Playlist'
import { getPlaylistBySlug } from '../../actions'
import { connect } from 'react-redux'
import { AsyncStatus } from '../../lib/constants'
import Loading from '../../components/Loading'

class Playlist extends React.Component {
  static propTypes = {
    getPlaylistBySlug: React.PropTypes.func.isRequired,
    playlist: React.PropTypes.object.isRequired
  }

  componentDidMount () {
    this.fetchDataIfNeeded(this.props)
  }

  componentWillReceiveProps (props) {
    this.fetchDataIfNeeded(props)
  }

  fetchDataIfNeeded = (props) => {
    if (props.playlist.status === AsyncStatus.IDLE) {
      return props.getPlaylistBySlug(props.params.playlistSlug)
    }

    if (props.playlist.status === AsyncStatus.SUCCESS &&
        props.playlist.data.slug !== props.params.playlistSlug) {
      return props.getPlaylistBySlug(props.params.playlistSlug)
    }
  }

  render () {
    if (this.props.playlist.status !== AsyncStatus.SUCCESS) {
      return <Loading type="spin" width={96} height={96} />
    }

    return <PlaylistComponent playlist={this.props.playlist.data} />
  }
}

const mapStateToProps = ({ playlist }) => ({
  playlist
})

export default connect(mapStateToProps, { getPlaylistBySlug })(Playlist)
