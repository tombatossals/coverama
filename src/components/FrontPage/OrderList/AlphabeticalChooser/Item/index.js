import React from 'react'
import './styles.css'

const Item = ({ letter, className, changeSortOrder }) => {
  const handleClick = () => changeSortOrder('name', letter)
  return (
    <li className={className} onClick={handleClick}>
      {letter}
    </li>
  )
}

Item.propTypes = {
  letter: React.PropTypes.string.isRequired,
  className: React.PropTypes.string,
  changeSortOrder: React.PropTypes.func.isRequired
}

export default Item
