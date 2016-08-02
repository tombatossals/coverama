import React from 'react'
import './styles.css'

const Track = (props) => {
  const boundClick = props.onClick.bind(this, props.data.id)
  return (
    <li className="track" key={props.data.id} onClick={boundClick}>
      {props.data.name}
    </li>
  )
}

Track.propTypes = {
  data: React.PropTypes.object,
  onClick: React.PropTypes.func
}

export default Track
