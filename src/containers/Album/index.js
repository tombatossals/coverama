import React from 'react'
import AlbumComponent from '../../components/Album'
import { getArtist, getTracksByAlbumId } from '../../actions'
import { connect } from 'react-redux'
import { AsyncStatus } from '../../lib/constants'

class Album extends React.Component {
  static propTypes = {
    albums: React.PropTypes.object.isRequired,
    artist: React.PropTypes.object.isRequired,
    tracks: React.PropTypes.object.isRequired,
    getTracksByAlbumId: React.PropTypes.func.isRequired
  }

  state = {
    album: undefined
  }

  componentDidMount () {
    if (this.props.artist.status !== AsyncStatus.SUCCESS ||
        this.props.artist.id !== this.props.params.artistId) {
      this.props.getArtist(this.props.params.artistId)
    }

    if (this.props.albums.status !== AsyncStatus.SUCCESS) {
      this.props.getTracksByAlbumId(this.props.params.albumId)
    }

    this.updateState(this.props)
  }

  componentWillReceiveProps(props) {
    this.updateState(props)
  }

  updateState(props) {
    if (props.albums.status === AsyncStatus.SUCCESS) {
      console.log('ye', props.albums.data.find(p => p.id === props.params.albumId))
      this.setState({
        album: props.albums.data.find(p => p.id === props.params.albumId)
      })
    }
  }

  render () {
    if (!this.state.album) {
      return null
    }

    console.log('hola')
    return (
      <AlbumComponent
        album={this.state.album}
        artist={this.props.artist.data}
        tracks={this.props.tracks.data}
      />
    )
  }
}

const mapStateToProps = ({ albums, artist, tracks }) => ({
  albums,
  artist,
  tracks
})

export default connect(mapStateToProps, { getTracksByAlbumId, getArtist })(Album)
