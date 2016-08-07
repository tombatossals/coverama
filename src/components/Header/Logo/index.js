import React from 'react'
import './styles.css'

const Logo = ({ children }) => (
  <h1 className="logo">
    <span>{ children }</span>
  </h1>
)

Logo.propTypes = {
  children: React.PropTypes.string.isRequired
}

export default Logo
