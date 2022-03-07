import { Pagination } from 'antd'

import Article from '../Article'

import classes from './ArticleList.module.scss'

const ArticleList = () => {
  return (
    <div className={classes.ArticleList}>
      <Article />
      <Article />
      <Article />
      <Pagination />
    </div>
  )
}

export default ArticleList
