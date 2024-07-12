<template>
  <div class="race-results">
    <div v-for="(race, index) in raceSchedule" :key="index" class="race-section">
      <div class="race-track">
        <div class="lanes">
          <div class="lane-top"></div>
          <div v-for="lane in lanes" :key="lane" class="lane">
            <div class="lane-number">{{ lane }}</div>
            <div class="horses">
              <div v-for="(horse, horseIndex) in horsesInLane(race, lane)" :key="horseIndex" class="horse" :style="{ left: horse.position + '%' }">
                <img :src="horse.image" :alt="'horse ' + horse.id">
                <span>Horse {{ horse.id }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="finish-line"></div> <!-- Finish çizgisi -->
        <div class="finish-text">FINISH</div>
        <h5>{{ index + 1 }}.st Lap - {{ race.distance }}m</h5>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'AtYarışı',
  computed: {
    ...mapState(['raceSchedule']),
    lanes() {
      return Array.from({ length: 10 }, (_, i) => i + 1); // 1'den 10'a kadar şerit numaraları
    }
  },
  mounted() {
    this.generateHorses();
    this.startRace();
  },
  methods: {
    handleScroll() {
      const container = this.$refs.horseContainer;
      // Calculate scroll position
      const scrollPosition = container.scrollTop + container.clientHeight;
      // Check if scrolled to the bottom
      if (scrollPosition >= container.scrollHeight) {
        // Load more horses
        this.scrollOffset += this.horsesPerPage;
      }
    },
    ...mapActions(['generateHorses', 'startRace']),
    horsesInLane(race, lane) {
      return race.horses.slice((lane - 1) * 10, lane * 10); // Her şerit için atları getir
    },
  }
};
</script>

<style scoped>

.race-results::-webkit-scrollbar {
  width: 12px; /* Scroll bar genişliği */
  background-color: #fff; /* Scroll bar arka plan rengi */
  border: 1px solid #333;
}

.race-results::-webkit-scrollbar-thumb {
  background-color:  #d8d8d8fe; /* Scroll bar rengi */
  border-radius: 6px;
  border: 1px solid #333;
}

.race-results {
  display: flex;
  flex-direction: column;
  gap: 20px; /* Yarış bölümleri arası boşluğu azalttım */
  justify-content: flex-start;
  align-items: center;
  width: 550px; /* Tasarımınıza uygunsa bu genişliği koruyun */
  height: 800px; /* Tasarımınıza uygunsa bu yüksekliği koruyun */
  overflow-y: scroll;
  padding-left: 10px;
  border-radius: 4px;
  overflow-x: hidden; /* Horizontal overflow'u gizle */
}

.race-section {
  width: 390px; /* Tasarımınıza uygunsa bu genişliği koruyun */
  border-radius: 4px;
  padding-bottom: 70px;
}

.race-track {
  position: relative;
  width: 390px; /* Tasarımınıza uygunsa bu genişliği ayarlayın */
  height: 510px; /* Tasarımınıza uygunsa bu yüksekliği ayarlayın */
  margin-top: 20px;
}

.lane-top{
  width: 100%;
  height: 1px;
  border-top: 1px dashed #000;
}
.lane {
  position: relative;
  width: 390px; /* Tasarımınıza uygunsa bu genişliği ayarlayın */
  height: 50px; /* Her şerit için uygun yükseklik */
  border-bottom: 1px dashed #000; /* Şeritler arası noktalı çizgi */
}

.lane-number {
  width: 50px; /* Şerit numarası genişliği */
  height: 20px; /* Şerit numarası yüksekliği */
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: green;
  color: white;
  font-weight: bold;
  border: 1px solid white;
  transform: rotate(-90deg); /* Dikey olarak 90 derece döndürme */
  position: absolute;
  left: -20px; /* Şerit numarasının pozisyonu */
  top: 14px; /* Şerit numarasının pozisyonu */
}

.horses {
  position: relative;
  left: 0;
  right: 0;
}

.horse {
  position:relative;
  height: 50px; /* At yüksekliği */
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-weight: bold;
  animation: run linear 1s forwards; /* Animasyon süresi */
}

.horse img {
  width: 50px; /* At resmi genişliği */
  height: auto; /* Oranı koru */
  margin-right: 5px; /* Sağ boşluk */
  object-fit: contain; /* Resmin içeriğe sığdırılması */
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
  right: 0; /* Şerit numaralarının tam karşısında olacak şekilde ayarlandı */
  width: 4px; /* Finish çizgisi kalınlığı */
  height: 510px;
  background-color: red; /* Finish çizgisi rengi */
}
.finish-text {
  position: absolute;
  left: 360px; /* Finish metni pozisyonu */
  top: 510px; /* Finish metni pozisyonu */
  color: red; /* Finish metni rengi */
  font-weight: bold; /* Finish metni kalınlığı */
}

@keyframes run {
  from {
    left: -50%; /* Başlangıç pozisyonu */
  }
  to {
    left: 210px; /* Bitiş pozisyonu */
  }
}
</style>
