import React from 'react'
import FrontPageComponent from '../../components/FrontPage'
import { getPlaylists, getAlbums, getArtists } from '../../actions'
import { connect } from 'react-redux'
import { AsyncStatus } from '../../lib/constants'
import Loading from '../../components/Loading'

class FrontPage extends React.Component {
  static propTypes = {
    getPlaylists: React.PropTypes.func.isRequired,
    getAlbums: React.PropTypes.func.isRequired,
    getArtists: React.PropTypes.func.isRequired,
    playlists: React.PropTypes.object.isRequired,
    albums: React.PropTypes.object.isRequired,
    artists: React.PropTypes.object.isRequired
  }

  state = {
    items: [],
    ready: false
  }

  componentDidMount () {
    this.updateState(this.props)
  }

  componentWillReceiveProps(props) {
    this.updateState(props)
  }

  updateState = (props) => {
    if (props.location.pathname === '/playlists') {
      if (props.playlists.status === AsyncStatus.IDLE) {
        this.setState({ ready: false })
        return this.props.getPlaylists()
      }

      if (props.playlists.status === AsyncStatus.SUCCESS) {
        return this.setState({
          items: props.playlists.data,
          ready: true
        })
      }
    }

    if (props.location.pathname === '/artists') {
      if (props.artists.status === AsyncStatus.IDLE) {
        this.setState({ ready: false })
        return this.props.getArtists()
      }

      if (props.artists.status === AsyncStatus.SUCCESS) {
        return this.setState({
          items: props.artists.data,
          ready: true
        })
      }
    }

    if (props.location.pathname === '/albums') {
      if (props.albums.status === AsyncStatus.IDLE) {
        this.setState({ ready: false })
        return this.props.getAlbums()
      }

      if (props.albums.status === AsyncStatus.SUCCESS) {
        return this.setState({
          items: props.albums.data,
          ready: true
        })
      }
    }
  }

  render () {
    if (!this.state.ready) {
      return <Loading type="spin" width={96} height={96} />
    }

    return <FrontPageComponent items={this.state.items} />
  }
}

const mapStateToProps = ({ playlists, albums, artists }) => ({
  playlists,
  albums,
  artists
})

export default connect(mapStateToProps, { getPlaylists, getAlbums, getArtists })(FrontPage)
