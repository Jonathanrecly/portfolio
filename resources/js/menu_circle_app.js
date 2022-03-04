require('./bootstrap');


import Vue from 'vue'

window.Vue = Vue

import vuetify from "./plugins/vuetify";
import App from "./modules/menu_circle/app"
import store from "@store";


const app = new Vue({
    el: '#app',
    vuetify,
    store,
    render: h => h(App)
});
