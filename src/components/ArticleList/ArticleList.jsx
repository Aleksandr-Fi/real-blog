import { Pagination, Spin } from 'antd'
import { HeartOutlined } from '@ant-design/icons'
import { connect } from 'react-redux'
import { format } from 'date-fns'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'

import getArticlesData from '../../api/getArticles'

import classes from './ArticleList.module.scss'

const ArticleList = ({ data, getArticlesData }) => {
  const articles = data.articles
  let tagKey = 1
  return articles ? (
    <div className={classes.ArticleList}>
      {articles.map((article) => {
        return (
          <div key={article.slug} className={classes.ArticleList__article}>
            <div className={classes.ArticleList__content}>
              <div className={classes['ArticleList__title-wrapper']}>
                <Link to={`/articles/${article.slug}`} className={classes.ArticleList__title}>
                  {article.title}
                </Link>
                <button className={classes['ArticleList__title-btn']}>
                  <HeartOutlined style={{ fontSize: 16, padding: 4 }} className={classes.ArticleList__heart} />
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
              <div className={classes.ArticleList__slug}>{article.slug}</div>
            </div>
            <div className={classes.ArticleList__info}>
              <h1 className={classes['ArticleList__author-name']}>{article.author.username}</h1>
              <label className={classes.ArticleList__data}>{format(new Date(article.createdAt), 'MMMM d, yyyy')}</label>
              <img
                className={classes.ArticleList__avatar}
                src="data:image/png;base64,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"
                alt="avatar"
              />
            </div>
          </div>
        )
      })}
      <Pagination
        onChange={(page) => getArticlesData(page)}
        defaultCurrent={1}
        total={data.articlesCount}
        showSizeChanger={false}
        defaultPageSize={5}
      />
    </div>
  ) : (
    <Spin />
  )
}

const mapStateToProps = (state) => ({
  data: state.articlesData,
})

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ getArticlesData }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleList)
