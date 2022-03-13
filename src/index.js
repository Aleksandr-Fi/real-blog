import React from 'react'
import ReactDOM from 'react-dom'

import 'antd/dist/antd.css'
import 'normalize.css'
import App from './components/App'
import getArticles from './api'

// getArticles()
// console.log(getArticles())
getArticles().then((res) => console.log(res))

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)
