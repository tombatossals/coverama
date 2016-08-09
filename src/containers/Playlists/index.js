import React from 'react'
import PlaylistsComponent from '../../components/Playlists'
import { getPlaylists } from '../../actions'
import { connect } from 'react-redux'
import { AsyncStatus } from '../../lib/constants'

class Playlists extends React.Component {
  static propTypes = {
    getPlaylists: React.PropTypes.func.isRequired,
    playlists: React.PropTypes.object.isRequired
  }

  state = {
    playlists: []
  }

  componentDidMount () {
    this.props.getPlaylists()
  }

  componentWillReceiveProps ({ playlists }) {
    if (playlists.status === AsyncStatus.SUCCESS) {
      this.setState({
        playlists: playlists.data
      })
    }
  }

  render () {
    return <PlaylistsComponent playlists={this.state.playlists} />
  }
}

const mapStateToProps = ({ playlists }) => ({
  playlists
})

export default connect(mapStateToProps, { getPlaylists })(Playlists)
