import './assets/scss/style.scss'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'boxicons/css/boxicons.min.css';

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
