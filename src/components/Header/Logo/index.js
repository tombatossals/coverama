import React from 'react'
import './styles.css'
import logo from './logo.svg'

const Logo = ({ children }) => (
  <h1 className="logo">
    <img src={logo} className="App-logo" alt="logo" />
    <span>{ children }</span>
  </h1>
)

Logo.propTypes = {
  children: React.PropTypes.string.isRequired
}

export default Logo
