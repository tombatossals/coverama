import React from 'react'
import Logo from '../Logo'
import Search from '../Search'
import MenuList from '../MenuList'
import './styles.css'

const Layout = ({ section }) => (
  <div className="header">
    <div className="top">
      <Logo className="logo">Music</Logo>
      <Search className="Search"></Search>
    </div>
    <MenuList section={section} />
  </div>
)

Layout.propTypes = {
  section: React.PropTypes.string.isRequired
}

export default Layout
