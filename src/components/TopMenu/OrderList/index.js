import React from 'react'
import './styles.css'
import AlphabeticalChooser from './AlphabeticalChooser'
import MediaQuery from 'react-responsive'

const OrderList = ({ sort, letter, changeSortOrder }) => {
  const handleAlphaSorterClick = () => changeSortOrder('name')
  const handleLatestSorterClick = () => changeSortOrder('added')
  return (
    <div>
      <MediaQuery minWidth={768} className='topmenu__orderlist topmenu__orderlist--borderdown flex-left'>
        {sort === 'name'
        ? (<div className='topmenu__orderlist__item topmenu__orderlist__item--first unit'>
          <AlphabeticalChooser letter={letter} changeSortOrder={changeSortOrder} />
        </div>)
        : <div className='unit' /> }
        <div className='flex-right unit-0'>
          <div className={
            sort === 'name'
            ? 'topmenu__orderlist__item topmenu__orderlist__item--active unit-0'
            : 'topmenu__orderlist__item unit'} onClick={handleAlphaSorterClick}>Alphabetical</div>
          <div className={
            sort === 'added'
            ? 'topmenu__orderlist__item topmenu__orderlist__item--active topmenu__orderlist__item--last unit-0'
            : 'topmenu__orderlist__item topmenu__orderlist__item--last unit'} onClick={handleLatestSorterClick}>Latest Added</div>
        </div>
      </MediaQuery>
      <MediaQuery maxWidth={767}>
        <ul className={
          sort === 'name'
          ? 'topmenu__orderlist flex-left'
          : 'topmenu__orderlist topmenu__orderlist--borderdown flex-left'}>
          <li className={
            sort === 'name'
            ? 'unit topmenu__orderlist__item topmenu__orderlist__item--active'
            : 'topmenu__orderlist__item topmenu__orderlist__item--first unit'} onClick={handleAlphaSorterClick}>Alphabetical</li>
          <li className={
            sort === 'added'
            ? 'unit topmenu__orderlist__item topmenu__orderlist__item--active topmenu__orderlist__item--last'
            : 'unit topmenu__orderlist__item'} onClick={handleLatestSorterClick}>Latest Added</li>
        </ul>
        {sort === 'name'
        ? (<div className={
          sort === 'name'
          ? 'topmenu__line topmenu__orderlist--borderdown'
          : 'topmenu__line'}>
          <AlphabeticalChooser letter={letter} changeSortOrder={changeSortOrder} />
        </div>)
        : null }
      </MediaQuery>
    </div>
  )
}

OrderList.propTypes = {
  sort: React.PropTypes.string.isRequired,
  letter: React.PropTypes.string.isRequired,
  changeSortOrder: React.PropTypes.func.isRequired
}

export default OrderList
