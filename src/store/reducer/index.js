import { combineReducers } from 'redux'

import pageData from './reducers/pageData'
import userData from './reducers/userData'

const reducer = combineReducers({
  pageData,
  userData,
})

export default reducer
