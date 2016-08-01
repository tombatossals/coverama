import React from 'react'
import PlayListComponent from '../../components/PlayList'
import { getPlayList } from '../../actions'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

class PlayList extends React.Component {
  static propTypes = {
    getPlayList: React.PropTypes.func.isRequired,
    router: React.PropTypes.any
  }

  state = {
    tracks: []
  }

  componentDidMount () {
    this.props.getPlayList()
  }

  componentWillReceiveProps (props) {
    this.setState({
      tracks: props.playlist
    })
  }

  render () {
    return (
      <PlayListComponent
        tracks={this.state.tracks}
      />
    )
  }
}

const mapStateToProps = ({ playlist }) => ({
  playlist
})

export default withRouter(connect(mapStateToProps, { getPlayList })(PlayList))
