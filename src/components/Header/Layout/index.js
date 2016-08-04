import React from 'react'
import Logo from '../Logo'
import { getUserPropTypes } from '../../../lib/proptypes'
import { Link } from 'react-router'
import './styles.css'

export default class HeaderToolbar extends React.Component {
  static propTypes = {
    user: getUserPropTypes()
  }

  state = {
    open: false
  }

  handleTouchTap = (event) => {
    this.setState({
      open: true,
      anchorEl: event.currentTarget
    })
  }

  handleRequestClose = () => {
    this.setState({
      open: false
    })
  }

  render () {
    return (
      <div className="header">
        <Link to="/"><Logo>Spotify Playlists</Logo></Link>
      </div>
    )
  }
}
