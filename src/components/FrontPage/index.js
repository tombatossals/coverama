import React from 'react'
import PlaylistItem from './PlaylistItem'
import './styles.css'

const FrontPage = ({ playlists }) => (
  <div className="frontpage">
    <h2>Playlists</h2>
    <div className="playlists">
    {playlists.ids.map(id =>
      <PlaylistItem key={playlists.entities[id].id} playlist={playlists.entities[id]} />
    )}
    </div>
  </div>
)

FrontPage.propTypes = {
  playlists: React.PropTypes.shape({
    ids: React.PropTypes.arrayOf(React.PropTypes.string).isRequired
  })
}

export default FrontPage
