import Header from '../Header'
import Content from '../Content'

import classes from './App.module.scss'

const App = () => {
  return (
    <div className={classes.App}>
      <Header />
      <Content />
    </div>
  )
}

export default App
