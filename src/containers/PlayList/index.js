import React from 'react'
import PlayListComponent from '../../components/PlayList'
import { getPlayList } from '../../actions'
import { connect } from 'react-redux'
import { AsyncStatus } from '../../lib/constants'

class PlayList extends React.Component {
  static propTypes = {
    getPlayList: React.PropTypes.func.isRequired,
    playlist: React.PropTypes.object.isRequired
  }

  state = {
    playlist: {
      tracks: []
    }
  }

  componentDidMount () {
    this.props.getPlayList()
  }

  componentWillReceiveProps ({ playlist }) {
    if (playlist.status === AsyncStatus.SUCCESS) {
      this.setState({
        playlist: playlist.data
      })
    }
  }

  render () {
    return <PlayListComponent playlist={this.state.playlist} />
  }
}

const mapStateToProps = ({ playlist }) => ({
  playlist
})

export default connect(mapStateToProps, { getPlayList })(PlayList)
