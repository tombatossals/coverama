import React from 'react'
import MenuItem from 'material-ui/MenuItem'
import { Link } from 'react-router'
import styles from './styles'

export default class MenuItemLink extends React.Component {
  static propTypes = {
    url: React.PropTypes.string.isRequired,
    primaryText: React.PropTypes.string.isRequired,
    leftIcon: React.PropTypes.element
  }

  render () {
    return (
      <Link to="/logout">
        <MenuItem style={styles.item}
          primaryText={this.props.primaryText}
          leftIcon={this.props.leftIcon}
        />
      </Link>
    )
  }
}
