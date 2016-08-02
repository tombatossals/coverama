import React from 'react'
import PlayListComponent from '../../components/PlayList'
import { getPlayList } from '../../actions'
import { connect } from 'react-redux'
import { AsyncStatus } from '../../lib/constants'

class PlayList extends React.Component {
  static propTypes = {
    getPlayList: React.PropTypes.func.isRequired,
    router: React.PropTypes.any
  }

  state = {
    playlist: {}
  }

  componentDidMount () {
    this.props.getPlayList()
  }

  componentWillReceiveProps (props) {
    if (props.playlist.status === AsyncStatus.SUCCESS) {
      this.setState({
        playlist: props.playlist.data
      })
    }
  }

  render () {
    return (
      <PlayListComponent
        playlist={this.state.data}
      />
    )
  }
}

const mapStateToProps = ({ playlist }) => ({
  playlist
})

export default connect(mapStateToProps, { getPlayList })(PlayList)
