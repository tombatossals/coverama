import React from 'react'
import Header from '../../components/Header'
import Breadcrumb from '../../containers/Breadcrumb'
import { withRouter } from 'react-router'
import './styles.css'

class Layout extends React.Component {
  static propTypes = {
    children: React.PropTypes.node,
    router: React.PropTypes.object.isRequired
  }

  render () {
    return (
      <div className="layout">
        <Header />
        <Breadcrumb params={this.props.params} />
        {this.props.children}
      </div>
    )
  }
}

export default withRouter(Layout)
