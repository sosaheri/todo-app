import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios';
import router from './router'

axios.defaults.baseURL = 'http://localhost/api';
axios.defaults.headers.common['X-CSRF-TOKEN'] = document.head.querySelector('meta[name="csrf-token"]').content;   


const app = createApp(App)

app.use(router)

app.mount('#app')
