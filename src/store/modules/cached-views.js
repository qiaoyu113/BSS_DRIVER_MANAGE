export default {
  namespaced: true,
  state: {
    cachedViews: [],
    visitedViews: []
  },
  mutations: {
    // 添加缓存
    ADD_CACHED_VIEW(state, view) {
      if (state.cachedViews.includes(view.name)) return
      if (view.meta && view.meta.keepAlive) {
        state.cachedViews.push(view.name)
      }
    },
    DEL_CACHED_VIEW(state, name) {
      for (let index = 0; index < state.cachedViews.length; index++) {
        const item = state.cachedViews[index];
        if(item === name){
          state.cachedViews.splice(i, 1)
          break
        }
      }
    },
    DEL_ALL_CACHED_VIEWS(state) {
      state.cachedViews = []
    }
  },
  actions: {
    addView(state, view) {
      state.commit('ADD_CACHED_VIEW', view)
    },
    delView(state, view) {
      state.commit('DEL_CACHED_VIEW', view)
    },
    delAllViews(state) {
      state.commit('DEL_ALL_CACHED_VIEWS')
    }
  },
  getters: {
    cachedViews(state) {
      console.log(state);
      return state.cachedViews
    },
    visitedViews(state) {
      return state.visitedViews
    }
  }
}
