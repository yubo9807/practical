import { defineStore } from "pl-react";

type State = {
  theme: 'light' | 'dark' | 'OS'
  codeLanguage: 'ts' | 'js'
}
type Action =
  { type: 'setTheme', playload: State['theme'] } |
  { type: 'codeLanguageChange', payload: State['codeLanguage'] } 

const state: State = {
  theme: 'OS',
  codeLanguage: 'ts',
}
function reducer(state: State, action: Action) {
  switch (action.type) {
    case 'setTheme': {
      return {
        ...state,
        theme: action.playload,
      }
    }
    case "codeLanguageChange": {
      return {
        ...state,
        codeLanguage: action.payload,
      };
    }
    default:
      return state;
  }
}

export const defineStoreVariable = defineStore(reducer, state);
