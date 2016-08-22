import React from 'react'
import ArtistComponent from '../../components/Artist'
import { getArtistBySlug } from '../../actions'
import { connect } from 'react-redux'
import { AsyncStatus } from '../../lib/constants'
import Loading from '../../components/Loading'

class Artist extends React.Component {
  static propTypes = {
    getArtistBySlug: React.PropTypes.func.isRequired,
    artist: React.PropTypes.object.isRequired,
  }

  componentDidMount () {
    this.fetchDataIfNeeded(this.props)
  }

  componentWillReceiveProps (props) {
    this.fetchDataIfNeeded(props)
  }

  fetchDataIfNeeded = (props) => {
    if (props.artist.status === AsyncStatus.IDLE) {
      return props.getArtistBySlug(props.params.artistSlug)
    }

    if (props.artist.status === AsyncStatus.SUCCESS &&
        props.artist.data.slug !== props.params.artistSlug) {
      return props.getArtistBySlug(props.params.artistSlug)
    }
  }

  render () {
    if (this.props.artist.status !== AsyncStatus.SUCCESS) {
      return <Loading type="spin" width={96} height={96} />
    }
    return <ArtistComponent artist={this.props.artist.data} />
  }
}

const mapStateToProps = ({ artist }) => ({
  artist
})

export default connect(mapStateToProps, { getArtistBySlug })(Artist)
