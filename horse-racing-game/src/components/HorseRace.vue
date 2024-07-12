<template>
  <div class="race-results">
    <div v-for="(race, index) in raceSchedule" :key="index" class="race-section">
      <div class="race-track">
        <div class="lanes">
          <div class="lane-top"></div>
          <div v-for="lane in lanes" :key="lane" class="lane">
            <div class="lane-number">{{ lane }}</div>
            <div class="horses">
              <div
                v-for="(horse, horseIndex) in horsesInLane(race, lane)"
                :key="horseIndex"
                class="horse"
                :style="{ left: horse.position + '%' }"
              >
                <img :src="horse.image" :alt="'horse ' + horse.id">
                <span :style="{ color: horse.color }">Horse {{ horse.id }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="finish-line"></div>
        <div class="finish-text">FINISH</div>
        <h5>{{ index + 1 }}.st Lap - {{ race.distance }}m</h5>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'HorseRace',
  computed: {
    ...mapState(['raceSchedule']),
    lanes() {
      return Array.from({ length: 10 }, (_, i) => i + 1);
    }
  },
  mounted() {
    this.generateHorses();
  },
  methods: {
    ...mapActions(['generateHorses', 'startRace', 'clearRaceResults']),
    
    // Ensure handleStartRace is defined correctly
    handleStartRace() {
      // Start race logic
      this.clearRaceResults(); // Clear existing race results if needed
      this.startRace(); // Start the race
    },

    horsesInLane(race, lane) {
      return race.horses.slice((lane - 1) * 10, lane * 10);
    },
  },
  watch: {
    // Watch for changes in raceSchedule to start race
    raceSchedule: {
      handler(newVal, oldVal) {
        if (newVal.length > oldVal.length) {
          this.handleStartRace(); // Trigger start race when race schedule updates
        }
      },
      deep: true,
    },
  },
};
</script>

<style scoped>
.race-results {
  display: flex;
  flex-direction: column;
  gap: 20px;
  justify-content: flex-start;
  align-items: center;
  width: 550px;
  height: 730px;
  overflow-y: scroll;
  padding-left: 10px;
  border-radius: 4px;
  overflow-x: hidden;
}

.race-section {
  width: 390px;
  border-radius: 4px;
  padding-bottom: 70px;
}

.race-track {
  position: relative;
  width: 390px;
  height: 510px;
  margin-top: 20px;
}

.lane-top {
  width: 100%;
  height: 1px;
  border-top: 1px dashed #000;
}

.lane {
  position: relative;
  width: 390px;
  height: 50px;
  border-bottom: 1px dashed #000;
}

.lane-number {
  width: 50px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: green;
  color: white;
  font-weight: bold;
  border: 1px solid white;
  transform: rotate(-90deg);
  position: absolute;
  left: -20px;
  top: 14px;
}

.horses {
  position: relative;
  left: 0;
  right: 0;
}

.horse {
  position: relative;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: bold;
}

.horse img {
  width: 50px;
  height: auto;
  margin-right: 5px;
  object-fit: contain;
}

h5 {
  text-align: center;
  color: red;
  padding-bottom: 50px;
}

.finish-line {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  width: 4px;
  height: 510px;
  background-color: red;
}

.finish-text {
  position: absolute;
  left: 360px;
  top: 510px;
  color: red;
  font-weight: bold;
}

@keyframes run {
  from {
    left: -50%;
  }
  to {
    left: 210px;
  }
}

/* At animasyonu için başlangıçta animasyonu iptal et */
.horse {
  animation: none;
}
</style>
