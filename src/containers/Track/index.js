import React from 'react'
import TrackComponent from '../../components/Track'
import { getTracksByPlaylistId, getPlaylist } from '../../actions'
import { connect } from 'react-redux'
import { AsyncStatus } from '../../lib/constants'

class Track extends React.Component {
  static propTypes = {
    getTracksByPlaylistId: React.PropTypes.func.isRequired,
    router: React.PropTypes.any
  }

  state = {}

  componentDidMount () {
    if (this.props.tracks.status !== AsyncStatus.SUCCESS) {
      this.props.getTracksByPlaylistId(this.props.params.playlistId)
    }

    if (this.props.playlists.status !== AsyncStatus.SUCCESS) {
      this.props.getPlaylist(this.props.params.playlistId)
    }

    this.updateState(this.props)
  }

  componentWillReceiveProps(props) {
    this.updateState(props)
  }

  updateState = (props) => {
    if (props.tracks.status === AsyncStatus.SUCCESS) {
      this.setState({
        track: props.tracks.data.find(t => t.id === props.params.trackId),
      })
    }
  }

  render () {
    if (!this.state.track) {
      return null
    }

    return (
      <TrackComponent
        track={this.state.track}
      />
    )
  }
}

const mapStateToProps = ({ tracks, playlists }) => ({
  tracks,
  playlists
})

export default connect(mapStateToProps, { getTracksByPlaylistId, getPlaylist })(Track)
