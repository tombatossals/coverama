import React from 'react'
import searchImg from './search.svg'
import './style.css'

export default class DebouncedInput extends React.Component {
  static propTypes = {
    onChange: React.PropTypes.func.isRequired,
    value: React.PropTypes.string
  }

  state = {
    tid: void 0,
    value: this.props.value || ''
  }

  shouldComponentUpdate (nextProps, nextState) {
    const keys = Object.keys(nextProps)
    const { value } = this.state

    if (value !== nextState.value || keys.length !== Object.keys(this.props).length) {
      return true
    }

    const changed = keys.some(key => nextProps[key] !== this.props[key])
    return changed
  }

  handleFocus = () => {
    if (this.state.value) {
      this.props.onChange(this.state.value)
    }
  }

  componentWillUnmount () {
    const { tid } = this.state
    window.clearTimeout(tid)
  }

  changeTerm = (event) => {
    const { value } = event.target
    const { tid } = this.state

    if (tid) {
      clearTimeout(tid)
    }

    this.setState({
      value,
      tid: setTimeout(this.emitChange.bind(this), 300)
    })
  }

  emitChange () {
    const { value } = this.state
    const { onChange } = this.props

    this.setState({ tid: void 0 })

    onChange(value)
  }

  render () {
    return (
      <div className="InputSearch">
        <img src={searchImg} role="presentation" />
        <input
          type="text"
          {...this.props}
          value={this.state.value}
          onChange={this.changeTerm}
          placeholder={this.props.placeholder}
          onFocus={this.handleFocus} />
      </div>
    )
  }
}
