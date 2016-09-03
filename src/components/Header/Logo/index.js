import React from 'react'
import './styles.css'
import logo from './logo.svg'
import { Link } from 'react-router'

const Logo = ({ children }) => (
  <div className="logo">
    <Link className="image" to="/"><img src={logo} role="presentation" /></Link>
    <h1><Link to="/">{ children }</Link></h1>
  </div>
)

Logo.propTypes = {
  children: React.PropTypes.string.isRequired
}

export default Logo
