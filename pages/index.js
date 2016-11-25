import React from 'react'
import css from 'next/css'
import Head from 'next/head'
import Link from 'next/link'
import moment from 'moment'
import {fetchStories} from '../api'

const categories = ['show', 'job', 'ask']

const Nav = () => (
  <nav className={navStyle}>
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

const navStyle = css({
  '& li': {
    display: 'inline-block',
    textTransform: 'uppercase',
    marginRight: '3em',
    fontWeight: 'bolder'
  }
})

const Story = ({story}) => (
  <div>
    <h4><a href={story.url}>{story.title}</a></h4>
    <span>{story.score} Points - 
      Posted {moment.unix(story.time).fromNow()} 
      by {story.by}
    </span>
  </div>
)

const storyStyle = css({
  '& h4': {
  }
})

const Stories = ({stories}) => (
  <ol>
    {stories.map(story => (
      <li key={story.id}>
        <Story story={story} />
      </li>
    ))}
  </ol>
)

class App extends React.Component {

  static async getInitialProps ({query: {category = 'show'}}) {
    return fetchStories(category)
  }

  render () {
    const {stories} = this.props
    return (
      <div className={appStyle}>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <Nav />
        <Stories stories={this.props.stories} />
      </div>
   )
  }
}

const appStyle = css({
  fontFamily: 'Verdana, Geneva, sans-serif',
  color: '#333',
  margin: '0 auto',
  maxWidth: 800,
  '& a': {
    textDecoration: 'none'
  }
})

export default App
