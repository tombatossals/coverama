import React from 'react'
import MenuList from '../MenuList'
import OrderList from '../OrderList'
import './styles.css'

const TopMenu = ({ section, sort, letter, changeSortOrder }) => (
  <div className="topmenu">
    <MenuList section={section} />
    <OrderList changeSortOrder={changeSortOrder} sort={sort} letter={letter} />
  </div>
)

TopMenu.propTypes = {
  section: React.PropTypes.string.isRequired,
  sort: React.PropTypes.string.isRequired,
  letter: React.PropTypes.string.isRequired,
  changeSortOrder: React.PropTypes.func.isRequired
}

export default TopMenu
