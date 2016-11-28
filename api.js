const graphqlFetch = require('graphql-fetch')('https://www.graphqlhub.com/graphql')

const graphqlQuery = (category) => `
{
  hn {
    ${category}Stories(limit: 50) {
      title
      url
      timeISO
      by {
        id
      }
    }
  }
}
`

const fetchStories = async (category) => {
  const res = await graphqlFetch(graphqlQuery(category))
  return {stories: res.data.hn[`${category}Stories`]}
}

export {fetchStories}
