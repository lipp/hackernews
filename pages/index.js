import React from 'react'
import Link from 'next/link'
import moment from 'moment'
import {fetchStories} from '../api'

const categories = ['show', 'job', 'ask']

const Nav = () => (
  <nav>
    <ul>
      {categories.map(cat => (
        <li key={cat}>
          <Link href={`/?category=${cat}`}>
            <a>{cat}</a>
          </Link>
        </li>
      ))}
    </ul>
  </nav>
)

const Story = ({story}) => (
  <div>
    <h4><a href={story.url}>{story.title}</a></h4>
    <span>{story.score} Points - 
      Posted {moment.unix(story.time).fromNow()} 
      by {story.by}
    </span>
  </div>
)

const Stories = ({stories}) => (
  <ol>
    {stories.map(story => (
      <li key={story.id}>
        <Story story={story} />
      </li>
    ))}
  </ol>
)

export default class extends React.Component {

  static async getInitialProps ({query: {category = 'show'}}) {
    return fetchStories(category)
  }

  render () {
    const {stories} = this.props
    return (
      <div>
        <Nav />
        { stories ? <Stories stories={this.props.stories}/> : <p>Loading...</p> }
      </div>
   )
  }
}
