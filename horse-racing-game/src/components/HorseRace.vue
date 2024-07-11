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
      // Hareket animasyonu gecikmesini hesapla
      return index * 0.5; // Örnek bir hesaplama
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
  animation: run linear 5s infinite; /* Hareket animasyonu */
}

@keyframes run {
  from { left: 0%; }
  to { left: 100%; }
}

.horse-img {
  width: 80px; /* Daha küçük boyut */
}

.finish-line {
  position: absolute;
  top: 0;
  left: 100%; /* Kırmızı çizgiyi bitiş çizgisine konumlandırma */
  width: 3px;
  height: 100%;
  background-color: red;
}
</style>
