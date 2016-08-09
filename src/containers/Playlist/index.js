import React from 'react'
import PlaylistComponent from '../../components/Playlist'
import { getPlaylist } from '../../actions'
import { connect } from 'react-redux'
import { AsyncStatus } from '../../lib/constants'

class Playlist extends React.Component {
  static propTypes = {
    getPlaylist: React.PropTypes.func.isRequired,
    playlists: React.PropTypes.object.isRequired
  }

  state = {}

  componentDidMount () {
    if (this.props.playlists.status !== AsyncStatus.SUCCESS) {
      return this.props.getPlaylist(this.props.params.playlistId)
    }

    const playlist = this.props.playlists.data.find(p => p.id === this.props.params.playlistId)

    if (!playlist.tracks) {
      return this.props.getPlaylist(this.props.params.playlistId)
    }
    this.updateActivePlaylist(this.props)
  }

  componentWillReceiveProps (props) {
    this.updateActivePlaylist(props)
  }

  updateActivePlaylist(props) {
    if (props.playlists.status === AsyncStatus.SUCCESS) {
      this.setState({
        playlist: props.playlists.data.find(p => p.id === props.params.playlistId)
      })
    }
  }

  render () {
    if (!this.state.playlist) {
      return null
    }
    return <PlaylistComponent playlist={this.state.playlist} />
  }
}

const mapStateToProps = ({ playlists }) => ({
  playlists
})

export default connect(mapStateToProps, { getPlaylist })(Playlist)
