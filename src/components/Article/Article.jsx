import { useParams, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Spin } from 'antd'
import { HeartOutlined } from '@ant-design/icons'
import { format } from 'date-fns'
import ReactMarkdown from 'react-markdown'

import classes from './Article.module.scss'

const Article = ({ data }) => {
  const { slug } = useParams()
  const article = data ? data.filter((article) => article.slug === slug)[0] : null
  let tagKey = 1
  return article ? (
    <div key={article.slug} className={classes.Article}>
      <div className={classes.Article__content}>
        <div className={classes['Article__title-wrapper']}>
          <Link to={`/articles/${article.slug}`} className={classes.Article__title}>
            {article.title}
          </Link>
          <button className={classes['Article__title-btn']}>
            <HeartOutlined style={{ fontSize: 16, padding: 4 }} className={classes.Article__heart} />
            <span className={classes.Article__favoritesCount}>{article.favoritesCount}</span>
          </button>
        </div>
        <div className={classes.Article__tags}>
          {article.tagList
            ? article.tagList.map((tag) => (
                <button key={`${article.slug}-${tagKey++}`} className={classes['Article__tags-btn']}>
                  {tag}
                </button>
              ))
            : null}
        </div>
        <div className={classes.Article__slug}>{article.slug}</div>
      </div>
      <div className={classes.Article__info}>
        <h1 className={classes['Article__author-name']}>{article.author.username}</h1>
        <label className={classes.Article__data}>{format(new Date(article.createdAt), 'MMMM d, yyyy')}</label>
        <img className={classes.Article__avatar} src={article.author.image} alt="avatar" />
      </div>
      <ReactMarkdown className={classes.Article__body}>{article.body}</ReactMarkdown>
    </div>
  ) : (
    <Spin />
  )
}

const mapStateToProps = (state) => ({
  data: state.articlesData.articles,
})

export default connect(mapStateToProps)(Article)
