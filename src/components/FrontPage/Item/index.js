import React from 'react'
import { Link } from 'react-router'
import './styles.css'

const Item = ({ item }) => {
  const style = { height: item.image_height }
  return (
    <div className="Item" style={style}>
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
