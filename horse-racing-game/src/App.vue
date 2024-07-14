<template>
  <div id="app" class="flex-container">
    <!-- Control buttons component -->
    <ControlButtons />
    <!-- Horse list component -->
    <HorseList />
    <!-- Race schedule component -->
    <RaceSchedule />
    <!-- Race results component -->
    <RaceResults />
    <!-- Horse race component -->
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
    ControlButtons, // Control buttons component
    HorseList, // Horse list component
    RaceSchedule, // Race schedule component
    RaceResults, // Race results component
    HorseRace, // Horse race component
  },
};
</script>

<style>
/* Global styles */
body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#app {
  font-family: 'Arial Narrow', Arial, sans-serif; 
  background: #d8d8d8fe;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  min-height: 100vh;
  overflow: hidden;
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
