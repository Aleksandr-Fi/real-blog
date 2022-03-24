import { useParams, Link, useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'
import { Spin } from 'antd'
import { HeartOutlined } from '@ant-design/icons'
import { format } from 'date-fns'
import ReactMarkdown from 'react-markdown'
import { useState } from 'react'

import deleteArticle from '../../api/deleteArtical'

import classes from './Article.module.scss'

const Article = ({ articlesData, userData }) => {
  const { slug } = useParams()
  const article = articlesData ? articlesData.filter((article) => article.slug === slug)[0] : null
  let tagKey = 1

  let [visibility, setVisibility] = useState(null)

  const navigate = useNavigate()
  const onSubmitRedirect = () => {
    navigate('/')
  }

  const onDelete = () => {
    console.log(onYesDelete, visibility, onNoDelete)
    const newVisibility = { ...visibility, delPop: true }
    setVisibility(newVisibility)
  }

  const onYesDelete = () => {
    deleteArticle(slug, userData.token).then(() => {
      setTimeout(onSubmitRedirect, 1000, null)
    })
  }

  const onNoDelete = () => {
    const newVisibility = { ...visibility, delPop: false }
    setVisibility(newVisibility)
  }
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
        <div className={classes.Article__description}>{article.description}</div>
      </div>
      <div className={classes.Article__info}>
        <h1 className={classes['Article__author-name']}>{article.author.username}</h1>
        <label className={classes.Article__e}>{format(new Date(article.createdAt), 'MMMM d, yyyy')}</label>
        <img className={classes.Article__avatar} src={article.author.image} alt="avatar" />
      </div>
      {article.author.username === userData.username ? (
        <div className={classes['Article__article-btns']}>
          <button
            className={[
              classes['Article__article-btn'],
              classes['Article__article-btn--red'],
              classes['Article__delete-btn'],
            ].join(' ')}
            onClick={onDelete}
          >
            <span>Delete</span>
          </button>
          <div
            className={[
              classes['Article__delete-popup'],
              visibility?.delPop && classes['Article__delete-popup--visible'],
            ].join(' ')}
          >
            <div className={classes['Article__delete-arrow']}></div>
            <div className={classes['Article__delete-confirmation']}>
              <div className={classes['Article__delete-warning']}>
                <div className={classes['Article__warning-circle']}>
                  <span>!</span>
                </div>
                <div className={classes['Article__warning-message']}>Are you sure to delete this article?</div>
              </div>
              <div className={classes['Article__warning-btns']}>
                <button
                  className={[classes['Article__warning-btn'], classes['Article__warning-btn--light']].join(' ')}
                  onClick={onNoDelete}
                >
                  No
                </button>
                <button
                  className={[classes['Article__warning-btn'], classes['Article__warning-btn--blue']].join(' ')}
                  onClick={onYesDelete}
                >
                  Yes
                </button>
              </div>
            </div>
          </div>
          <button className={[classes['Article__article-btn'], classes['Article__article-btn--green']].join(' ')}>
            <Link className={classes.Article__link} to={`/articles/${slug}/edit`}>
              Edit
            </Link>
          </button>
        </div>
      ) : null}
      <ReactMarkdown className={classes.Article__body}>{article.body}</ReactMarkdown>
    </div>
  ) : (
    <Spin />
  )
}

const mapStateToProps = (state) => ({
  articlesData: state.articlesData.articles,
  userData: state.userData,
})

export default connect(mapStateToProps)(Article)
