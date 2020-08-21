import Vue from "vue";
import * as VueGoogleMaps from "vue2-google-maps";

Vue.use(VueGoogleMaps, {
  load: {
    key: "AIzaSyBBM7FoS4ioFr3BYIvrfFceRsSDo9Q5E8E",
    libraries: "places"
  }
});