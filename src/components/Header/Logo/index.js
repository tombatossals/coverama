import React from 'react'
import ToolbarTitle from 'material-ui/Toolbar/ToolbarTitle'
import styles from './styles'

const Logo = ({ children }) => (
  <ToolbarTitle
    text={children}
    style={styles.link}
  />
)

Logo.propTypes = {
  children: React.PropTypes.string.isRequired
}

export default Logo
