import React from 'react'
import Item from './Item'
import './styles.css'

const getColumn = (items, columns, number) =>
  items.filter((item, index) => index % columns === number)

const FrontPage = ({ items }) => (
  <div className="frontpage">
    <div className="column">
    {getColumn(items, 3, 0).map(item =>
      <Item key={item.id} item={item} />
    )}
    </div>
    <div className="column">
    {getColumn(items, 3, 1).map(item =>
      <Item key={item.id} item={item} />
    )}
    </div>
    <div className="column">
    {getColumn(items, 3, 2).map(item =>
      <Item key={item.id} item={item} />
    )}
    </div>
  </div>
)

FrontPage.propTypes = {
  items: React.PropTypes.array.isRequired
}

export default FrontPage
