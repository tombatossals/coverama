import React from 'react'
import Logo from '../Logo'
import Search from '../Search'
import './styles.css'

const Layout = () => (
  <div className="header">
    <div className="top">
      <Logo className="logo">Music</Logo>
      <Search className="Search" />
    </div>
  </div>
)

export default Layout
