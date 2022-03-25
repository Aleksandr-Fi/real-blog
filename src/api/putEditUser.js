import rootUrlKata from './URL'

const putEditUser = async (data, token) => {
  const rootUrl = rootUrlKata
  const changeData = {}
  for (var key in data) {
    if (data[key]) {
      changeData[key] = data[key]
    }
  }
  const bodyPost = {
    user: changeData,
  }

  const res = await fetch(`${rootUrl}user`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      Authorization: `Token ${token}`,
    },
    body: JSON.stringify(bodyPost),
  })
  const body = await res.json()
  if (res.status === 422) {
    throw { responseError: body, message: 'The username or login is already employed.' }
  }
  if (!res.ok) {
    throw { responseError: body, message: 'Oops, something went wrong.' }
  }
  return body
}

export default putEditUser
