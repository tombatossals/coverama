import React from 'react'
import './styles.css'
import AlphabeticalChooser from './AlphabeticalChooser'
import MediaQuery from 'react-responsive'

const OrderList = ({ sort, letter, changeSortOrder }) => {
  const handleAlphaSorterClick = () => changeSortOrder('name')
  const handleLatestSorterClick = () => changeSortOrder('added')
  return (
    <div className="topmenu__orderlist">
      {sort === 'name2'
      ? <AlphabeticalChooser letter={letter} changeSortOrder={changeSortOrder} />
      : null }
      <MediaQuery minWidth={768}>
        <ul className="topmenu__selectorlist">
          <li className={sort === 'name' ? 'active' : ''} onClick={handleAlphaSorterClick}>Alphabetical</li>
          <li className={sort === 'added' ? 'active last' : 'last'} onClick={handleLatestSorterClick}>Latest Added</li>
        </ul>
      </MediaQuery>
      <MediaQuery maxWidth={767}>
        <ul className="topmenu__selectorlist flex-left">
          <li className={sort === 'name' ? 'unit active' : 'unit'} onClick={handleAlphaSorterClick}>Alphabetical</li>
          <li className={sort === 'added' ? 'unit active last' : 'unit last'} onClick={handleLatestSorterClick}>Latest Added</li>
        </ul>
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
