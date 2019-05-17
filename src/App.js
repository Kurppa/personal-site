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
import Frontpage from './components/FrontPage.js/FrontpageMain'
import Aboutpage from './components/AboutPage/Aboutpage'
import Projectspage from './components/ProjectPage/Projectspage'
import LoginPage from './components/LoginPage'
import BlogControl from './components/BlogControls/BlogControl'

const App = (props) => {
  const [message, setMessage] = useState(null)

  useEffect(() => {
    props.initializeBlogs()
  }, [])

  //TODO different message states
  const renderMessage = () => {
    return (
      <Message>
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
      <Container style={{ 'margin': '3rem 0rem' }}>
        {
          message ? renderMessage() : null
        }
        <Switch>
          <Route exact path='/' render={() => (
            <Frontpage />
          )}
          />
          <Route exact path='/about' render={() => (
            <Aboutpage />
          )}/>
          <Route exact path='/projects' render={() => (
            <Projectspage />
          )}/>
          <Route exact path='/login' render={() => (
            <LoginPage setMessage={createMessage}/> 
          )} />
          <Route exact path='/blogging' render={() => (
            <BlogControl />
          )} />
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

export default connect(null, { initializeBlogs })(App)
