import React from 'react'
import styles from './styles'
import Track from './Track'

const PlayList = (props) => (
  <div style={styles.box}>
    <ul>
    {props.data.map(item =>
      <Track onClick={props.onNavigationChange} data={item.track} />
    )}
    </ul>
  </div>
)

PlayList.propTypes = {
  data: React.PropTypes.array,
  onNavigationChange: React.PropTypes.func
}

export default PlayList
