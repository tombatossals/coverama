import React from 'react'
import TrackComponent from '../../components/Track'
import API from '../../lib/api'

export default class extends React.Component {
  static propTypes = {
    router: React.PropTypes.any
  }

  state = {
    item: {}
  }

  componentDidMount () {
    API.getTrack(this.props.params.id).then(track =>
      this.setState({
        item: track
      })
    )
  }

  render () {
    console.log(this.state.item)
    return (
      <TrackComponent
        data={this.state.item}
      />
    )
  }
}
