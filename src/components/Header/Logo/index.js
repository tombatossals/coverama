import React from 'react'
import './styles.css'
import logo from './logo.svg'
import { Link } from 'react-router'

const Logo = ({ children }) => (
  <div className="col">
    <div className="header__logo">
      <Link to="/">
        <img className="header__logo__image" src={logo} role="presentation" />
      </Link>
      <h1 className="header__logo__title">
        <Link className="header__logo__title__link" to="/">{ children }</Link>
      </h1>
    </div>
  </div>
)

Logo.propTypes = {
  children: React.PropTypes.string.isRequired
}

export default Logo
