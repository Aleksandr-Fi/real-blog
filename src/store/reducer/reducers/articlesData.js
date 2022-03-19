const articlesState = {
  articlesData: [],
}

const articlesData = (state = articlesState, action = 'ACTION') => {
  const { type, newArticles } = action
  switch (type) {
    case 'ARTICLES_RECEIVED':
      return {
        articles: newArticles.articles,
        articlesCount: newArticles.articlesCount,
      }
    default:
      return state
  }
}

export default articlesData
