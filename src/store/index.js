import { createStore } from 'vuex'

export default createStore({
  state: {
    lang: 'de',
    urlApi: 'https://app.moissan.eu/'
  },
  getters: {
  },
  mutations: {
    changeLang(state, nameLang) {
      state.lang = nameLang
    }
  },
  actions: {

  },
  modules: {
  }
})
