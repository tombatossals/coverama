import React from 'react'
import styles from './styles'
import Track from './Track'

const PlayList = ({ playlist }) => (
  <div style={styles.box}>
    <ul>
    {playlist.tracks.map(track =>
      <Track key={track.id} data={track} />
    )}
    </ul>
  </div>
)

PlayList.propTypes = {
  playlist: React.PropTypes.array
}

export default PlayList
