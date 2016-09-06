import React from 'react'
import './styles.css'
import logo from './logo.svg'
import { Link } from 'react-router'

const Logo = ({ children }) => (
  <div className="Logo">
    <h1>
      <Link className="Image" to="/"><img src={logo} role="presentation" /></Link>
      <Link to="/">{ children }</Link>
    </h1>
  </div>
)

Logo.propTypes = {
  children: React.PropTypes.string.isRequired
}

export default Logo
