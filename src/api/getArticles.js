import rootUrlKata from './URL'

const getArticles = async (page = 1) => {
  const rootUrl = rootUrlKata
  const offset = page * 5 - 5
  const res = await fetch(`${rootUrl}articles?offset=${offset}&limit=${5}`)
  if (!res.ok) {
    throw new Error(`Could not fetch articles, recived ${res.status}`)
  }
  return await res.json()
}

const getArticlesData =
  (page = 1) =>
  (dispatch) =>
    getArticles(page).then((body) => {
      dispatch({
        type: 'ARTICLES_RECEIVED',
        newArticles: body,
        page: page,
      })
      return {
        articles: body.articles,
        articlesCount: body.articlesCount,
        page: page,
      }
    })

export default getArticlesData
