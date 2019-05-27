import React from 'react'
import { Header } from 'semantic-ui-react'

const Chapter = ({ chapter }) => {

  return (
    <div style={{ padding: '1.5em 0', wordWrap: 'break-word' }}>
      <Header as='h3'>{chapter.title}</Header>
      <div className={'large text'}>
        {
          chapter.content
        }
      </div>
    </div>
  )
}

export default Chapter