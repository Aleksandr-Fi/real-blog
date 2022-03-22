import rootUrlKata from './URL'

const putEditUser = async (data, token) => {
  const rootUrl = rootUrlKata
  const bodyPost = {
    user: {
      username: data.username,
      email: data.email,
      password: data.password,
      image: data.image,
    },
  }

  const res = await fetch(`${rootUrl}user`, {
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

export default putEditUser
