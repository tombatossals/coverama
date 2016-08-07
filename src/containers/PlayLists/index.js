import React from 'react'
import PlayListsComponent from '../../components/PlayLists'
import { getPlayLists } from '../../actions'
import { connect } from 'react-redux'
import { AsyncStatus } from '../../lib/constants'

class PlayLists extends React.Component {
  static propTypes = {
    getPlayLists: React.PropTypes.func.isRequired,
    playlists: React.PropTypes.object.isRequired
  }

  state = {
    playlists: []
  }

  componentDidMount () {
    this.props.getPlayLists()
  }

  componentWillReceiveProps ({ playlists }) {
    if (playlists.status === AsyncStatus.SUCCESS) {
      this.setState({
        playlists: playlists.data
      })
    }
  }

  render () {
    return <PlayListsComponent playlists={this.state.playlists} />
  }
}

const mapStateToProps = ({ playlists }) => ({
  playlists
})

export default connect(mapStateToProps, { getPlayLists })(PlayLists)
