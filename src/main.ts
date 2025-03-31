import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { plugin } from '@formkit/vue'
import config from '../formkit.config'
import './assets/index.css'
import 'iconify-icon'

import App from './App.vue'
import router from './router'
import { createMetaManager } from 'vue-meta'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(createMetaManager())
app.use(plugin, config)

app.mount('#app')
