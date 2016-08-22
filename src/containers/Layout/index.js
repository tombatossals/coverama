import React from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import Breadcrumb from '../../containers/Breadcrumb'

class Layout extends React.Component {
  static propTypes = {
    children: React.PropTypes.node
  }

  state = {
    section: 'playlists'
  }

  componentDidMount() {
    this.updateSate(this.props)
  }

  componentWillReceiveProps(props) {
    this.updateSate(props)
  }

  updateSate = (props) => {
    const section = props.location.pathname.substring(1, props.location.pathname.length)
    if (section !== this.state.section) {
      this.setState({ section })
    }
  }

  render () {
    return (
      <div className="layout">
        <Header section={this.state.section} />
        <Breadcrumb params={this.props.params} />
        {this.props.children}
        <Footer />
      </div>
    )
  }
}

export default Layout
