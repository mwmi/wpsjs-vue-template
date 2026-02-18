import 'primeicons/primeicons.css'
import "./style.css"

import { createApp } from 'vue'

import PrimeVue from 'primevue/config';
import ConfirmationService from 'primevue/confirmationservice'
import DialogService from 'primevue/dialogservice'
import ToastService from 'primevue/toastservice';

import App from './App.vue'
import router from './router'

import Noir from './presets/Noir.js';

const app = createApp(App);

app.use(router);
app.use(PrimeVue, {
    theme: {
        preset: Noir
    }
});
app.use(ConfirmationService);
app.use(ToastService);
app.use(DialogService);

app.mount('#app');
