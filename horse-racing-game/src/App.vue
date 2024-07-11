<template>
  <div id="app">
    <ControlButtons />
    <HorseList />
    <RaceSchedule />
    <RaceResults />
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
    ControlButtons,
    HorseList,
    RaceSchedule,
    RaceResults,
    HorseRace,
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
  font-family: 'Arial, sans-serif';
  background: rgb(176, 176, 176);
  display: flex;
  flex-direction: column;
  overflow: hidden; /* İçeriğin taşmasını engeller */
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
