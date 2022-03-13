const articlesState = {
  articlesData: [],
}

const searchData = (state = articlesState, action = 'ACTION') => {
  const { type, page } = action
  switch (type) {
    case 'DATA_RECEIVED':
      return {
        ...state,
        articlesData: newTickets,
        stop,
      }
    default:
      return state
  }
}

export default searchData
