import React from 'react'
import Logo from '../Logo'
import { getUserPropTypes } from '../../../lib/proptypes'
import { UserStatus } from '../../../lib/constants'
import MenuItemLink from '../Menu/ItemLink'
import { Link } from 'react-router'

import Toolbar from 'material-ui/Toolbar'
import ToolbarGroup from 'material-ui/Toolbar/ToolbarGroup'
import FlatButton from 'material-ui/FlatButton'
import Popover from 'material-ui/Popover'
import Menu from 'material-ui/Menu'
import LogoutIcon from 'material-ui/svg-icons/action/power-settings-new'
import SettingsIcon from 'material-ui/svg-icons/action/settings'
import AccountBoxIcon from 'material-ui/svg-icons/action/account-box'
import AccountCircle from 'material-ui/svg-icons/action/account-circle'

import styles from './styles'

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
     <Toolbar style={styles.header}>
        <Link to="/"><Logo>Spotify Playlists</Logo></Link>
        <ToolbarGroup float="right" lastChild>
          {this.props.user.status === UserStatus.ANONYMOUS &&
            <Link to="/login">
              <FlatButton
                onClick={this.handleNavigateUserLogin}
                primary
                style={styles.button}
                label="Login"
              />
            </Link>
          }
          {this.props.user.status === UserStatus.AUTHENTICATED &&
            <div>
              <FlatButton
                style={styles.button}
                label="Your Profile"
                icon={<AccountCircle color="#222" />}
                onClick={this.handleTouchTap}
                primary />
              <Popover
                open={this.state.open}
                anchorEl={this.state.anchorEl}
                onRequestClose={this.handleRequestClose}
              >
                <Menu style={styles.menu}>
                  <MenuItemLink
                    primaryText="Your profile"
                    url="/user/profile"
                    leftIcon={<AccountBoxIcon />}
                    onClick={this.handleOnClick} />
                  <MenuItemLink
                    primaryText="Preferences"
                    url="/user/preferences"
                    leftIcon={<SettingsIcon />}
                    onClick={this.handleOnClick} />
                  <MenuItemLink
                    primaryText="Logout"
                    url="/logout"
                    leftIcon={<LogoutIcon />}
                    onClick={this.handleNavigateUserLogout} />
                </Menu>
              </Popover>
            </div>
          }
        </ToolbarGroup>
      </Toolbar>
    )
  }
}
