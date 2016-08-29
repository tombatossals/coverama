import React from 'react'
import './styles.css'
import AlphabeticalChooser from './AlphabeticalChooser'

const OrderList = ({ sort, letter, changeSortOrder }) => {
  const handleAlphaSorterClick = () => changeSortOrder('name')
  const handleLatestSorterClick = () => changeSortOrder('added')
  return (
    <div className="orderlist">
      {sort === 'name'
      ? <AlphabeticalChooser letter={letter} changeSortOrder={changeSortOrder} />
      : null }
      <ul className="selectorlist">
        <li className={sort === 'name' ? 'active' : ''} onClick={handleAlphaSorterClick}>Alphabetical</li>
        <li className={sort === 'latest' ? 'active' : ''} onClick={handleLatestSorterClick}>Latest Added</li>
      </ul>
    </div>
  )
}

OrderList.propTypes = {
  sort: React.PropTypes.string.isRequired,
  letter: React.PropTypes.string.isRequired,
  changeSortOrder: React.PropTypes.func.isRequired
}

export default OrderList