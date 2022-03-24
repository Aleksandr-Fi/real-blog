import rootUrlKata from './URL'

const getOneArticle = async (slug) => {
  const rootUrl = rootUrlKata
  const res = await fetch(`${rootUrl}articles/${slug}`)
  if (!res.ok) {
    throw new Error(`Could not fetch article, recived ${res.status}`)
  }
  return await res.json()
}

export default getOneArticle
