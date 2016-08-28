import React from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Player from '../../containers/Player'
import { withRouter } from 'react-router'

class Layout extends React.Component {
  static propTypes = {
    children: React.PropTypes.node
  }

  render () {
    return (
      <div className="layout">
        <Header />
        <Player />
        {this.props.children}
        <Footer />
      </div>
    )
  }
}

export default withRouter(Layout)
