import React from 'react'
import './styles.css'

const Track = (props) => (
  <div>
    <h1>Track</h1>
    {props.data.name}
  </div>
)

Track.propTypes = {
  data: React.PropTypes.object
}

export default Track
