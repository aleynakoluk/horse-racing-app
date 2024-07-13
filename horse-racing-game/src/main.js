import { createApp } from 'vue';
import App from './App.vue';
import store from './store';

// Vue uygulamasını oluşturma ve Vuex store'u kullanarak başlatma
createApp(App)
  .use(store) // Vuex store'u uygulama
  .mount('#app'); // Uygulamayı '#app' id'sine sahip HTML elemanına monte etme
