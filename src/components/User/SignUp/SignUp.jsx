import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { Alert } from 'antd'
import { useState } from 'react'

import classes from '../User.module.scss'
import { regExpEmail } from '../regularExpressions'
import postNewUser from '../../../api/postNewUser'

const SignUp = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
    watch,
  } = useForm()

  let [errorMessage, setErrorMessage] = useState(null)
  let [successMessage, setSuccessMessage] = useState(null)

  const navigate = useNavigate()
  const onSubmitRedirect = () => {
    navigate('/sign-in')
  }

  const onSubmit = (data) => {
    postNewUser(data)
      .then(() => {
        setErrorMessage(null)
        reset()
        setSuccessMessage(<Alert message="Registration was successful!" type="success" />)
        setTimeout(onSubmitRedirect, 2000)
      })
      .catch((error) => {
        setErrorMessage(<Alert message={error.message} type="error" />)
        setSuccessMessage(null)
        setTimeout(setErrorMessage, 5000, null)
      })
  }
  return (
    <section className={classes.User} onSubmit={handleSubmit(onSubmit)}>
      <form className={classes.User__form}>
        {errorMessage}
        {successMessage}
        <h1 className={classes.User__title}>Create new account</h1>
        <label className={classes['User__label-input']}>
          <span className={classes['User__caption-input']}>Username</span>
          <input
            className={[classes.User__input, errors?.username && classes['User__input--error']].join(' ')}
            tabIndex="1"
            placeholder="Username"
            {...register('username', {
              required: 'Thats feild is required',
              minLength: {
                value: 3,
                message: 'Your username needs to be at least 3 characters.',
              },
              maxLength: {
                value: 20,
                message: 'Your username must consist of no more than 20 characters.',
              },
            })}
          />
          {errors?.username && (
            <span
              className={[classes['User__caption-input'], errors?.username && classes['User__error-text']].join(' ')}
            >
              {errors?.username?.message || 'ERROR'}
            </span>
          )}
        </label>
        <label className={classes['User__label-input']}>
          <span className={classes['User__caption-input']}>Email address</span>
          <input
            className={classes.User__input}
            tabIndex="2"
            placeholder="Email address"
            {...register('email', {
              required: 'Thats feild is required',
              validate: (val) => regExpEmail.test(val) || 'Email address will be correct',
            })}
          />
          {errors?.email && (
            <span className={[classes['User__caption-input'], errors?.email && classes['User__error-text']].join(' ')}>
              {errors?.email?.message || 'ERROR'}
            </span>
          )}
        </label>
        <label className={classes['User__label-input']}>
          <span className={classes['User__caption-input']}>Password</span>
          <input
            className={classes.User__input}
            tabIndex="3"
            type="password"
            placeholder="Password"
            {...register('password', {
              required: 'Thats feild is required',
              minLength: {
                value: 6,
                message: 'Your password needs to be at least 6 characters.',
              },
              maxLength: {
                value: 40,
                message: 'Your password must consist of no more than 40 characters.',
              },
            })}
          />
          {errors?.password && (
            <span
              className={[classes['User__caption-input'], errors?.password && classes['User__error-text']].join(' ')}
            >
              {errors?.password?.message || 'ERROR'}
            </span>
          )}
        </label>
        <label className={classes['User__label-input']}>
          <span className={classes['User__caption-input']}>Repeat Password</span>
          <input
            className={classes.User__input}
            tabIndex="4"
            type="password"
            placeholder="Password"
            {...register('repeatPassword', {
              required: 'Thats feild is required',
              validate: (value) => value === watch('password') || 'Passwords must match',
            })}
          />
          {errors?.repeatPassword && (
            <span
              className={[classes['User__caption-input'], errors?.repeatPassword && classes['User__error-text']].join(
                ' '
              )}
            >
              {errors?.repeatPassword?.message || 'ERROR'}
            </span>
          )}
        </label>
        <label>
          <div className={classes.User__agreement}>
            <input
              className={classes['User__agreement-checkbox']}
              tabIndex="5"
              type="checkbox"
              defaultChecked
              {...register('agree', {
                required: 'You will be agree with that',
              })}
            />
            <span className={classes['User__agreement-span']}>
              I agree to the processing of my personal information
            </span>
          </div>
          {errors?.agree && (
            <span className={[classes['User__caption-input'], errors?.agree && classes['User__error-text']].join(' ')}>
              {errors?.agree?.message || 'ERROR'}
            </span>
          )}
        </label>
        <button className={classes.User__submit} tabIndex="6" type="submit">
          Create
        </button>
        <span className={classes.User__redirection}>
          Already have an account?
          <Link to="/sign-in"> Sign In</Link>.
        </span>
      </form>
    </section>
  )
}

export default SignUp
