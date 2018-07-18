import React from 'react'
import ReactDOM from 'react-dom'
import Component from '@reactions/component'
import App from './app'

ReactDOM.render(
  <Component
    initialState={{
      todos: [{ id: 1, desc: 'MILK!', completed: false }],
      isFilterComplete: false,
      isFilterIncomplete: false
    }}
  >
    {App}
  </Component>,
  document.getElementById('app')
)
