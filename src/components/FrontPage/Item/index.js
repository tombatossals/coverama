import React from 'react'
import { Link } from 'react-router'
import './styles.css'
import play from './play.48.png'
import spotify from './spotify.20.png'

const Item = ({ item }) => {
  const style = { height: item.image_height }
  return (
    <li className="item" style={style}>
      <Link to={item.url}>
        <img className="cover" src={item.image_url} alt={item.name} />
        <div className="info">{item.name}</div>
        <div className="footer">
          <img src={spotify} role="presentation" />
        </div>
        <div className="hover">
          <img src={play} role="presentation" />
        </div>
      </Link>
    </li>
  )
}

Item.propTypes = {
  item: React.PropTypes.object
}

export default Item
