import { createApp } from 'vue';
import App from './App.vue';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-dark-5/dist/css/bootstrap-dark-plugin.min.css';
import '@fortawesome/fontawesome-free/css/all.css';

import router from './routes';

createApp(App).use(router).mount('#app');
