import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from '../reducers'
import { apiMiddleware } from 'redux-api-middleware'

const configureStore = preloadedState => {
  const store = createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(apiMiddleware)
  )
  return store
}

export default configureStore