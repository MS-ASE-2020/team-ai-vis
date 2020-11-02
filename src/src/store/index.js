import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    focusedClip: null,
    clips: []
  },
  mutations: {
    addClip(state, type) {
      var clip = {
        type: type,
        data: {},
        config: {}
      }
      switch(type) {
        case 'BarChart':
          break;
        case 'GeoMap': 
          break;
        case 'LineChart':
          break;
        case 'PieChart': 
          break;
      }
      state.clips.push(clip);
      console.log(state.clips);
    },
    updateFocusedClip(state, clip) {
      state.focusedClip = clip;
    },
    updateConfig(state, config) {
      state.focusedClip.config = config;
    },
    updateData(state, data) {
      state.focusedClip.data = data;
    }
  }
})

export default store;