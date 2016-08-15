import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from '../reducers'
import thunk from 'redux-thunk'
// import createLogger from 'redux-logger'

export default () => {
  const middlewares = [thunk]

  // eslint-disable-next-line
  if (process.env.NODE_ENV !== 'production') {
    // middlewares.push(createLogger())
  }

  return createStore(
    rootReducer, compose(
      applyMiddleware(...middlewares),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
  )
}
