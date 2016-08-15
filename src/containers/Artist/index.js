import React from 'react'
import ArtistComponent from '../../components/Artist'
import { getArtistBySlug } from '../../actions'
import { connect } from 'react-redux'
import { AsyncStatus } from '../../lib/constants'
import Loading from '../../components/Loading'

class Artist extends React.Component {
  static propTypes = {
    getArtistBySlug: React.PropTypes.func.isRequired,
    artists: React.PropTypes.object.isRequired,
    albums: React.PropTypes.object.isRequired,
  }

  componentDidMount () {
    this.fetchDataIfNeeded(this.props)
  }

  componentWillReceiveProps (props) {
    this.fetchDataIfNeeded(props)
  }

  fetchDataIfNeeded = (props) => {
    if (props.artists.status === AsyncStatus.IDLE) {
      return props.getArtistBySlug(props.params.artistSlug)
    }

    if (props.albums.status === AsyncStatus.IDLE) {
      return props.getArtistBySlug(props.params.artistSlug)
    }

    if (props.albums.status === AsyncStatus.SUCCESS &&
        props.albums.artistSlug !== props.params.artistSlug) {
      return props.getArtistBySlug(props.params.artistSlug)
    }
  }

  findBySlug(data, slug) {
    for (const id of data.ids) {
      if (data.entities[id].slug === slug) {
        return data.entities[id]
      }
    }
  }

  render () {
    if (this.props.artists.status !== AsyncStatus.SUCCESS ||
        this.props.albums.status !== AsyncStatus.SUCCESS) {
      return <Loading type="spin" width={96} height={96} />
    }
    const artist = this.findBySlug(this.props.artists, this.props.params.artistSlug)
    return artist
      ? <ArtistComponent artist={artist} albums={this.props.albums} />
      : null
  }
}

const mapStateToProps = ({ artists, albums }) => ({
  artists,
  albums
})

export default connect(mapStateToProps, { getArtistBySlug })(Artist)
