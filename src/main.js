import { createApp } from 'vue'
import App from './App.vue'

import router from "/@/router/index"
import '/@/styles/init.css';

import axios from "./api"

import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
let app = createApp(App);
// app.config.globalProperties.$axios = axios;
app.provide("G", {
    axios
})
app.use(ElementPlus).use(router).mount('#app');
