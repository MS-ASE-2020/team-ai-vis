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
        state.focusedClip.config={};
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
        case 'BarChartA':
          clip.data={
            values: [100, 80, 78, 98, 93, 82],
            title: "aaa"
          };
          clip.config={
            delay:200,
            duration:1000,
            barPadding:8,
            opacity:8,
            fontsize:12,
            bar: {
              beginColor:'red',
              endColor:'steelblue'
            },
            text: {
              beginColor:'steelblue',
              endColor:'red'
            }
          };
          break;
          case 'BarChartB':
            clip.data={
              values:[100, 80, 78, 98, 93, 82],
              title:"aaa"
            };
            clip.config = {
              delay:200,
              duration:1000,
              barPadding:8,
              opacity:5,
              fontsize:12,
              bar: {
                beginColor:'red',
                endColor:'steelblue'
              },
              text: {
                beginColor:'steelblue',
                endColor:'red'
              }
            };
            break;
        case 'GeoMapA':
          clip.config={
            delay:200,
            duration:1000,
            size: 1
          };
          clip.data={
            "type": "FeatureCollection",
    "size":[5,10,5,5,5,10],
    "features": [
      {
        "type": "Feature",
        "properties": {},
        "geometry": {
          "type": "Point",
          "coordinates": [
            105.84228515625,
            30.41078179084589
          ]
        }
      },
      {
        "type": "Feature",
        "properties": {},
        "geometry": {
          "type": "Point",
          "coordinates": [
            114.19189453125,
            22.329752304376473
          ]
        }
      },
      {
        "type": "Feature",
        "properties": {},
        "geometry": {
          "type": "Point",
          "coordinates": [
            110.3466796875,
            25.443274612305746
          ]
        }
      },
      {
        "type": "Feature",
        "properties": {},
        "geometry": {
          "type": "Point",
          "coordinates": [
            112.3681640625,
            34.56085936708384
          ]
        }
      }
    ],
    title: "aaa"}
          break;
          case 'GeoMapB':
            clip.config={
              delay:200,
              duration:1000,
              size: 1
            };
            clip.data={
              "type": "FeatureCollection",
      "size":[5,10,5,5,5,10],
      "features": [
        {
          "type": "Feature",
          "properties": {},
          "geometry": {
            "type": "Point",
            "coordinates": [
              105.84228515625,
              30.41078179084589
            ]
          }
        },
        {
          "type": "Feature",
          "properties": {},
          "geometry": {
            "type": "Point",
            "coordinates": [
              114.19189453125,
              22.329752304376473
            ]
          }
        },
        {
          "type": "Feature",
          "properties": {},
          "geometry": {
            "type": "Point",
            "coordinates": [
              110.3466796875,
              25.443274612305746
            ]
          }
        },
        {
          "type": "Feature",
          "properties": {},
          "geometry": {
            "type": "Point",
            "coordinates": [
              112.3681640625,
              34.56085936708384
            ]
          }
        }
      ],
      title: "aaa"}
            break;
        case 'LineChartA':
          clip.data = {
            values: [[1, 224], [2, 528], [3, 756], [4, 632], [5, 582], [6, 704],
            [7, 766], [8, 804], [9, 884], [10, 960], [11, 1095], [12, 1250]],
            title:"aaa"
          };
          clip.config = {
            delay: 200,
            duration: 1000,
            strokewidth: 2,
            dotsize: 3,
          };
          break;
          case 'LineChartB':
            clip.data = {
              values: [[1, 224], [2, 528], [3, 756], [4, 632], [5, 582], [6, 704],
              [7, 766], [8, 804], [9, 884], [10, 960], [11, 1095], [12, 1250]],
              title:"aaa"
            };
            clip.config = {
              delay: 200,
              duration: 1000,
              strokewidth: 2,
              dotsize: 3,
            };
            break;
        case 'PieChartA':
          clip.data = {
            values: [
              { country: "USA", value: 20 },
              { country: "China", value: 13.4 },
              { country: "Germany", value: 4.0 },
              { country: "Japan", value: 4.9 },
              { country: "France", value: 2.8 }
            ],
            title: "aaa"
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
          case 'PieChartB':
          clip.data = {
            values: [
              { country: "USA", value: 20 },
              { country: "China", value: 13.4 },
              { country: "Germany", value: 4.0 },
              { country: "Japan", value: 4.9 },
              { country: "France", value: 2.8 }
            ],
            title: "aaa"
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
    console.log(clip.data.values)
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