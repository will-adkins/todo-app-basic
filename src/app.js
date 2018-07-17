import React from 'react'

const App = (props) => {
  const {state, setState} = props
  return (
    <div style={style.centerContent}>
      <h1>react-todo App</h1>
      <p>Count: {state.count}</p>
      <div>
      <button onClick={() => setState(p => ({count: p.count + 1}))}>+</button>
      <button onClick={() => setState(p => ({count: p.count - 1}))}>-</button>
      </div>
    </div>
  )
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
