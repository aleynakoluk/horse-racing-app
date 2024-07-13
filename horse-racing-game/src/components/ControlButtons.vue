<template>
  <!-- Header container -->
  <div class="header-container">
    <!-- Header section -->
    <header class="header">
      <!-- Left part of header -->
      <div class="left">
        <h1>Horse Racing</h1> <!-- Header title -->
      </div>
      <!-- Right part of header -->
      <div class="right">
        <!-- Generate program button -->
        <button @click="handleGenerateScheduleClick" class="btn">GENERATE PROGRAM</button>
        <!-- Start/pause race button -->
        <button @click="handleStartRaceClick" class="btn">START/PAUSE</button>
      </div>
    </header>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';

export default {
  computed: {
    ...mapState(['horses', 'raceInterval']), // Import Vuex state into component
    raceRunning() {
      return !!this.raceInterval; // Check if race animation is running
    },
  },
  methods: {
    ...mapActions(['generateHorses', 'startRace', 'updateHorsePosition']), // Import Vuex actions into component
    ...mapMutations(['SET_RACE_INTERVAL', 'CLEAR_RACE_INTERVAL']), // Import Vuex mutations into component
    async handleGenerateScheduleClick() {
      // Triggered when Generate Program button is clicked
      try {
        await this.generateHorses(); // Generate horses and start the program
        console.log('Horses generated and race schedule created successfully!');
      } catch (error) {
        console.error('Error generating horses and creating race schedule:', error);
        alert('Error generating horses and creating race schedule. Please try again later.');
      }
    },
    async handleStartRaceClick() {
      // Perform these actions when Start/Pause Race button is clicked:
      if (this.raceRunning) {
        this.pauseRace(); // Pause race if running
      } else {
        this.startRace(); // Start race if paused
      }
    },
    async pauseRace() {
      // Pause the race
      this.CLEAR_RACE_INTERVAL(); // Clear race interval
      console.log('Race paused.');
    },
    startRace() {
      // Start the race
      if (this.horses.length === 0) {
        alert('Please generate horses first.'); // Alert if no horses
        return;
      }

      const interval = setInterval(() => {
        this.horses.forEach(horse => {
          const speed = this.calculateSpeed(horse.condition); // Calculate horse speed
          let newPosition = horse.position + speed; // Calculate new position

          // Ensure horses do not move more than 605 pixels
          if (newPosition > 605) {
            newPosition = 605;
          }

          this.updateHorsePosition({ horseId: horse.id, position: newPosition }); // Update horse position
          console.log(`Horse ${horse.id} has moved ${newPosition.toFixed(2)} pixels.`);
        });

        // Finish race if all horses reach the finish line
        const allHorsesFinished = this.horses.every(horse => horse.position >= 605);
        if (allHorsesFinished) {
          this.CLEAR_RACE_INTERVAL(); // Clear race interval
          console.log('Race finished.');
        }
      }, 100); // Update positions every 100 ms

      this.SET_RACE_INTERVAL(interval); // Save race interval in Vuex
      console.log('Race started.');
    },
    calculateSpeed(condition) {
      // Calculate horse speed
      return Math.round(condition / 2); 
    },
  },
  async mounted() {
    // Generate horses when component is mounted
    try {
      await this.generateHorses();
    } catch (error) {
      console.error('Error initializing horses and race schedule:', error);
    }
  },
};
</script>

<style scoped>
/* Header container style */
.header-container {
  background-color: #f08080;
  width: 100%;
}

/* Header style */
.header {
  position: sticky;
  top: 0; /* Stick to the top of the screen */
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 93px; /* Header height */
  padding: 0 20px; /* Left and right padding */
}

/* Style for header title in the left part */
.left h1 {
  margin: 0;
  color: #333;
}

/* Style for the right part of header */
.right {
  display: flex;
  gap: 10px;
}

/* Button style */
.btn {
  padding: 10px 50px;
  cursor: pointer;
  background-color: #d8d8d8fe;
  color: black;
  border: 1px solid #333;
  border-radius: 4px;
}
</style>
