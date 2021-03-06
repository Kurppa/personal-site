import React, { useState, useEffect } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom'
import { connect } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'

import { Container, Header, Segment, Message } from 'semantic-ui-react'
import Menubar from './components/Menubar' 
import Frontpage from './components/BlogPage/FrontpageMain'
import Aboutpage from './components/AboutPage/Aboutpage'
import Projectspage from './components/ProjectPage/Projectspage'
import LoginPage from './components/LoginPage'
import BlogControl from './components/EditPage/BlogControl'
import Blog from './components/BlogView/Blog'


const App = (props) => {
  const [message, setMessage] = useState(null)
  const [login, setLogin] = useState(null)

  useEffect(() => {
    props.initializeBlogs()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const renderMessage = () => {
    let messagetype = ''
    switch(message.status) {
    case 'error':
      messagetype = 'error'
      break
    case 'success':
      messagetype = 'success'
      break
    case 'warning':
      messagetype = 'warning'
      break
    default:
      break
    }
    return (
      <Message className={messagetype}>
        {
          message.message
        }
      </Message>
    )
  }

  const createMessage = (message) => {
    setMessage(message)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  return (
    <Router>
      <Menubar />
      <Container style={{ marginTop: '3em' }}>
        <Switch>
          <Route exact path='/' render={() => (
            <Aboutpage />
          )}
          />
          <Route exact path='/blogs' render={() => (
            <Frontpage />
          )}/>
          <Route exact path='/projects' render={() => (
            <Projectspage />
          )}/>
          <Route exact path='/login' render={() => (
            <LoginPage setLogin={setLogin} setMessage={createMessage}/> 
          )} />
          <Route exact path='/blogging' render={() => {
            if (login) {
              return (
                <BlogControl />
              )
            } else {
              return(
                <Segment>
                  <Header as='h1'>Nothing here</Header>
                </Segment>
              )  
            }
          }}/>
          <Route exact path='/blogs/:id' render={({ match }) => {
            if (props.blogs.length === 0) {
              return (
                <div>loading...</div>
              )
            }
            const blog = props.blogs.find(blog => blog.id === match.params.id)
            if (!blog) {
              return (
                <div>No blog</div>
              )
            }
            return (
              <Blog blog={blog} />
            )
          }
            
          } />
          <Route render={() => (
            <Segment>
              <Header as='h1'>Nothing here</Header>
            </Segment>
          )} />
        </Switch>
      </Container>
    </Router>
  )
}

const mapStateToProps = (state) => {
  return {
    blogs: state
  }
}

export default connect(mapStateToProps, { initializeBlogs })(App)
