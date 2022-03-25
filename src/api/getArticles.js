import rootUrlKata from './URL'

const getArticles = async (page = 1, token = null) => {
  const rootUrl = rootUrlKata
  const offset = page * 5 - 5
  const res = await fetch(`${rootUrl}articles?offset=${offset}&limit=${5}`, {
    method: 'GET',
    headers: {
      Authorization: `Token ${token}`,
    },
  })
  if (!res.ok) {
    throw new Error(`Could not fetch articles, received ${res.status}`)
  }
  return await res.json()
}

export default getArticles
