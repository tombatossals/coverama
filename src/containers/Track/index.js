import React from 'react'
import TrackComponent from '../../components/Track'
import { getTrack } from '../../actions'
import { connect } from 'react-redux'

class Track extends React.Component {
  static propTypes = {
    router: React.PropTypes.any
  }

  state = {
    track: {}
  }

  componentWillMount () {
    getTrack(this.props.params.id).then(track =>
      this.setState({
        track
      })
    )
  }

  render () {
    console.log(this.state.item)
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
