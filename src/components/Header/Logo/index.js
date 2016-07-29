import React from 'react'
import ToolbarTitle from 'material-ui/Toolbar/ToolbarTitle'
import styles from './styles'

const Logo = (props) => (
  <ToolbarTitle
    text={props.text}
    onClick={props.onClick}
    style={styles.link}
  />
)

Logo.propTypes = {
  text: React.PropTypes.string.isRequired,
  onClick: React.PropTypes.func.isRequired
}

export default Logo
