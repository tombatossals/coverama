import React from 'react'
import AlbumComponent from '../../components/Album'
import { getArtistBySlug, getAlbumBySlug } from '../../actions'
import { connect } from 'react-redux'
import { AsyncStatus } from '../../lib/constants'
import Loading from '../../components/Loading'

class Album extends React.Component {
  static propTypes = {
    album: React.PropTypes.object.isRequired,
    artist: React.PropTypes.object.isRequired,
    getAlbumBySlug: React.PropTypes.func.isRequired,
    getArtistBySlug: React.PropTypes.func.isRequired
  }

  componentDidMount () {
    this.fetchDataIfNeeded(this.props)
  }

  componentWillReceiveProps (props) {
    this.fetchDataIfNeeded(props)
  }

  fetchDataIfNeeded = (props) => {
    if (props.artist.status === AsyncStatus.IDLE) {
      props.getArtistBySlug(props.params.artistSlug)
    }

    if (props.album.status === AsyncStatus.IDLE) {
      props.getAlbumBySlug(props.params.albumSlug, props.params.artistSlug)
    }

    if (props.artist.status === AsyncStatus.SUCCESS &&
        props.artist.data.slug !== props.params.artistSlug) {
      props.getArtistBySlug(props.params.artistSlug)
    }

    if (props.album.status === AsyncStatus.SUCCESS &&
        props.album.data.slug !== props.params.albumSlug) {
      props.getAlbumBySlug(props.params.albumSlug, props.params.artistSlug)
    }
  }

  render () {
    if (this.props.artist.status !== AsyncStatus.SUCCESS ||
        this.props.album.status !== AsyncStatus.SUCCESS) {
      return <Loading type="spin" width={96} height={96} />
    }

    return (
      <AlbumComponent
        album={this.props.album.data}
        artist={this.props.artist.data}
      />
    )
  }
}

const mapStateToProps = ({ album, artist }) => ({
  album,
  artist
})

export default connect(mapStateToProps, { getAlbumBySlug, getArtistBySlug })(Album)
