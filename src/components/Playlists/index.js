import React from 'react'
import PlaylistItem from './PlaylistItem'
import './styles.css'

const Playlists = ({ playlists }) => (
  <div className="playlists">
    <ul>
    {playlists.map(playlist =>
      <PlaylistItem key={playlist.id} playlist={playlist} />
    )}
    </ul>
  </div>
)

Playlists.propTypes = {
  playlists: React.PropTypes.array.isRequired
}

export default Playlists
