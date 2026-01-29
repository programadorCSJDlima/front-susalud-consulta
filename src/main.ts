import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VueToast from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-bootstrap.css'
import App from './App.vue'
import router from './router'
import './style.css'

const app = createApp(App)

const pinia = createPinia()
app.use(pinia)
app.use(router)
app.use(VueToast, {
  position: 'top-right',
  duration: 4000,
})
app.mount('#app')
