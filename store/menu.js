const state = () => ({ content: [], loading: false });

// getters
const getters = {};

// actions
const actions = {};

// mutations
const mutations = {
  loadContent(state) {
    if (!state.loading) {
      state.loading = true;
      let content = require('@/assets/mt-menu.json');
      let images = require.context('@/assets/img/mt-menu-images', false, /\.png$/);
      content.forEach((section) => {
        section.data.forEach((item) => {
          item.img = images('./' + item.img);
        });
      });
      state.content = content;
      state.loading = false;
    }
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
