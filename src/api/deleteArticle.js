import rootUrlKata from './URL'

const deleteArticle = async (slug, token) => {
  const rootUrl = rootUrlKata

  await fetch(`${rootUrl}articles/${slug}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: `Token ${token}`,
    },
  })
}

export default deleteArticle
