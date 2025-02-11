import { defineStore } from "pl-react"

type State = {
  menu: JSX.IntrinsicElements
}
type Action
= { type: 'menuSet', payload: JSX.IntrinsicElements }
| { type: 'menuClear' }

const state = {
  menu: null,
}
function reducer(state: State, action: Action) {
  switch (action.type) {
    case 'menuSet':
      return { ...state, menu: action.payload }
    case 'menuClear':
      return { ...state, menu: null }
    default:
      return state;
  }
}

export const defineStoreSuspension = defineStore(reducer, state);
