import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'

import 'antd/dist/antd.css'
import 'normalize.css'
import './index.css'
import App from './components/App'
import reducer from './store/reducer'
import { getUserData } from './store/actions'

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose

const store = createStore(reducer, composeEnhancers(applyMiddleware(thunkMiddleware)))

const localData = JSON.parse(localStorage.getItem('user'))
if (localData) {
  store.dispatch(getUserData(localData))
}

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)
