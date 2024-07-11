<template>
  <div class="race-track-container">
    <div class="race-track">
      <div class="lane-top"></div>
      <div v-for="lane in lanes" :key="lane" class="lane">
        <div class="lane-number">{{ lane }}</div>
        <div v-for="(horse, horseIndex) in horsesInLane(lane)" :key="horse.id" class="horse" :style="{ left: horse.position + '%', animationDelay: calculateAnimationDelay(horseIndex) + 's' }">
          <img :src="require(`@/assets/horse${horse.id}.png`)" alt="Horse" class="horse-img" :style="{ filter: 'hue-rotate(' + horse.hueRotate + 'deg)' }" />
        </div>
      </div>
      <div class="finish-line">FINISH</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HorseRace',
  computed: {
    horses() {
      return this.$store.state.horses;
    },
    winner() {
      return this.$store.state.raceResults.length > 0 ? this.$store.state.raceResults[0].horseId : null;
    },
    lanes() {
      return Array.from({ length: 10 }, (_, i) => i + 1);
    }
  },
  methods: {
    horsesInLane(lane) {
      return this.horses.filter(horse => horse.id === lane);
    },
    calculateAnimationDelay(index) {
      return index * 0.5; // Example calculation for animation delay
    },
    requireHorseImage(horseId) {
      return require(`@/assets/horse${horseId}.png`);
    }
  },
  mounted() {
    this.$store.dispatch('generateHorses');
    setTimeout(() => {
      this.$store.dispatch('startRace');
    }, 1000);
  }
};
</script>

<style scoped>
.race-track-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  margin-top: -830px; /* Adjust based on your layout */
}

.race-track {
  position: relative;
  width: 90%;
  max-width: 600px;
  height: auto;
  aspect-ratio: 2 / 3;
  margin-bottom: 20px;
  border-left: 1px solid #000;
  border-right: 3px solid red;
}

.lane-top {
  width: 100%;
  height: 1px;
  border-top: 1px dashed #000;
}

.lane {
  position: relative;
  width: 100%;
  height: 10%;
  border-bottom: 1px dashed #000;
  display: flex;
  align-items: center;
}

.lane-number {
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: green;
  color: white;
  font-weight: bold;
  border: 1px solid white;
  transform: rotate(-90deg);
  position: absolute;
  left: -50px;
}

.horse {
  position: absolute;
  height: 100%;
  display: flex;
  align-items: center;
  animation: run linear 5s infinite;
}

@keyframes run {
  from { left: 0%; }
  to { left: 100%; }
}

.horse-img {
  width: 60px;
}

.finish-line {
  position: absolute;
  top: 0;
  left: 100%;
  width: 3px;
  height: 100%;
  background-color: red;
}

/* Responsive Design */
@media (max-width: 600px) {
  .race-track {
    width: 100%;
    max-width: none;
  }

  .horse-img {
    width: 40px;
  }

  .lane-number {
    width: 30px;
    height: 30px;
    left: -40px;
  }
}
</style>
