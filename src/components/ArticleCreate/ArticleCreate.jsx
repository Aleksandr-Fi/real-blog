import { useForm } from 'react-hook-form'
import { useState, useEffect } from 'react'
import { Alert } from 'antd'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import postNewArticle from '../../api/postNewArticle'
import puEditArticle from '../../api/puEditArticle'
import getOneArticle from '../../api/getOneArticle'

import classes from './ArticleCreate.module.scss'

const ArticleCreate = ({ userData, slug }) => {
  let [tagList, setTagList] = useState([''])

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ defaultValues: { title: '', description: '', body: '' } })

  useEffect(() => {
    if (slug) {
      getOneArticle(slug).then((res) => {
        const newDefaultValues = {
          title: res.article.title,
          description: res.article.description,
          body: res.article.body,
        }
        setTagList(res.article.tagList)
        reset(newDefaultValues)
      })
    }
    console.log('mount')
  }, [])
  useEffect(() => {
    console.log('update')
  })

  let [errorMessage, setErrorMessage] = useState(null)
  let [successMessage, setSuccessMessage] = useState(null)

  const addTag = () => {
    const newTagList = [...tagList, '']
    setTagList(newTagList)
  }

  const deleteTag = (index) => {
    let newTagList = [...tagList.slice(0, index), ...tagList.slice(index + 1)]
    setTagList(newTagList)
  }

  const changeTag = (index, event) => {
    const newTagList = [...tagList.slice(0, index), event.target.value, ...tagList.slice(index + 1)]
    setTagList(newTagList)
  }

  const cleanTagList = () => {
    const newSet = new Set()
    tagList.forEach((el) => newSet.add(el))
    const newTagList = Array.from(newSet.values()).filter((el) => el)
    setTagList(newTagList)
    return newTagList
  }

  let variableKey = 1
  const keys = () => (variableKey += 1)

  const navigate = useNavigate()
  const onSubmitRedirect = () => {
    navigate('/')
  }

  const onSubmit = (data) => {
    const newData = data
    const newTagList = cleanTagList()
    if (newTagList) {
      newData.tagList = newTagList
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
            ? tagList.map((tag, index) => {
                const addBtn =
                  tagList.length - 1 === index ? (
                    <button
                      className={[classes['Article__tag-btn'], classes['Article__tag-btn--blue']].join(' ')}
                      tabIndex="2"
                      type="button"
                      onClick={addTag}
                    >
                      Add tag
                    </button>
                  ) : null
                return (
                  <div key={keys()} className={classes['Article__tag-wrapper']}>
                    <label className={[classes['Article__label-input'], classes['Article__tag-label']].join(' ')}>
                      <input
                        className={[classes.Article__input, classes['Article__new-tag-input']].join(' ')}
                        tabIndex="1"
                        placeholder="Tag"
                        onChange={(e) => changeTag(index, e)}
                        value={tag}
                        name={tag}
                      />
                    </label>
                    <button
                      className={[classes['Article__tag-btn'], classes['Article__tag-btn--red']].join(' ')}
                      tabIndex="3"
                      type="button"
                      onClick={() => deleteTag(index)}
                    >
                      Delete
                    </button>
                    {addBtn}
                  </div>
                )
              })
            : null}
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
})

export default connect(mapStateToProps)(ArticleCreate)
