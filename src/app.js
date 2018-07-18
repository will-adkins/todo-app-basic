import React from 'react'
import { withStyles } from '@material-ui/core'
import {
  map,
  propEq,
  merge,
  append,
  reduce,
  max,
  reject,
  filter,
  compose
} from 'ramda'
import Description from './description'
import Add from './add'

const App = props => {
  const { state, setState, classes } = props
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column'
      }}
    >
      <h1>TODO App</h1>
      <div style={{ marginBottom: 16 }}>
        <button
          type="button"
          onClick={() => {
            const newList = filter(todo => !todo.completed, state.todos)
            setState({ todos: newList })
          }}
        >
          Remove All Completed
        </button>

        <button
          type="button"
          onClick={() => {
            const newList = map(t => merge(t, { completed: true }), state.todos)
            setState({ todos: newList })
          }}
        >
          Check All Completed
        </button>
      </div>

      <Add
        onAdd={desc => {
          const newList = append(
            {
              id: reduce((acc, todo) => max(acc, todo.id) + 1, 0, state.todos),
              desc,
              completed: false
            },
            state.todos
          )
          setState({ todos: newList })
        }}
      />

      <ul>
        {state.isFilterComplete
          ? compose(
              map(li),
              filter(todo => todo.completed)
            )(state.todos)
          : state.isFilterIncomplete
            ? compose(
                map(li),
                filter(todo => !todo.completed)
              )(state.todos)
            : map(li, state.todos)}
      </ul>
      <div style={{ flexDirection: 'row' }}>
        <button
          type="button"
          onClick={() =>
            setState({ isFilterIncomplete: false, isFilterComplete: false })
          }
        >
          Show All
        </button>
        <button
          type="button"
          onClick={() =>
            setState({
              isFilterIncomplete: !state.isFilterIncomplete,
              isFilterComplete: false
            })
          }
        >
          {state.isFilterIncomplete ? 'Hide' : 'Show'} Incomplete
        </button>
        <button
          type="button"
          onClick={() =>
            setState({
              isFilterComplete: !state.isFilterComplete,
              isFilterIncomplete: false
            })
          }
        >
          {state.isFilterComplete ? 'Hide' : 'Show'} Complete
        </button>
      </div>
    </div>
  )

  function li(todo) {
    return (
      <li key={todo.id}>
        <div style={{ flexDirection: 'row' }}>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => {
              const newList = map(
                t =>
                  propEq('id', todo.id, t)
                    ? merge(t, { completed: !t.completed })
                    : t,
                state.todos
              )
              setState({ todos: newList })
            }}
          />
          <Description
            doID={todo.id}
            value={todo.desc}
            onSubmit={description => {
              const newList = map(
                t =>
                  propEq('id', todo.id, t)
                    ? merge(t, { desc: description })
                    : t,
                state.todos
              )
              setState({ todos: newList })
            }}
            onDelete={id => {
              const newList = reject(t => t.id === id, state.todos)
              setState({ todos: newList })
            }}
          />
        </div>
      </li>
    )
  }
}

const style = {
  centerContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  }
}

export default App
