import React from 'react'
import FrontPageComponent from '../../components/FrontPage'
import { getPlaylists, getAlbums, getArtists } from '../../actions'
import { connect } from 'react-redux'
import { AsyncStatus } from '../../lib/constants'
import { withRouter } from 'react-router'
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
    section: 'playlists',
    sort: 'added',
    letter: '',
    ready: false
  }

  componentDidMount () {
    this.updateState(this.props)
  }

  componentWillReceiveProps (props) {
    this.updateState(props)
  }

  changedView = (section, sort, letter) => {
    return section !== this.state.section ||
           sort !== this.state.sort ||
           letter !== this.state.letter
  }

  changeSortOrder = (method, letter) => {
    const url = `${this.props.location.pathname}?sort=${method}`
    this.props.router.push(letter ? `${url}&letter=${letter}` : url)
  }

  updateState = (props) => {
    const section = props.location.pathname.substring(1, props.location.pathname.length)
    const sort = props.location.query && props.location.query.sort ? props.location.query.sort : 'added'
    const letter = props.location.query && props.location.query.letter ? props.location.query.letter : ''

    if (this.changedView(section, sort, letter) ||
        props[section].status === AsyncStatus.IDLE) {

      this.setState({
        ready: false,
        section,
        sort,
        letter
      })

      switch (section) {
        case 'playlists':
          return this.props.getPlaylists(sort, letter)
        case 'artists':
          return this.props.getArtists(sort, letter)
        case 'albums':
          return this.props.getAlbums(sort, letter)
        default:
          break
      }
    }

    if (props[section].status === AsyncStatus.SUCCESS) {
      return this.setState({
        items: props[section].data,
        ready: true
      })
    }
  }

  render () {
    if (!this.state.ready) {
      return <Loading type="spin" width={96} height={96} />
    }

    return (
      <FrontPageComponent
        items={this.state.items}
        section={this.state.section}
        sort={this.state.sort}
        letter={this.state.letter}
        changeSortOrder={this.changeSortOrder}
      />)
  }
}

const mapStateToProps = ({ playlists, albums, artists }) => ({
  playlists,
  albums,
  artists
})

export default withRouter(connect(mapStateToProps, { getPlaylists, getAlbums, getArtists })(FrontPage))
