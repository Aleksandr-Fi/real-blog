import rootUrlKata from './URL'

const puEditArticle = async (data, token, slug) => {
  const rootUrl = rootUrlKata
  const bodyPost = {
    article: data,
  }
  const res = await fetch(`${rootUrl}articles/${slug}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify(bodyPost),
  })
  if (!res.ok) {
    throw new Error('Oops, something went wrong.')
  }
  return await res.json()
}

export default puEditArticle
