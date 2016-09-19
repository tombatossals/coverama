import React from 'react'
import Logo from '../Logo'
import Search from '../Search'
import './styles.css'
import MediaQuery from 'react-responsive'

const Layout = (props) => (
  <div>
    <MediaQuery minWidth={768} className="header flex-left">
      <div className="unit">
        <Logo>{props.title}</Logo>
      </div>
      <div className="unit">
        <Search />
      </div>
    </MediaQuery>
    <MediaQuery maxWidth={767}>
      <div className="header">
        <Logo>{props.title}</Logo>
        <Search />
      </div>
    </MediaQuery>
  </div>
)

Layout.propTypes = {
  title: React.PropTypes.string.isRequired
}

export default Layout
