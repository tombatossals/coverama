import React from 'react'
import './styles.css'
import { Link } from 'react-router'

export default class ResultBox extends React.Component {
  static propTypes = {
    data: React.PropTypes.array.isRequired,
    visible: React.PropTypes.bool.isRequired
  }

  render () {
    return (
      <div className={'ResultBox ' + (this.props.visible ? 'visible' : 'hidden')}>
        <ul>
          {this.props.data.map(item => (
            <li key={item.id}><Link to={item.url}>{item.name}</Link></li>
          ))}
        </ul>
      </div>
    )
  }
}
