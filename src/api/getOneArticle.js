import rootUrlKata from './URL'

const getOneArticle = async (slug, token = null) => {
  const rootUrl = rootUrlKata
  const res = await fetch(`${rootUrl}articles/${slug}`, {
    method: 'GET',
    headers: {
      Authorization: `Token ${token}`,
    },
  })
  if (!res.ok) {
    throw new Error(`Could not fetch article, received ${res.status}`)
  }
  return await res.json()
}

export default getOneArticle
