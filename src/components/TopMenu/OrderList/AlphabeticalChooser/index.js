import React from 'react'
import Item from './Item'
import './styles.css'

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

const AlphabeticalChooser = ({ letter, changeSortOrder }) => (
  <ul className="topmenu__alphabeticalchooser">
    {alphabet.map(l => (
      <Item
        key={l}
        className={l === letter ? 'active' : null}
        changeSortOrder={changeSortOrder}
        letter={l}
      />
    ))}
  </ul>
)

AlphabeticalChooser.propTypes = {
  letter: React.PropTypes.string,
  changeSortOrder: React.PropTypes.func.isRequired
}

AlphabeticalChooser.defaultProps = {
  letter: 'A'
}

export default AlphabeticalChooser
