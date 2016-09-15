import React from 'react'
import { Link } from 'react-router'
import './styles.css'

const Item = ({ item }) => {
  return (
    <div className="Item">
      <Link to={item.url}>
        <img className="Cover" src={item.image_url} alt={item.name} />
        <div className="Info">{item.name}</div>
      </Link>
    </div>
  )
}

Item.propTypes = {
  item: React.PropTypes.object
}

export default Item
