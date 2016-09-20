import React from 'react'
import { Link } from 'react-router'
import './styles.css'
import MediaQuery from 'react-responsive'

const MenuList = ({ section }) => (
  <div className="topmenu__menulist">
    <MediaQuery minWidth={768}>
      <li className={section === 'playlists' ? 'active first' : 'first'}><Link to="/playlists">Playlists</Link></li>
      <li className={section === 'artists' ? 'active' : ''}><Link to="/artists">Artists</Link></li>
      <li className={section === 'albums' ? 'active' : ''}><Link to="/albums">Albums</Link></li>
    </MediaQuery>
    <MediaQuery maxWidth={767}>
      <div className="flex-left">
        <li className={section === 'playlists' ? 'unit active first' : 'unit first'}><Link to="/playlists">Playlists</Link></li>
        <li className={section === 'artists' ? 'unit active' : 'unit'}><Link to="/artists">Artists</Link></li>
        <li className={section === 'albums' ? 'unit active' : 'unit'}><Link to="/albums">Albums</Link></li>
      </div>
    </MediaQuery>
  </div>
)

MenuList.propTypes = {
  section: React.PropTypes.string.isRequired
}

export default MenuList
