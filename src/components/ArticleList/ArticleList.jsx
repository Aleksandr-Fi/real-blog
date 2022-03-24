import { Pagination, Spin } from 'antd'
import { HeartOutlined, HeartFilled } from '@ant-design/icons'
import { connect } from 'react-redux'
import { format } from 'date-fns'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

import getArticles from '../../api/getArticles'
import * as actions from '../../store/actions'

import classes from './ArticleList.module.scss'

const ArticleList = ({ pageData, userData, changePage }) => {
  let [articlesData, setArticlesData] = useState(null)

  useEffect(() => {
    getArticles(pageData, userData.token).then((res) => {
      setArticlesData(res)
      console.log(userData)
    })
  }, [])

  const onChangePage = (page) => {
    getArticles(page, userData.token).then((res) => {
      setArticlesData(res)
      changePage(page)
    })
  }

  const articles = articlesData?.articles
  let tagKey = 1
  return articles ? (
    <div className={classes.ArticleList}>
      {articles.map((article) => {
        const heart = article.favorited ? (
          <HeartFilled style={{ fontSize: 16, padding: 4, color: '#FF0707' }} className={classes.ArticleList__heart} />
        ) : (
          <HeartOutlined style={{ fontSize: 16, padding: 4 }} className={classes.ArticleList__heart} />
        )

        return (
          <div key={article.slug} className={classes.ArticleList__article}>
            <div className={classes.ArticleList__content}>
              <div className={classes['ArticleList__title-wrapper']}>
                <Link to={`/articles/${article.slug}`} className={classes.ArticleList__title}>
                  {article.title}
                </Link>
                <button className={classes['ArticleList__title-btn']}>
                  {heart}
                  <span className={classes.ArticleList__favoritesCount}>{article.favoritesCount}</span>
                </button>
              </div>
              <div className={classes.ArticleList__tags}>
                {article.tagList
                  ? article.tagList.map((tag) => (
                      <button key={`${article.slug}-${tagKey++}`} className={classes['ArticleList__tags-btn']}>
                        {tag}
                      </button>
                    ))
                  : null}
              </div>
              <div className={classes.ArticleList__description}>{article.description}</div>
            </div>
            <div className={classes.ArticleList__info}>
              <h1 className={classes['ArticleList__author-name']}>{article.author.username}</h1>
              <label className={classes.ArticleList__data}>{format(new Date(article.createdAt), 'MMMM d, yyyy')}</label>
              <img className={classes.ArticleList__avatar} src={article.author.image} alt="avatar" />
            </div>
          </div>
        )
      })}
      <Pagination
        onChange={(page) => onChangePage(page)}
        defaultCurrent={pageData}
        total={articlesData.articlesCount}
        showSizeChanger={false}
        defaultPageSize={5}
      />
    </div>
  ) : (
    <div className={classes.ArticleList}>
      <Spin />
    </div>
  )
}

const mapStateToProps = (state) => ({
  pageData: state.pageData.page,
  userData: state.userData,
})

export default connect(mapStateToProps, actions)(ArticleList)
