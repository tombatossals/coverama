import React from 'react'
import Logo from '../Logo'
import Search from '../Search'
import './styles.css'

const Layout = (props) => (
  <div className="header row">
    <Logo>{props.title}</Logo>
    <div className="col" />
    <Search />
  </div>
)

Layout.propTypes = {
  title: React.PropTypes.string.isRequired
}

export default Layout
