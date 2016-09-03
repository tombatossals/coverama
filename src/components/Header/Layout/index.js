import React from 'react'
import Logo from '../Logo'
import Search from '../Search'
import './styles.css'

const Layout = () => (
  <div className="header">
    <Logo className="logo">Music</Logo>
    <Search className="Search" />
  </div>
)

export default Layout
