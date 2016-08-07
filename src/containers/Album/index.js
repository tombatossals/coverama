import React from 'react'
import AlbumComponent from '../../components/Album'
import { getAlbum, getArtist } from '../../actions'
import { connect } from 'react-redux'
import { AsyncStatus } from '../../lib/constants'

class Album extends React.Component {
  static propTypes = {
    router: React.PropTypes.any
  }

  componentDidMount () {
    this.props.getAlbum(this.props.params.albumId)

    if (this.props.artist.status !== AsyncStatus.SUCCESS) {
      this.props.getArtist(this.props.params.artistId)
    }
  }

  render () {
    if (this.props.album.status !== AsyncStatus.SUCCESS || this.props.artist.status !== AsyncStatus.SUCCESS) {
      return null
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

export default connect(mapStateToProps, { getAlbum, getArtist })(Album)
