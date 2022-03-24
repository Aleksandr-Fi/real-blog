const pageState = {
  page: 1,
}

const pageData = (state = pageState, action = 'ACTION') => {
  const { type, page } = action
  switch (type) {
    case 'CHANGE_PAGE':
      return {
        page: page,
      }
    default:
      return state
  }
}

export default pageData
