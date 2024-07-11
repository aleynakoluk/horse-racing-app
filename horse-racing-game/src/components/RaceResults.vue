<template>
  <div class="race-results">
    <h2>Race Results</h2>
    <ul>
      <li v-for="(result, index) in raceResults" :key="index">
        Race {{ index + 1 }}: {{ result }}
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState(['raceResults']),
  },
};
</script>

<style>
.race-results {
  animation: fadeIn 1s;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin: 5px 0;
  font-size: 18px;
  animation: slideIn 0.5s;
}

@keyframes slideIn {
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
</style>




