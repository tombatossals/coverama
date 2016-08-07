import React from 'react'
import PlayListItem from './PlayListItem'
import './styles.css'

const PlayLists = ({ playlists }) => (
  <div className="playlists">
    <ul>
    {playlists.map(playlist =>
      <PlayListItem key={playlist.id} playlist={playlist} />
    )}
    </ul>
  </div>
)

PlayLists.propTypes = {
  playlists: React.PropTypes.array.isRequired
}

export default PlayLists
