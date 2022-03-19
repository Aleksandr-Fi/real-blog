import { Link } from 'react-router-dom'

import classes from './Header.module.scss'

const Header = () => {
  return (
    <header className={classes.Header}>
      <button className={[classes.Header__btn, classes['btn-logo']].join(' ')}>
        <Link className={classes.Header__btn} to="/">
          Realworld Blog
        </Link>
      </button>
      <button className={[classes.Header__btn, classes['btn-singIn']].join(' ')}>
        <Link className={classes.Header__btn} to="/sign-in">
          Sign In
        </Link>
      </button>
      <button className={[classes.Header__btn, classes['btn-singUp']].join(' ')}>
        <Link className={classes.Header__btn} to="/sign-up">
          Sign Up
        </Link>
      </button>
    </header>
  )
}

export default Header
