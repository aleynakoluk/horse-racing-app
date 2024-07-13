<template>
  <div id="app" class="flex-container">
    <!-- Kontrol butonları bileşeni -->
    <ControlButtons />
    <!-- At listesi bileşeni -->
    <HorseList />
    <!-- Yarış programı bileşeni -->
    <RaceSchedule />
    <!-- Yarış sonuçları bileşeni -->
    <RaceResults />
    <!-- At yarışı bileşeni -->
    <HorseRace />
  </div>
</template>

<script>
import ControlButtons from './components/ControlButtons.vue';
import HorseList from './components/HorseList.vue';
import RaceSchedule from './components/RaceSchedule.vue';
import RaceResults from './components/RaceResults.vue';
import HorseRace from './components/HorseRace.vue';

export default {
  name: 'App',
  components: {
    ControlButtons, // Kontrol butonları bileşeni
    HorseList, // At listesi bileşeni
    RaceSchedule, // Yarış programı bileşeni
    RaceResults, // Yarış sonuçları bileşeni
    HorseRace, // At yarışı bileşeni
  },
};
</script>

<style>
/* Global stiller */
body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#app {
  font-family: 'Arial Narrow', Arial, sans-serif; 
  background:  #d8d8d8fe;
  display: flex;
  flex-direction: row; /* Bileşenleri yatay olarak sıralama */
  overflow: hidden; /* İçeriğin taşmasını engelleme */
  flex-wrap: wrap; /* Bileşenlerin sığmadığı durumda alt satıra geçmesini sağlama */
}


h1 {
  color: #333;
  margin-bottom: 20px;
  animation: fadeInDown 1s;
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
