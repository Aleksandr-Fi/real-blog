import { combineReducers } from 'redux'

import setArticles from './reducers/setArticles'

const reducer = combineReducers({
  setArticles,
})

export default reducer
