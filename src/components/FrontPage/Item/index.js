import React from 'react'
import { Link } from 'react-router'
import './styles.css'

const Item = ({ item }) => {
  return (
    <div className='masonry__item'>
      <Link to={item.url}>
        <img className='masonry__item__cover' src={item.image_url} alt={item.name} />
        <div className='masonry__item__folding'>
          <div className='masonry__item__info'>
            <div className='masonry__item__info__description'>{item.name}</div>
            <div className='masonry__item__info__extra'>50 songs</div>
          </div>
        </div>
      </Link>
    </div>
  )
}

Item.propTypes = {
  item: React.PropTypes.object
}

export default Item
