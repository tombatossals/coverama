import React from 'react'
import ReactLoading from 'react-loading'
import './styles.css'

const Loading = ({ width, height, type, color, align }) => (
  <div className={`loading ${align}`}>
    <ReactLoading type={type} width={width} height={height} color={color} />
  </div>
)

Loading.propTypes = {
  width: React.PropTypes.number,
  height: React.PropTypes.number,
  type: React.PropTypes.string,
  color: React.PropTypes.string,
  align: React.PropTypes.string
}

Loading.defaultProps = {
  align: 'center'
}

export default Loading
