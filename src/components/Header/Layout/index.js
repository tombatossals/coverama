import React from 'react'
import Logo from '../Logo'
import { getUserPropTypes } from '../../../lib/proptypes'
import { UserStatus } from '../../../lib/constants'
import MenuItemLink from '../Menu/ItemLink'

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
    user: getUserPropTypes(),
    onNavigationChange: React.PropTypes.func
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

  handleOnClick = (url) => {
    this.setState({
      open: false
    })
    this.props.onNavigationChange(url)
  }

  handleNavigateHome = () => {
    this.handleOnClick('/home')
  }

  handleNavigateUserLogin = () => {
    this.handleOnClick('/login')
  }

  handleNavigateUserLogout = () => {
    this.handleOnClick('/logout')
  }

  render () {
    return (
     <Toolbar style={styles.header}>
        <Logo text="React Dashboard" onClick={this.handleNavigateHome} />
        <ToolbarGroup float="right" lastChild>
          {this.props.user.status === UserStatus.ANONYMOUS &&
            <FlatButton
              onClick={this.handleNavigateUserLogin}
              primary
              label="Login"
            />
          }
          {this.props.user.status === UserStatus.AUTHENTICATED &&
            <div>
              <FlatButton
                label="Your Profile"
                icon={<AccountCircle color="#222" />}
                onClick={this.handleTouchTap}
                primary />
              <Popover
                open={this.state.open}
                anchorEl={this.state.anchorEl}
                onRequestClose={this.handleRequestClose}
              >
                <Menu>
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
