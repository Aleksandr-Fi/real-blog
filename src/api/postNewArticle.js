import rootUrlKata from './URL'

const postNewArticle = async (data, token) => {
  const rootUrl = rootUrlKata
  const bodyPost = {
    article: data,
  }

  const res = await fetch(`${rootUrl}articles`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify(bodyPost),
  })
  if (res.status === 500) {
    throw new Error('Internal Server Error.')
  }
  if (!res.ok) {
    console.log(res.status)
    throw new Error('Oops, something went wrong.')
  }
  return await res.json()
}

export default postNewArticle
