import React from 'react'
import FrontPageComponent from '../../components/FrontPage'
import { getPlaylists } from '../../actions'
import { connect } from 'react-redux'
import { AsyncStatus } from '../../lib/constants'

class FrontPage extends React.Component {
  static propTypes = {
    getPlaylists: React.PropTypes.func.isRequired,
    playlists: React.PropTypes.object.isRequired
  }

  componentDidMount () {
    this.props.getPlaylists()
  }

  render () {
    if (this.props.playlists.status !== AsyncStatus.SUCCESS) {
      return null
    }
    return <FrontPageComponent playlists={this.props.playlists} />
  }
}

const mapStateToProps = ({ playlists }) => ({
  playlists
})

export default connect(mapStateToProps, { getPlaylists })(FrontPage)
