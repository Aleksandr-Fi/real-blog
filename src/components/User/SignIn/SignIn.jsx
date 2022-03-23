import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { Alert } from 'antd'
import { useState } from 'react'
import { connect } from 'react-redux'

import classes from '../User.module.scss'
import { regExpEmail } from '../regularExpressions'
import login from '../../../api/login'
import * as actions from '../../../store/actions'

const SignIn = ({ getUserData }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm()

  let [errorMessage, setErrorMessage] = useState(null)
  let [successMessage, setSuccessMessage] = useState(null)

  const navigate = useNavigate()
  const onSubmitRedirect = () => {
    navigate('/')
  }

  const onSubmit = (data) => {
    login(data)
      .then((res) => {
        getUserData(res.user)
        localStorage.setItem('user', JSON.stringify(res.user))
        setErrorMessage(null)
        reset()
        setSuccessMessage(<Alert message="Login was successful!" type="success" />)
        setTimeout(onSubmitRedirect, 1000)
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
        <h1 className={classes.User__title}>Sign In</h1>
        <label className={classes['User__label-input']}>
          <span className={classes['User__caption-input']}>Email address</span>
          <input
            className={[classes.User__input, errors?.email && classes['User__input--error']].join(' ')}
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
            className={[classes.User__input, errors?.password && classes['User__input--error']].join(' ')}
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
        <button className={classes.User__submit} tabIndex="6" type="submit">
          Login
        </button>
        <span className={classes.User__redirection}>
          Already have an account?
          <Link to="/sign-up"> Sign Up</Link>.
        </span>
      </form>
    </section>
  )
}

const mapStateToProps = (state) => ({
  data: state.userData,
})

export default connect(mapStateToProps, actions)(SignIn)
