import React from 'react'
import TrackComponent from '../../components/Track'
import { getTrack } from '../../actions'
import { connect } from 'react-redux'
import { AsyncStatus } from '../../lib/constants'

class Track extends React.Component {
  static propTypes = {
    router: React.PropTypes.any
  }

  state = {
    track: {},
    status: AsyncStatus.IDLE
  }

  componentDidMount () {
    this.props.getTrack(this.props.params.id)
  }

  componentWillReceiveProps(props) {
    if (props.track.status === AsyncStatus.SUCCESS) {
      this.setState({
        track: props.track.data,
        status: AsyncStatus.SUCCESS
      })
    }
  }

  render () {
    if (this.state.status !== AsyncStatus.SUCCESS) {
      return null
    }

    return (
      <TrackComponent
        track={this.state.track}
      />
    )
  }
}

const mapStateToProps = ({ track }) => ({
  track
})

export default connect(mapStateToProps, { getTrack })(Track)
