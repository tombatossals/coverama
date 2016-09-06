import React from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { withRouter } from 'react-router'

class Layout extends React.Component {
  static propTypes = {
    children: React.PropTypes.node
  }

  render () {
    return (
      <div>
        <Header title="Coverama" />
        {this.props.children}
        <Footer />
      </div>
    )
  }
}

export default withRouter(Layout)
