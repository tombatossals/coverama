import React from 'react'
import Track from './Track'
import './styles.css'

const PlayList = ({ playlist }) => (
  <div className="playlist">
    <ul>
    {playlist.tracks.map(track =>
      <Track key={track.id} track={track} />
    )}
    </ul>
  </div>
)

PlayList.propTypes = {
  playlist: React.PropTypes.object.isRequired
}

export default PlayList
