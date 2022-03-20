import { useParams } from 'react-router-dom'
import { connect } from 'react-redux'
import { Spin } from 'antd'

import classes from '../User.module.scss'

const Profile = ({ data }) => {
  const { slug } = useParams()
  const article = data ? data.filter((article) => article.slug === slug)[0] : null
  return article ? <div className={classes.Article}></div> : <Spin />
}

const mapStateToProps = (state) => ({
  data: state.articlesData.articles,
})

export default connect(mapStateToProps)(Profile)
