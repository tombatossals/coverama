import React from 'react'
import { Link } from 'react-router'
import './styles.css'

const MenuList = ({ section }) => (
  <ul className="menulist">
    <li className={section === 'playlists' ? 'active' : ''}><Link to="/playlists">Playlists</Link></li>
    <li className={section === 'artists' ? 'active' : ''}><Link to="/artists">Artists</Link></li>
    <li className={section === 'albums' ? 'active' : ''}><Link to="/albums">Albums</Link></li>
  </ul>
)

MenuList.propTypes = {
  section: React.PropTypes.string.isRequired
}

export default MenuList
