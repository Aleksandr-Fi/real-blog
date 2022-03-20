import { Routes, Route } from 'react-router-dom'
import { Spin } from 'antd'

import Header from '../Header'
import ArticleList from '../ArticleList'
import Article from '../Article'
import SignUp from '../User/SignUp'
import SignIn from '../User/SignIn'
import Profile from '../User/Profile'

import classes from './App.module.scss'

const App = () => {
  return (
    <div className={classes.App}>
      <Header />
      <div className={classes.App__content}>
        <Routes>
          <Route path="/" element={<ArticleList />} />
          <Route path="/articles" element={<ArticleList />} />
          <Route path="/articles/:slug" element={<Article />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<Spin />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
