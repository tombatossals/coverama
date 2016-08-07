import React from 'react'
import PlayListComponent from '../../components/PlayList'
import { getPlayLists } from '../../actions'
import { connect } from 'react-redux'
import { AsyncStatus } from '../../lib/constants'

class PlayList extends React.Component {
  static propTypes = {
    getPlayLists: React.PropTypes.func.isRequired,
    playlists: React.PropTypes.object.isRequired
  }

  state = {}

  componentDidMount () {
    if (this.props.playlists.status !== AsyncStatus.SUCCESS) {
      return this.props.getPlayLists()
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
    return <PlayListComponent playlist={this.state.playlist} />
  }
}

const mapStateToProps = ({ playlists }) => ({
  playlists
})

export default connect(mapStateToProps, { getPlayLists })(PlayList)
