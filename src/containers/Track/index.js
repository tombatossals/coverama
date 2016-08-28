import React from 'react'
import TrackComponent from '../../components/Track'
import { getPlaylistBySlug, getAlbumBySlug, getArtistBySlug, getTrackBySlug, setTracks } from '../../actions'
import { connect } from 'react-redux'
import { AsyncStatus } from '../../lib/constants'
import Loading from '../../components/Loading'

class Track extends React.Component {
  static propTypes = {
    getPlaylistBySlug: React.PropTypes.func.isRequired,
    getAlbumBySlug: React.PropTypes.func.isRequired,
    getArtistBySlug: React.PropTypes.func.isRequired,
    getTrackBySlug: React.PropTypes.func.isRequired,
    track: React.PropTypes.object.isRequired,
    album: React.PropTypes.object,
    playlist: React.PropTypes.object,
    artist: React.PropTypes.object
  }

  componentDidMount () {
    this.fetchDataIfNeeded(this.props)
  }

  componentWillReceiveProps (props) {
    this.fetchDataIfNeeded(props)
  }

  fetchDataIfNeeded = (props) => {
    if (props.params.playlistSlug) {
      if (props.playlist.status === AsyncStatus.IDLE) {
        props.getPlaylistBySlug(props.params.playlistSlug)
      }

      if (props.playlist.status === AsyncStatus.SUCCESS &&
          props.playlist.data.slug !== props.params.playlistSlug) {
        props.getPlaylistBySlug(props.params.playlistSlug)
      }
    }

    if (props.params.albumSlug) {
      if (props.album.status === AsyncStatus.IDLE) {
        props.getAlbumBySlug(props.params.albumSlug, props.params.artistSlug)
      }

      if (props.album.status === AsyncStatus.SUCCESS &&
          props.album.data.slug !== props.params.albumSlug) {
        props.getAlbumBySlug(props.params.albumSlug, props.params.artistSlug)
      }
    }

    if (props.params.artistSlug) {
      if (props.artist.status === AsyncStatus.IDLE) {
        return props.getArtistBySlug(props.params.artistSlug)
      }

      if (props.artist.status === AsyncStatus.SUCCESS &&
          props.artist.data.slug !== props.params.artistSlug) {
        props.getArtistBySlug(props.params.artistSlug)
      }
    }

    if (props.track.status === AsyncStatus.IDLE) {
      return props.getTrackBySlug(props.params.trackSlug, props.params.albumSlug, props.params.artistSlug)
    }

    if (props.track.status === AsyncStatus.SUCCESS &&
        props.track.data.slug !== props.params.trackSlug) {
      return props.getTrackBySlug(props.params.trackSlug, props.params.albumSlug, props.params.artistSlug)
    }

  }

  render () {
    if (this.props.track.status !== AsyncStatus.SUCCESS ||
        this.props.artist.status !== AsyncStatus.SUCCESS) {
      return <Loading type="spin" width={96} height={96} />
    }

    return (
      <TrackComponent
        track={this.props.track.data}
        artist={this.props.artist.data}
        album={this.props.album.data}
      />
    )
  }
}

const mapStateToProps = ({ track, playlist, album, artist }) => ({
  track,
  playlist,
  album,
  artist
})

export default connect(mapStateToProps, { getPlaylistBySlug, getAlbumBySlug, getArtistBySlug, getTrackBySlug, setTracks })(Track)
