import { createApp } from 'vue';
import App from './App.vue';
import store from './store';

// Create Vue application and initialize with Vuex store
createApp(App)
  .use(store) // Use Vuex store in the application
  .mount('#app'); // Mount the application to HTML element with id '#app'
