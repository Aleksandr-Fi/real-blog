import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { Alert } from 'antd'
import { connect } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import postNewArticle from '../../api/postNewArticle'

import classes from './ArticleCreate.module.scss'

const ArticleCreate = ({ userData }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm()

  let [errorMessage, setErrorMessage] = useState(null)
  let [successMessage, setSuccessMessage] = useState(null)

  const navigate = useNavigate()
  const onSubmitRedirect = () => {
    navigate('/')
  }
  const onSubmit = (data) => {
    postNewArticle(data, userData.token)
      .then((res) => {
        console.log(res)
        setErrorMessage(null)
        setSuccessMessage(<Alert message="The article was successfully created!" type="success" />)
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
        <h1 className={classes.Article__legend}>Create new article</h1>
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
