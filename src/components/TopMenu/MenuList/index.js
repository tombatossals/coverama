import React from 'react'
import { Link } from 'react-router'
import './styles.css'
import MediaQuery from 'react-responsive'

const MenuList = ({ section }) => (
  <div>
    <MediaQuery minWidth={768} component='ul' className='topmenu__menulist'>
      <li className={
        section === 'playlists'
        ? 'topmenu__menulist__item topmenu__menulist__item--active topmenu__menulist__item--first'
        : 'topmenu__menulist__item topmenu__menulist__item--first'}>
        <Link to='/playlists'>Playlists</Link>
      </li>
      <li className={
        section === 'artists'
        ? 'topmenu__menulist__item topmenu__menulist__item--active'
        : 'topmenu__menulist__item'}>
        <Link to='/artists'>Artists</Link>
      </li>
      <li className={
        section === 'albums'
        ? 'topmenu__menulist__item topmenu__menulist__item--active'
        : 'topmenu__menulist__item'}>
        <Link to='/albums'>Albums</Link>
      </li>
    </MediaQuery>
    <MediaQuery maxWidth={767} component='ul' className='topmenu__menulist flex-left'>
      <li className={
        section === 'playlists'
        ? 'unit topmenu__menulist__item topmenu__menulist__item--active topmenu__menulist__item--first'
        : 'unit topmenu__menulist__item topmenu__menulist__item--first'}>
        <Link to='/playlists'>Playlists</Link>
      </li>
      <li className={
        section === 'artists'
        ? 'unit topmenu__menulist__item topmenu__menulist__item--active'
        : 'topmenu__menulist__item unit'}>
        <Link to='/artists'>Artists</Link>
      </li>
      <li className={
        section === 'albums'
        ? 'unit topmenu__menulist__item topmenu__menulist__item--active topmenu__menulist__item--last'
        : 'unit topmenu__menulist__item'}>
        <Link to='/albums'>Albums</Link>
      </li>
    </MediaQuery>
  </div>
)

MenuList.propTypes = {
  section: React.PropTypes.string.isRequired
}

export default MenuList
