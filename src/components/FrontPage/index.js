import React from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import Item from './Item'
import './styles.css'

const getItemColumn = (items, columns, number) =>
  items.filter((item, index) => index % columns === number)

const getColumns = (items, columns, section) => (
  <ReactCSSTransitionGroup
    className="Columns"
    transitionName="Frontpage"
    transitionAppear
    transitionAppearTimeout={500}
    transitionEnterTimeout={500}
    transitionLeaveTimeout={300}>
    {console.log("hola") || Array(columns).fill().map((empty, index) =>
      <div key={index} className="Column">
      {getItemColumn(items, columns, index).map(item =>
        <Item key={item.id} item={item} />
      )}
      </div>
    )}
  </ReactCSSTransitionGroup>
)

const FrontPage = ({ items, section, sort, letter, changeSortOrder }) => (
  <div className={'Frontpage ' + section}>
    { section === 'artists'
    ? getColumns(items, 3, section)
    : getColumns(items, 6, section) }
  </div>
)

FrontPage.propTypes = {
  items: React.PropTypes.array.isRequired,
  section: React.PropTypes.string.isRequired,
  sort: React.PropTypes.string.isRequired,
  letter: React.PropTypes.string,
  changeSortOrder: React.PropTypes.func.isRequired
}

export default FrontPage
