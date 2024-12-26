import { defineStore } from "pl-react";

type State = {
  codeLanguage: 'ts' | 'js'
}
const state: State = {
  codeLanguage: 'ts',
}

type Action = {
  type: 'codeLanguageChange'
  payload: 'ts' | 'js'
}
function reducer(state: State, action: Action) {
  switch (action.type) {
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

export const storeVariable = defineStore(reducer, state);
