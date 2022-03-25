import { useParams } from 'react-router-dom'

import ArticleCreate from './ArticleCreate'

const EditArticle = () => {
  const { slug } = useParams()
  return <ArticleCreate slug={slug} />
}

export default EditArticle
