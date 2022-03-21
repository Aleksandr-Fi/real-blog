import rootUrlKata from './URL'

const postNewUser = async (data) => {
  const rootUrl = rootUrlKata
  const bodyPost = {
    user: {
      username: data.username,
      email: data.email,
      password: data.password,
    },
  }

  const res = await fetch(`${rootUrl}users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(bodyPost),
  })
  if (res.status === 422) {
    const body = await res.json()
    throw { responseError: body, message: 'The username or login is already employed.' }
  }
  if (!res.ok) {
    throw new Error('Oops, something went wrong.')
  }
  return await res.json()
}

export default postNewUser
