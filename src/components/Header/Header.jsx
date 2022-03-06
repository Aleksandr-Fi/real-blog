import classes from './Header.module.scss'

const Header = () => {
  return (
    <header className={classes.Header}>
      <button className={[classes.Header__btn, classes['btn-logo']].join(' ')}>Realworld Blog</button>
      <button className={[classes.Header__btn, classes['btn-singIn']].join(' ')}>Sign In</button>
      <button className={[classes.Header__btn, classes['btn-singUp']].join(' ')}>Sign Up</button>
    </header>
  )
}

export default Header
