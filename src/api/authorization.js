import rootUrlKata from './URL'

const authorization = async (data) => {
  const rootUrl = rootUrlKata
  const bodyPost = {
    user: {
      email: data.email,
      password: data.password,
    },
  }

  const res = await fetch(`${rootUrl}users/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(bodyPost),
  })
  if (!res.ok) {
    throw new Error('Oops, something went wrong.')
  }
  return await res.json()
}

export default authorization
