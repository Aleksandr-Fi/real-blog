import rootUrlKata from './URL'

const setInfoFavorite = async (slug, token, method = 'POST') => {
  const rootUrl = rootUrlKata
  const res = await fetch(`${rootUrl}articles/${slug}/favorite`, {
    method: method,
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: `Token ${token}`,
    },
  })
  if (!res.ok) {
    throw new Error('Oops, something went wrong.')
  }
  const body = await res.json()
  return await body
}

export default setInfoFavorite
