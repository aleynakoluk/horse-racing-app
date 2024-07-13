<template>
  <!-- Header konteynerı -->
  <div class="header-container">
    <!-- Header bölümü -->
    <header class="header">
      <!-- Headerın sol kısmı -->
      <div class="left">
        <h1>Horse Racing</h1> <!-- Header başlığı -->
      </div>
      <!-- Headerın sağ kısmı -->
      <div class="right">
        <!-- Program oluşturma butonu -->
        <button @click="handleGenerateScheduleClick" class="btn">GENERATE PROGRAM</button>
        <!-- Yarış başlat/duraklat butonu -->
        <button @click="handleStartRaceClick" class="btn">START/PAUSE</button>
      </div>
    </header>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';

export default {
  computed: {
    ...mapState(['horses', 'raceInterval']), // Vuex durumunu bileşene aktarma
    raceRunning() {
      return !!this.raceInterval; // Yarış animasyonu çalışıyor mu?
    },
  },
  methods: {
    ...mapActions(['generateHorses', 'startRace', 'updateHorsePosition']), // Vuex eylemlerini bileşene aktarma
    ...mapMutations(['SET_RACE_INTERVAL', 'CLEAR_RACE_INTERVAL']), // Vuex mutasyonlarını bileşene aktarma
    async handleGenerateScheduleClick() {
      // Program oluşturma butonuna tıklandığında tetiklenir
      try {
        await this.generateHorses(); // Atları oluşturma ve programı başlatma
        console.log('Horses generated and race schedule created successfully!');
      } catch (error) {
        console.error('Error generating horses and creating race schedule:', error);
        alert('Error generating horses and creating race schedule. Please try again later.');
      }
    },
    async handleStartRaceClick() {
      // Yarış başlat/duraklat butonuna tıklandığında bu işlemleri yapar:
      if (this.raceRunning) {
        this.pauseRace(); // Yarış çalışıyorsa duraklatma
      } else {
        this.startRace(); // Yarış duruyorsa başlatma
      }
    },
    async pauseRace() {
      // Yarışı duraklatma
      this.CLEAR_RACE_INTERVAL(); // Yarış intervalini temizleme
      console.log('Race paused.');
    },
    startRace() {
      // Yarışı başlatma
      if (this.horses.length === 0) {
        alert('Please generate horses first.'); // Atlar yoksa uyarı versin
        return;
      }

      const interval = setInterval(() => {
        this.horses.forEach(horse => {
          const speed = this.calculateSpeed(horse.condition); // Atın hızını hesaplama
          let newPosition = horse.position + speed; // Yeni pozisyonu hesaplama

          // Atların 605 pikselden fazla hareket etmemesini sağlama
          if (newPosition > 605) {
            newPosition = 605;
          }

          this.updateHorsePosition({ horseId: horse.id, position: newPosition }); // Atın pozisyonunu güncelleme
          console.log(`Horse ${horse.id} has moved ${newPosition.toFixed(2)} pixels.`);
        });

        // Tüm atlar bitiş çizgisine ulaştıysa yarışı bitirme
        const allHorsesFinished = this.horses.every(horse => horse.position >= 605);
        if (allHorsesFinished) {
          this.CLEAR_RACE_INTERVAL(); // Yarış intervalini temizleme
          console.log('Race finished.');
        }
      }, 100); // 100 ms aralıklarla pozisyonları güncelleme

      this.SET_RACE_INTERVAL(interval); // Yarış intervalini Vuex'te kaydetme
      console.log('Race started.');
    },
    calculateSpeed(condition) {
      // Atın hızını hesaplama
      return Math.round(condition / 2); 
    },
  },
  async mounted() {
    // Bileşen yüklendiğinde atları oluşturma
    try {
      await this.generateHorses();
    } catch (error) {
      console.error('Error initializing horses and race schedule:', error);
    }
  },
};
</script>

<style scoped>
/* Header konteyner stili */
.header-container {
  background-color: #f08080;
  width: 100%;
}

/* Header stili */
.header {
  position: sticky;
  top: 0; /* Ekranın en üstüne yapıştır */
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 93px; /* Header yüksekliği */
  padding: 0 20px; /* Sol ve sağ padding */
}

/* Headerın sol kısmı için başlık stili */
.left h1 {
  margin: 0;
  color: #333;
}

/* Headerın sağ kısmı stili */
.right {
  display: flex;
  gap: 10px;
}

/* Buton stili */
.btn {
  padding: 10px 50px;
  cursor: pointer;
  background-color: #d8d8d8fe;
  color: black;
  border: 1px solid #333;
  border-radius: 4px;
}
</style>
