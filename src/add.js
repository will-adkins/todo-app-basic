import React from 'react'
import Component from '@reactions/component'

const Add = ({ onAdd }) => (
  <Component initialState={{ desc: '' }}>
    {({ state, setState }) => (
      <form
        onSubmit={e => {
          e.preventDefault()
          onAdd(state.desc)
          setState({ desc: '' })
        }}
      >
        <input
          type="text"
          value={state.desc}
          onChange={e => setState({ desc: e.target.value })}
        />
        <button type="submit">Add Todo</button>
      </form>
    )}
  </Component>
)

export default Add
