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
import { mapState, mapActions, mapMutations } from 'vuex';

export default {
  computed: {
    ...mapState(['horses', 'raceInterval']),
    raceRunning() {
      return !!this.raceInterval; // Yarış animasyonu çalışıyor mu?
    },
  },
  methods: {
    ...mapActions(['generateHorses', 'startRace', 'updateHorsePosition']),
    ...mapMutations(['SET_RACE_INTERVAL', 'CLEAR_RACE_INTERVAL']),
    async handleGenerateScheduleClick() {
      try {
        await this.generateHorses();
        console.log('Horses generated and race schedule created successfully!');
      } catch (error) {
        console.error('Error generating horses and creating race schedule:', error);
        alert('Error generating horses and creating race schedule. Please try again later.');
      }
    },
    async handleStartRaceClick() {
      if (this.raceRunning) {
        this.pauseRace();
      } else {
        this.startRace();
      }
    },
    async pauseRace() {
      this.CLEAR_RACE_INTERVAL();
      console.log('Race paused.');
    },
    startRace() {
      if (this.horses.length === 0) {
        alert('Please generate horses first.');
        return;
      }

      const interval = setInterval(() => {
        this.horses.forEach(horse => {
          const speed = this.calculateSpeed(horse.condition);
          let newPosition = horse.position + speed;

          // Ensure horses cannot move beyond 305 pixels
          if (newPosition > 305) {
            newPosition = 305;
          }

          this.updateHorsePosition({ horseId: horse.id, position: newPosition });
          console.log(`Horse ${horse.id} has moved ${newPosition.toFixed(2)} pixels.`);
        });

        const allHorsesFinished = this.horses.every(horse => horse.position >= 305);
        if (allHorsesFinished) {
          this.CLEAR_RACE_INTERVAL();
          console.log('Race finished.');
        }
      }, 100); // Animasyon hızı (ms cinsinden)

      this.SET_RACE_INTERVAL(interval);
      console.log('Race started.');
    },
    calculateSpeed(condition) {
      return Math.round(condition / 10); // Koşul değeri / 10
    },
  },
  async mounted() {
    try {
      await this.generateHorses();
    } catch (error) {
      console.error('Error initializing horses and race schedule:', error);
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
