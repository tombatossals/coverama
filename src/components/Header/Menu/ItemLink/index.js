import React from 'react'
import MenuItem from 'material-ui/MenuItem'

export default class MenuItemLink extends React.Component {
  static propTypes = {
    url: React.PropTypes.string.isRequired,
    primaryText: React.PropTypes.string.isRequired,
    onClick: React.PropTypes.func.isRequired,
    leftIcon: React.PropTypes.element
  }

  handleOnClick = () => {
    this.props.onClick(this.props.url)
  }

  render () {
    return (
      <MenuItem
        primaryText={this.props.primaryText}
        onClick={this.handleOnClick}
        leftIcon={this.props.leftIcon}
      />
    )
  }
}
