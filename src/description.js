import React from 'react'
import {} from 'ramda'
import Component from '@reactions/component'

const Description = ({ doID, value, onSubmit, onDelete }) => (
  <Component initialState={{ id: doID, desc: value, isEdit: false }}>
    {({ state, setState }) => (
      <React.Fragment>
        {state.isEdit ? (
          <form
            onSubmit={e => {
              e.preventDefault()
              onSubmit(state.desc)
              setState({ isEdit: false })
            }}
          >
            <input
              type="text"
              value={state.desc}
              onChange={e => setState({ desc: e.target.value })}
            />
            <button type="submit">Update</button>
            <button
              type="button"
              onClick={() => {
                if (confirm(`Do you really want to delete ${state.desc}`)) {
                  onDelete(state.id)
                  setState({ isEdit: false })
                }
              }}
            >
              Delete
            </button>
            <button onClick={() => setState({ desc: value, isEdit: false })}>
              Cancel
            </button>
          </form>
        ) : (
          <div style={{}} onDoubleClick={() => setState({ isEdit: true })}>
            {state.desc}
          </div>
        )}
      </React.Fragment>
    )}
  </Component>
)

export default Description
