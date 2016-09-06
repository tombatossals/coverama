import React from 'react'
import TopMenuComponent from '../../components/TopMenu'
import { withRouter } from 'react-router'

class FrontPage extends React.Component {
  state = {
    section: 'playlists',
    sort: 'added',
    letter: ''
  }

  componentDidMount () {
    this.updateState(this.props)
  }

  componentWillReceiveProps (props) {
    this.updateState(props)
  }

  changeSortOrder = (method, letter) => {
    const url = `${this.props.location.pathname}?sort=${method}`
    this.props.router.push(letter ? `${url}&letter=${letter}` : url)
  }

  updateState = (props) => {
    if (!props.location) return;
    const section = props.location.pathname.substring(1, props.location.pathname.length)
    const sort = props.location.query && props.location.query.sort ? props.location.query.sort : 'added'
    const letter = props.location.query && props.location.query.letter ? props.location.query.letter : ''

    this.setState({
      section,
      sort,
      letter
    })
  }

  render () {
    return <TopMenuComponent
      section={this.state.section}
      sort={this.state.sort}
      letter={this.state.letter}
      changeSortOrder={this.changeSortOrder}
    />
  }
}

export default withRouter(FrontPage)
