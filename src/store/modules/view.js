const view = {
  // namespaced: true,
  state: {
    isFullScren: false,
    testView: 'view'
  },
  mutations: {
    SET_FUllSCREEN(state, value) {
      state.isFullScren = value
    }
  },
  actions: {
    ChangeFullScreen({ commit, state }) {
      commit('SET_FUllSCREEN', !(state.isFullScren))
    }
  }
}
export default view
