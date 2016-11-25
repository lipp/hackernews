import 'isomorphic-fetch'
import co from 'co'

const baseUrl = 'https://hacker-news.firebaseio.com/v0/'

const fetchJson = async (url) => {
  const res = await fetch(url)
  return res.json()
} 

const fetchStories = async (category) => {
  const itemIds = await fetchJson(`${baseUrl}${category}stories.json`)
  return co(function*() {
    const items = yield itemIds.slice(0, 30).map(item => fetchJson(`${baseUrl}item/${item}.json`))
    return {stories: items}
  })
}

export {fetchStories}
