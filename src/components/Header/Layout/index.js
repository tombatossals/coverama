import React from 'react'
import Logo from '../Logo'
import Search from '../Search'
import './styles.css'

const Layout = (props) => (
  <div className="row header">
    <Logo className="col">{props.title}</Logo>
    <div className="col" />
    <Search className="col" />
  </div>
)

Layout.propTypes = {
  title: React.PropTypes.string.isRequired
}

export default Layout
