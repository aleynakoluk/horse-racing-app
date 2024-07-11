<template>
  <div class="race-track-container">
    <div class="race-track">
      <div class="lane-top"></div> <!-- En üste noktalı çizgi eklendi -->
      <div v-for="lane in lanes" :key="lane" class="lane">
        <div class="lane-number">{{ lane }}</div>
        <div v-for="horse in horsesInLane(lane)" :key="horse.id" class="horse" :style="{ left: horse.position + '%' }">
          <img :src="horse.image" alt="Horse" class="horse-img" :style="{ filter: 'hue-rotate(' + horse.hueRotate + 'deg)' }" />
        </div>
      </div>
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
      return this.horses.filter(horse => horse.lane === lane);
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
  height: 100vh; /* Sayfanın tamamını kapsar */
  margin-top: -830px;
}

.race-track {
  position: relative;
  width: 400px;
  height: 607px;
  margin-bottom: 20px;
  border-left: 1px solid #000;
  border-right: 3px solid red;
}

.lane-top {
  width: 100%;
  height: 1px;
  border-top: 1px dashed #000; /* En üstte noktalı çizgi */
}

.lane {
  position: relative;
  width: 100%;
  height: 60px;
  border-bottom: 1px dashed #000;
  display: flex;
  align-items: center;
}

.lane-number {
  width: 60px; /* Genişlik azaltıldı */
  height: 40px; /* Yükseklik artırıldı */
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: green;
  color: white;
  font-weight: bold;
  border: 1px solid white;
  transform: rotate(-90deg); /* 90 derece döndürme */
  position: absolute;
  left: -50px; /* Şerit hizasında konumlandırma */
}

.horse {
  position: absolute;
  height: 100%;
  display: flex;
  align-items: center;
}

.horse-img {
  width: 30px; /* Daha küçük boyut */
}
</style>
