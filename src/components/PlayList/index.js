import React from 'react'
import Track from './Track'
import './styles.css'

const PlayList = ({ playlist }) => (
  <div className="playlist">
  {playlist.tracks.items.map(item =>
    <Track key={item.track.id} track={item.track} playlistId={playlist.id} />
  )}
  </div>
)

PlayList.propTypes = {
  playlist: React.PropTypes.object.isRequired
}

export default PlayList
