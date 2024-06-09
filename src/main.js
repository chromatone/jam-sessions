import { createApp } from 'vue'
import './style.postcss'
import App from './App.vue'

import '@unocss/reset/tailwind.css'
import 'virtual:uno.css'

createApp(App).mount('#app')
