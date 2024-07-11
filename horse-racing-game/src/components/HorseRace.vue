<template>
      <div class="race-track">
        <div v-for="horse in horses" :key="horse.id" class="horse" :style="{ left: horse.position + '%' }">
          <img :src="horse.image" alt="Horse" class="horse-img" :style="{ filter: 'hue-rotate(' + horse.hueRotate + 'deg)' }" />
        </div>
        <div class="winner" v-if="winner !== null">
          Winner: Horse {{ winner }}
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

  
  .race-track {
    position: relative;
    width: 100%;
    height: 300px;
    margin-bottom: 20px;
  }
  
  .race-track-img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  
  .horse {
    position: absolute;
    bottom: 10px;
  }
  
  .horse-img {
    width: 50px; /* Ayarlamak gerekiyorsa boyutu değiştirin */
  }
  
  .winner {
    position: absolute;
    bottom: 20px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 18px;
    font-weight: bold;
    color: green;
  }
  </style>
  
  