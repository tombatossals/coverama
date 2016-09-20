import React from 'react'
import Item from './Item'
import './styles.css'

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

const AlphabeticalChooser = ({ letter, changeSortOrder }) => (
  <ul className='topmenu__alphabeticalchooser flex-center'>
    {alphabet.map(l => (
      <Item
        key={l}
        className={l === letter ? 'topmenu__alphabeticalchooser__item topmenu__alphabeticalchooser__item--active' : 'topmenu__alphabeticalchooser__item'}
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
