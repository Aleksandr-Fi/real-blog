import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { Alert } from 'antd'
import { connect } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import postNewArticle from '../../api/postNewArticle'
import puEditArticle from '../../api/puEditArticle'

import classes from './ArticleCreate.module.scss'

const ArticleCreate = ({ userData, articlesData }) => {
  const { slug } = useParams()
  const article = slug && articlesData ? articlesData.filter((article) => article.slug === slug)[0] : null

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm()

  let [errorMessage, setErrorMessage] = useState(null)
  let [successMessage, setSuccessMessage] = useState(null)

  let [tagList, setTagList] = useState([])
  let [newTagError, setNewTagError] = useState(null)
  let [newTag, setNewTag] = useState('')

  const addTag = () => {
    const repeatedTag = tagList.filter((tag) => tag === newTag)
    if (!newTag) {
      setNewTagError('Thats feild is required')
    } else if (repeatedTag.length) {
      setNewTagError('The tag should not be repeated')
    }
    if (newTag && !repeatedTag.length) {
      const newTagList = tagList
      newTagList.push(newTag)
      setTagList(newTagList)
      setNewTagError(null)
      setNewTag('')
    }
  }

  const deleteNewTag = () => {
    setNewTag('')
  }

  const deleteTag = (tag) => {
    let newTagList = tagList
    const idx = newTagList.findIndex((el) => el === tag)
    newTagList = [...newTagList.slice(0, idx), ...newTagList.slice(idx + 1)]
    setTagList(newTagList)
  }

  const navigate = useNavigate()
  const onSubmitRedirect = () => {
    navigate('/')
  }

  const onSubmit = (data) => {
    addTag()
    setNewTagError(null)
    const newData = data
    if (tagList) {
      newData.tagList = tagList
    }
    const submitFunction = slug ? puEditArticle : postNewArticle
    submitFunction(newData, userData.token, slug)
      .then(() => {
        setErrorMessage(null)
        setSuccessMessage(
          <Alert
            message={slug ? 'The article was successfully edited!' : 'The article was successfully created!'}
            type="success"
          />
        )
        setTimeout(onSubmitRedirect, 2000, null)
      })
      .catch((error) => {
        setErrorMessage(<Alert message={error.message} type="error" />)
        setSuccessMessage(null)
        setTimeout(setErrorMessage, 5000, null)
      })
  }
  return (
    <section className={classes.Article} onSubmit={handleSubmit(onSubmit)}>
      <form className={classes.Article__form}>
        {errorMessage}
        {successMessage}
        <h1 className={classes.Article__legend}>{slug ? 'Edit article' : 'Create new article'}</h1>
        <label className={classes['Article__label-input']}>
          <span className={classes['Article__caption-input']}>Title</span>
          <input
            className={[classes.Article__input, errors?.title && classes['Article__input--red']].join(' ')}
            tabIndex="1"
            placeholder="Title"
            defaultValue={article?.title || ''}
            {...register('title', {
              required: 'Thats feild is required',
            })}
          />
          {errors?.title && (
            <span className={[classes['Article__caption-input'], classes['Article__caption-input--red']].join(' ')}>
              {errors?.title?.message || 'ERROR'}
            </span>
          )}
        </label>
        <label className={classes['Article__label-input']}>
          <span className={classes['Article__caption-input']}>Short description</span>
          <input
            className={[classes.Article__input, errors?.description && classes['Article__input--red']].join(' ')}
            tabIndex="1"
            placeholder="Description"
            defaultValue={article?.description || ''}
            {...register('description', {
              required: 'Thats feild is required',
            })}
          />
          {errors?.description && (
            <span className={[classes['Article__caption-input'], classes['Article__caption-input--red']].join(' ')}>
              {errors?.description?.message || 'ERROR'}
            </span>
          )}
        </label>
        <label className={classes['Article__label-input']}>
          <span className={classes['Article__caption-input']}>Text</span>
          <textarea
            className={[
              classes.Article__input,
              classes['Article__textarea'],
              errors?.body && classes['Article__textarea--red'],
            ].join(' ')}
            tabIndex="1"
            placeholder="Text"
            defaultValue={article?.body || ''}
            {...register('body', {
              required: 'Thats feild is required',
            })}
          />
          {errors?.body && (
            <span className={[classes['Article__caption-input'], classes['Article__caption-input--red']].join(' ')}>
              {errors?.body?.message || 'ERROR'}
            </span>
          )}
        </label>
        <div className={classes['Article__tag-list']}>
          <span className={classes['Article__caption-input']}>Tags</span>
          {tagList.length
            ? tagList.map((tag) => {
                // const key = tagId++
                const onDelete = () => deleteTag(tag)
                return (
                  <div key={tag} className={classes['Article__tag-wrapper']}>
                    <label className={[classes['Article__label-input'], classes['Article__tag-label']].join(' ')}>
                      <input
                        className={[classes.Article__input, classes['Article__new-tag-input']].join(' ')}
                        tabIndex="1"
                        placeholder="Title"
                        onChange={(e) => setNewTag(e.target.value)}
                        defaultValue={tag}
                      />
                    </label>
                    <button
                      className={[classes['Article__tag-btn'], classes['Article__tag-btn--red']].join(' ')}
                      tabIndex="3"
                      type="button"
                      onClick={onDelete}
                    >
                      Delete
                    </button>
                  </div>
                )
              })
            : null}
          <div className={classes['Article__tag-wrapper']}>
            <label className={[classes['Article__label-input'], classes['Article__tag-label']].join(' ')}>
              <input
                className={[
                  classes.Article__input,
                  classes['Article__new-tag-input'],
                  newTagError && classes['Article__input--red'],
                ].join(' ')}
                tabIndex="1"
                placeholder="Title"
                onChange={(e) => setNewTag(e.target.value)}
                value={newTag}
              />
              {newTagError && (
                <span className={[classes['Article__caption-input'], classes['Article__caption-input--red']].join(' ')}>
                  {newTagError}
                </span>
              )}
            </label>
            <button
              className={[classes['Article__tag-btn'], classes['Article__tag-btn--red']].join(' ')}
              tabIndex="3"
              type="button"
              onClick={deleteNewTag}
            >
              Delete
            </button>
            <button
              className={[classes['Article__tag-btn'], classes['Article__tag-btn--blue']].join(' ')}
              tabIndex="2"
              type="button"
              onClick={addTag}
            >
              Add tag
            </button>
          </div>
        </div>
        <button className={classes.Article__submit} tabIndex="6" type="submit">
          Send
        </button>
      </form>
    </section>
  )
}

const mapStateToProps = (state) => ({
  userData: state.userData,
  articlesData: state.articlesData.articles,
})

export default connect(mapStateToProps)(ArticleCreate)
