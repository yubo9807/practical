import { defineStore } from "pl-react";

const THEME_KEY = '__theme__';
type State = {
  theme: 'light' | 'dark' | 'OS'
  codeLanguage: 'ts' | 'js'
}
type Action =
  { type: 'initTheme' } |
  { type: 'setTheme', playload: State['theme'] } |
  { type: 'codeLanguageChange', payload: State['codeLanguage'] } 

const state: State = {
  theme: 'OS',
  codeLanguage: 'ts',
}

function setTheme(theme: State['theme']) {
  localStorage.setItem(THEME_KEY, theme);
  if (theme === 'OS') {
    const prefers = matchMedia('(prefers-color-scheme: dark)');
    document.documentElement.dataset.theme = prefers.matches ? 'dark' : 'light';
  } else {
    document.documentElement.dataset.theme = theme;
  }
}

function reducer(state: State, action: Action) {
  switch (action.type) {
    // 初始化主题
    case 'initTheme': {
      let theme = localStorage.getItem(THEME_KEY) as State['theme'] || state.theme;
      const prefers = matchMedia('(prefers-color-scheme: dark)');
      if (state.theme !== 'OS') {
        theme = prefers.matches ? 'dark' : 'light';
      }
      setTheme(theme);

      function followOS() {
        const cacheTheme = localStorage.getItem(THEME_KEY);
        if (cacheTheme !== 'OS') return;
        document.documentElement.dataset.theme = prefers.matches ? 'dark' : 'light';
      }
      prefers.addEventListener('change', followOS);
      return { ...state, theme }
    }
    // 切换主题
    case 'setTheme': {
      const theme = action.playload;
      setTheme(theme);
      return { ...state, theme }
    }

    // 切换代码语言
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
