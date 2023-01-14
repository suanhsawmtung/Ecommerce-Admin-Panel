import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import setAuthHeader from './utils/setAuthHeader'

if (localStorage.getItem("TOKEN") !== null) {
    setAuthHeader(localStorage.getItem("TOKEN"));
} else {
    setAuthHeader(false)
}

createApp(App).use(store).use(router).mount('#app')