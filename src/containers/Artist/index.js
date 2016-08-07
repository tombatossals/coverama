import React from 'react'
import ArtistComponent from '../../components/Artist'
import { getArtist } from '../../actions'
import { connect } from 'react-redux'
import { AsyncStatus } from '../../lib/constants'

class Artist extends React.Component {
  static propTypes = {
    getArtist: React.PropTypes.func.isRequired,
    artist: React.PropTypes.object.isRequired
  }

  componentDidMount () {
    this.props.getArtist(this.props.params.artistId)
  }

  render () {
    if (this.props.artist.status !== AsyncStatus.SUCCESS) {
      return null
    }

    return <ArtistComponent artist={this.props.artist.data} />
  }
}

const mapStateToProps = ({ artist }) => ({
  artist
})

export default connect(mapStateToProps, { getArtist })(Artist)
