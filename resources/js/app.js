require('./bootstrap');


import Vue from 'vue'

window.Vue = Vue

import vuetify from "./plugins/vuetify";
import App from "./App.vue"


const app = new Vue({
    el: '#app',
    vuetify,
    render: h => h(App)
});
