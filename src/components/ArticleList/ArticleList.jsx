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
              <img className={classes.ArticleList__avatar} src={article.author.image} alt="avatar" />
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
