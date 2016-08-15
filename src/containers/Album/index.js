import React from 'react'
import AlbumComponent from '../../components/Album'
import { getArtistBySlug, getTracksByAlbumSlug } from '../../actions'
import { connect } from 'react-redux'
import { AsyncStatus } from '../../lib/constants'
import Loading from '../../components/Loading'

class Album extends React.Component {
  static propTypes = {
    albums: React.PropTypes.object.isRequired,
    artists: React.PropTypes.object.isRequired,
    tracks: React.PropTypes.object.isRequired,
    getTracksByAlbumSlug: React.PropTypes.func.isRequired,
    getArtistBySlug: React.PropTypes.func.isRequired
  }

  componentDidMount () {
    this.fetchDataIfNeeded(this.props)
  }

  componentWillReceiveProps (props) {
    this.fetchDataIfNeeded(props)
  }

  fetchDataIfNeeded = (props) => {
    if (props.artists.status === AsyncStatus.IDLE ||
        props.albums.status === AsyncStatus.IDLE) {
      props.getArtistBySlug(props.params.artistSlug)
    }

    if (props.tracks.status === AsyncStatus.IDLE) {
      return props.getTracksByAlbumSlug(props.params.albumSlug, props.params.artistSlug)
    }

    if (props.tracks.status === AsyncStatus.SUCCESS &&
        props.tracks.albumSlug !== props.params.albumSlug) {
      props.getTracksByAlbumSlug(props.params.albumSlug, props.params.artistSlug)
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
        this.props.albums.status !== AsyncStatus.SUCCESS ||
        this.props.tracks.status !== AsyncStatus.SUCCESS) {
      return <Loading type="spin" width={96} height={96} />
    }


    const artist = this.findBySlug(this.props.artists, this.props.params.artistSlug)
    const album = this.findBySlug(this.props.albums, this.props.params.albumSlug)

    const tracks = this.props.tracks.ids.map(trackId => this.props.tracks.entities[trackId])
    tracks.sort((a, b) => a.track_number - b.track_number)
    return (
      <AlbumComponent
        album={album}
        artist={artist}
        tracks={tracks}
      />
    )
  }
}

const mapStateToProps = ({ albums, artists, tracks }) => ({
  albums,
  artists,
  tracks
})

export default connect(mapStateToProps, { getTracksByAlbumSlug, getArtistBySlug })(Album)
