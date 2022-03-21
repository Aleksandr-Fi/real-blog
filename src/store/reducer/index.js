import { combineReducers } from 'redux'

import articlesData from './reducers/articlesData'
import userData from './reducers/userData'

const reducer = combineReducers({
  articlesData,
  userData,
})

export default reducer
