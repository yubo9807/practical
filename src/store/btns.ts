import { defineStore } from "pl-react"

type State = { id: string | symbol, layer: number, btn: JSX.IntrinsicElements }[]

type Action
= { type: 'btnAdd', payload: State[number] }
| { type: 'btnRemove', payload: State[number]['id'] }

const state: State = []

function reducer(state: State, action: Action): State {
  function findBtn(id: State[number]['id']) {
    return state.find(btn => btn.id === id)
  }

  switch (action.type) {
    case 'btnAdd':
      const isExist = state.find(btn => btn.id === action.payload.id);
      if (isExist) return state;
      return [...state, action.payload]
    case 'btnRemove':
      return state.filter(btn => btn.id !== action.payload)
    default:
      return state;
  }
}

export const defineStoreBtns = defineStore(reducer, state);