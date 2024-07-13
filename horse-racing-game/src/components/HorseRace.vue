<template>
  <div class="race-results">
    <!-- Her bir yarış için bölüm oluşturma -->
    <div v-for="(race, index) in raceSchedule" :key="index" class="race-section">
      <div class="race-track">
        <div class="lanes">
          <div class="lane-top"></div>
          <!-- Her kulvar için şerit oluşturma -->
          <div v-for="lane in lanes" :key="lane" class="lane">
            <div class="lane-number">{{ lane }}</div>
            <div class="horses">
              <!-- Her kulvardaki atlar için bir at elemanı oluşturma -->
              <div
                v-for="(horse, horseIndex) in horsesInLane(race, lane)"
                :key="horseIndex"
                class="horse"
                :style="{ left: horse.position + '%' }"
              >
                <img :src="horse.image" :alt="'horse ' + getHorseName(horse.id)">
              </div>
            </div>
          </div>
        </div>
        <!-- kulvarların sonuna kırmızı çizgi/finish çizgisi oluşturma -->
        <div class="finish-line"></div>
        <div class="finish-text">FINISH</div>
        <h5>{{ index + 1 }}.st Lap - {{ race.distance }}m</h5>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'HorseRace',
  computed: {
    // Vuex store'dan raceSchedule state'ini eşleme
    ...mapState(['raceSchedule']),
    lanes() {
      return Array.from({ length: 10 }, (_, i) => i + 1); // 10 şerit oluşturma
    }
  },
  mounted() {
    // Bileşen yüklendiğinde atları oluşturma işlemi
    this.$store.dispatch('generateHorses');
  },
  methods: {
    // Belirli bir yarış ve kulvardaki atları döndürme
    horsesInLane(race, lane) {
      return race.horses.slice((lane - 1) * 10, lane * 10);
    },
    // At ismini getirme
    getHorseName(horseId) {
      const names = ["Ekselans", "Herkül", "Prens", "Görkem", "Karamel", "Roswell", "Romeo", "Taffy", "Tekila", "Popcorn", "Sirius", "Uila", "Buddy", "Max", "Black Beauty", "Alfa", "Asalet", "Siyah İnci", "Abanoz", "Prenses"];
      return names[(horseId - 1) % names.length];
    }
  }
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
  width: 100%;
  height: 50px;
  border-bottom: 1px dashed #000;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: flex-start;
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
  top: 13px;
}

.horses {
  position: relative;
  left: 0;
  display: flex;
  flex-direction: column;
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
</style>
