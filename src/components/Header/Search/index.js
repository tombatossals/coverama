import React from 'react'
import './styles.css'
import API from '../../../lib/api'
import DebouncedInput from './DebouncedInput'
import ResultBox from './ResultBox'

class Search extends React.Component {
  state = {
    loading: false,
    data: []
  }

  searchByKey = (key) => {
    this.setState({
      loading: true
    })

    return API.searchByKey(key).then(data => {
      this.setState({
        loading: false,
        data: data
      })
    })
  }

  handleBlur = () => {
    this.setState({
      loading: false,
      data: []
    })
  }

  render () {
    return (
      <form className="form Search" onBlur={this.handleBlur}>
        <DebouncedInput onChange={this.searchByKey} placeholder="Search..." />
        <ResultBox data={this.state.data} visible={this.state.data.length > 0} />
      </form>
    )
  }
}

export default Search
