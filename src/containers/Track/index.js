import React from 'react'
import TrackComponent from '../../components/Track'
import { getPlaylistBySlug, getArtistBySlug, getTracksByAlbumSlug } from '../../actions'
import { connect } from 'react-redux'
import { AsyncStatus } from '../../lib/constants'
import Loading from '../../components/Loading'

class Track extends React.Component {
  static propTypes = {
    getPlaylistBySlug: React.PropTypes.func.isRequired,
    getArtistBySlug: React.PropTypes.func.isRequired,
    getTracksByAlbumSlug: React.PropTypes.func.isRequired,
    tracks: React.PropTypes.object.isRequired,
    albums: React.PropTypes.object,
    playlists: React.PropTypes.object,
    artists: React.PropTypes.object
  }

  componentDidMount () {
    this.fetchDataIfNeeded(this.props)
  }

  componentWillReceiveProps (props) {
    this.fetchDataIfNeeded(props)
  }

  findBySlug(data, slug) {
    for (const id of data.ids) {
      if (data.entities[id].slug === slug) {
        return data.entities[id]
      }
    }
  }

  fetchDataIfNeeded = (props) => {
    if (props.params.playlistSlug) {
      if (props.playlists.status === AsyncStatus.IDLE) {
        props.getPlaylistBySlug(props.params.playlistSlug)
      }

      if (props.tracks.status === AsyncStatus.IDLE) {
        return props.getPlaylistBySlug(props.params.playlistSlug)
      }

      if (props.tracks.status === AsyncStatus.SUCCESS &&
          props.tracks.playlistSlug !== props.params.playlistSlug) {
        props.getPlaylistBySlug(props.params.playlistSlug)
      }
    }

    if (props.params.artistSlug) {
      if (props.artists.status === AsyncStatus.IDLE) {
        props.getPlaylistBySlug(props.params.playlistSlug)
      }

      if (props.tracks.status === AsyncStatus.IDLE) {
        return props.getPlaylistBySlug(props.params.playlistSlug)
      }

      if (props.tracks.status === AsyncStatus.SUCCESS &&
          props.tracks.playlistSlug !== props.params.playlistSlug) {
        props.getPlaylistBySlug(props.params.playlistSlug)
      }
    }

  }

  render () {
    if (this.props.tracks.status !== AsyncStatus.SUCCESS) {
      return <Loading type="spin" width={96} height={96} />
    }

    const track = this.findBySlug(this.props.tracks, this.props.params.trackSlug)
    return (
      <TrackComponent
        track={track}
      />
    )
  }
}

const mapStateToProps = ({ tracks, playlists, albums, artists }) => ({
  tracks,
  playlists,
  albums,
  artists
})

export default connect(mapStateToProps, { getPlaylistBySlug, getArtistBySlug, getTracksByAlbumSlug })(Track)
