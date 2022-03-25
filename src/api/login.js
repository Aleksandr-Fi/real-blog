import rootUrlKata from './URL'

const login = async (data) => {
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
  const body = await res.json()
  if (res.status === 422) {
    throw { responseError: body, message: 'Email or password is invalid.' }
  }
  if (!res.ok) {
    throw { responseError: body, message: 'Oops, something went wrong.' }
  }
  return body
}

export default login
