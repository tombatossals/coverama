import React from 'react'
import PlayListComponent from '../../components/PlayList'
import { getPlayList } from '../../actions'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { AsyncStatus } from '../../lib/constants'

class PlayList extends React.Component {
  static propTypes = {
    getPlayList: React.PropTypes.func.isRequired,
    router: React.PropTypes.any
  }

  state = {
    data: []
  }

  componentDidMount () {
    this.props.getPlayList()
  }

  handleNavigate = (trackId) => {
    this.props.router.push(`/tracks/${trackId}`)
  }

  componentWillReceiveProps (props) {
    if (props.playlist.status === AsyncStatus.SUCCESS) {
      this.setState({
        data: props.playlist.data
      })
    }
  }

  render () {
    return (
      <PlayListComponent
        onNavigationChange={this.handleNavigate}
        data={this.state.data}
      />
    )
  }
}

const mapStateToProps = ({ playlist }) => ({
  playlist
})

export default withRouter(connect(mapStateToProps, { getPlayList })(PlayList))
