import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import classes from '../User.module.scss'

const SignUp = () => {
  return (
    <section className={classes.User}>
      <form className={classes.User__form}>
        <h1 className={classes.User__title}>Create new account</h1>
        <label className={classes['User__label-input']}>
          <span className={classes['User__caption-input']}>Username</span>
          <input className={classes.User__input} tabIndex="1" defaultValue="Username" />
        </label>
        <label className={classes['User__label-input']}>
          <span className={classes['User__caption-input']}>Email address</span>
          <input className={classes.User__input} tabIndex="2" defaultValue="Email address" />
        </label>
        <label className={classes['User__label-input']}>
          <span className={classes['User__caption-input']}>Password</span>
          <input className={classes.User__input} tabIndex="3" defaultValue="Password" />
        </label>
        <label className={classes['User__label-input']}>
          <span className={classes['User__caption-input']}>Repeat Password</span>
          <input className={classes.User__input} tabIndex="4" defaultValue="Password" />
        </label>
        <label className={classes.User__agreement}>
          <input className={classes['User__agreement-checkbox']} tabIndex="5" type="checkbox" defaultChecked />
          <span className={classes['User__agreement-span']}>I agree to the processing of my personal information</span>
        </label>
        <label className={classes['User__label-submit']}>
          <input className={classes.User__submit} tabIndex="6" type="submit" value={'submit'} />
        </label>
        <span className={classes.User__redirection}>
          Already have an account?
          <Link to="/sign-in"> Sign In</Link>.
        </span>
      </form>
    </section>
  )
}

const mapStateToProps = (state) => ({
  data: state.articlesData.articles,
})

export default connect(mapStateToProps)(SignUp)
