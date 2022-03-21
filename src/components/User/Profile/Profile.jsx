import { useForm } from 'react-hook-form'
import { connect } from 'react-redux'

import classes from '../User.module.scss'
import { regExpEmail, regExpUrl } from '../regularExpressions'

const Profile = ({ user }) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm()
  const onSubmit = (data) => console.log(data)
  return (
    <section className={classes.User} onSubmit={handleSubmit(onSubmit)}>
      <form className={classes.User__form}>
        <h1 className={classes.User__title}>Edit Profile</h1>
        <label className={classes['User__label-input']}>
          <span className={classes['User__caption-input']}>Username</span>
          <input
            className={[classes.User__input, errors?.username && classes['User__input--error']].join(' ')}
            tabIndex="1"
            placeholder="Username"
            defaultValue={user.username}
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
            defaultValue={user.email}
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
          <span className={classes['User__caption-input']}>New password</span>
          <input
            className={classes.User__input}
            tabIndex="3"
            type="password"
            placeholder="New password"
            {...register('password', {
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
          <span className={classes['User__caption-input']}>Avatar image (url)</span>
          <input
            className={classes.User__input}
            tabIndex="4"
            placeholder="Avatar image"
            {...register('image', {
              validate: (val) => {
                if (val) {
                  return regExpUrl.test(val) || 'Image address will be correct'
                }
              },
            })}
          />
          {errors?.image && (
            <span className={[classes['User__caption-input'], errors?.image && classes['User__error-text']].join(' ')}>
              {errors?.image?.message || 'ERROR'}
            </span>
          )}
        </label>
        <button className={classes.User__submit} tabIndex="6" type="submit">
          Save
        </button>
      </form>
    </section>
  )
}

const mapStateToProps = (state) => ({
  user: state.userData.user,
})

export default connect(mapStateToProps)(Profile)
