import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    focusedClip: null,
    clips: []
  },
  mutations: {
    deleteClip(state,clip)
    {
      var index=state.clips.indexOf(clip);
      if(state.clips.length == 1){
        state.focusedClip=null;
        state.clips=[];
      }
      if(index>-1){
        state.clips.splice(index,1);
      }

      if(index == 0){
        state.focusedClip = state.clips[0];
      }
      else{
        state.focusedClip = state.clips[index - 1];
      }
     
    },
    left(state,clip){
      var index = state.clips.indexOf(clip);
      var temp = clip;
      if(index >0){
        state.clips[index] = state.clips[index-1];
        state.clips[index-1] = temp;
        state.focusedClip = state.clips[index];
        state.focusedClip = state.clips[index-1];
      }
    },
    right(state,clip){
      var index = state.clips.indexOf(clip);
      var temp = clip;
      console.log(state.clips.length);
      if(index < state.clips.length -1){
        state.clips[index] = state.clips[index+1];
        state.clips[index+1] = temp;
        state.focusedClip = state.clips[index];
        state.focusedClip = state.clips[index+1];
      }
    },
    addClip(state, type) {
      var clip = {
        type: type,
        data: {},
        config: {}
      };
      switch (type) {
        case 'BarChart':
          clip.data = {
            values: [100, 80, 78, 98, 93, 82]
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
          clip.config={
            delay:200,
            duration:1000,
            size: 1
          };
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
            fontsize:12,
            strokewidth:1
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