import React from 'react'
import { connect } from 'react-redux'
import { PlayerStatus } from '../../lib/constants'
import PlayerComponent from '../../components/Player'

class Player extends React.Component {
  static propTypes = {
    player: React.PropTypes.object.isRequired
  }

  render () {
    if (this.props.player.status === PlayerStatus.IDLE) {
      return null
    }

    return <PlayerComponent tracks={this.props.player.tracks} />
  }
}

const mapStateToProps = ({ player }) => ({
  player
})

export default connect(mapStateToProps)(Player)
