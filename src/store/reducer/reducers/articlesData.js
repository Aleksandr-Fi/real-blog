const articlesState = {
  articlesData: [],
}

const articlesData = (state = articlesState, action = 'ACTION') => {
  const { type, newArticles, page } = action
  switch (type) {
    case 'ARTICLES_RECEIVED':
      return {
        articles: newArticles.articles,
        articlesCount: newArticles.articlesCount,
        page: page,
      }
    default:
      return state
  }
}

export default articlesData
