<template>
  <div class="header-container">
    <header class="header">
      <div class="left">
        <h1>Horse Racing</h1>
      </div>
      <div class="right">
        <button @click="handleGenerateScheduleClick" class="btn">GENERATE PROGRAM</button>
        <button @click="handleStartRaceClick" class="btn">START/PAUSE</button>
      </div>
    </header>
    <!-- Diğer içerikler buraya gelecek -->
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  methods: {
    ...mapActions(['generateHorses', 'startRace']),
    async handleGenerateScheduleClick() {
      try {
        await this.generateHorses();
        await this.startRace(); // Yarış programını da başlat
        console.log('Horses generated and race started successfully!');
      } catch (error) {
        console.error('Error generating horses and starting race:', error);
        alert('Error generating horses and starting race. Please try again later.');
      }
    },

    async handleStartRaceClick() {
      try {
        await this.startRace();
        // Yarış başarıyla tamamlandıktan sonra yapılacak işlemler
      } catch (error) {
        console.error('Error starting race:', error);
        // Hata durumunda yapılacak işlemler
      }
    },
  },
  async mounted() {
    // Sayfa yüklendiğinde atların konumunu ayarlamak için
    try {
      await this.generateHorses();
      await this.startRace();
    } catch (error) {
      console.error('Error initializing horses and race:', error);
    }
  },
};
</script>

<style scoped>
.header-container {
  background-color: #f08080; /* Pembe arka plan */
  width: 100%;
}

.header {
  position: sticky; /* Yapışkan pozisyon */
  top: 0; /* Ekranın en üstüne yapıştır */
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 93px; /* Header yüksekliği */
  padding: 0 20px; /* Sol ve sağ padding */
}

.left h1 {
  margin: 0;
  color: #333;
}

.right {
  display: flex;
  gap: 10px;
}

.btn {
  padding: 10px 50px;
  cursor: pointer;
  background-color: #d8d8d8fe;
  color: black;
  border: 1px solid #333;
  border-radius: 4px;
}
</style>
