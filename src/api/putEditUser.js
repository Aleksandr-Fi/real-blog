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
  if (!res.ok) {
    throw new Error('Oops, something went wrong.')
  }
  return await res.json()
}

export default putEditUser
