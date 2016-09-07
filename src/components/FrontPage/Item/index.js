import React from 'react'
import { Link } from 'react-router'
import './styles.css'

const Item = ({ item }) => {
  const style = { height: item.image_height }
  return (
    <li className="item" style={style}>
      <Link to={item.url}>
        <img className="cover" src={item.image_url} alt={item.name} />
        <div className="info">{item.name}</div>
      </Link>
    </li>
  )
}

Item.propTypes = {
  item: React.PropTypes.object
}

export default Item
