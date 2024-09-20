import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import axios from 'axios';
import router from './router'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

axios.defaults.baseURL = 'http://localhost/api';
axios.defaults.headers.common['X-CSRF-TOKEN'] = document.head.querySelector('meta[name="csrf-token"]').content;   

const app = createApp(App)

app.use(router)
app.use(VueSweetalert2)

app.mount('#app')
