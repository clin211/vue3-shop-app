import { createApp } from 'vue';
import { createPinia } from 'pinia';

// 引入flexible 适配
import './assets/flexible';
// 导入重置样式
import './assets/reset.css';

import '@/styles/index.scss';
import 'vant/lib/index.css';

// removeAd
import './assets/removeAd';

import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount('#app');
