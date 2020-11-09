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
          clip.data = {
            values: [ 100, 80, 78, 98, 93, 82 ]
          };
          clip.config = {
            delay: 200,
            duration: 1000,
            barPadding: 0,
            bar: {
              beginColor: 'red',
              endColor: 'steelblue'
            },
            text: {
              beginColor: 'steelblue',
              endColor: 'red'
            }
          };
          break;
        case 'GeoMap': 
          break;
        case 'LineChart':
          break;
        case 'PieChart': 
        clip.data = {
          values: [
            { country: "USA", value: 20 },
            { country: "China", value: 13.4 },
            { country: "Germany", value: 4.0 },
            { country: "Japan", value: 4.9 },
            { country: "France", value: 2.8 }
          ]
        };
        clip.config = {
          delay: 200,
          duration: 1000,
          range: 180,
          opacity: 8,
        };
        break;
      }
      state.focusedClip = clip;
      state.clips.push(clip);
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