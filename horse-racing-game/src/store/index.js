import { createStore } from 'vuex';

export default createStore({
  state: {
    horses: [], // List of horses
    raceSchedule: [], // Race schedule
    raceInterval: null, // Race interval
  },
  mutations: {
    setHorses(state, horses) {
      state.horses = horses; // Set horses to state
    },
    setRaceSchedule(state, schedule) {
      state.raceSchedule = schedule; // Set race schedule to state
    },
    updateHorsePosition(state, { horseId, position }) {
      // Update position of a specific horse
      const horse = state.horses.find(h => h.id === horseId);
      if (horse) {
        horse.position = position;
      }
    },
    resetHorsePositions(state) {
      // Reset positions of all horses
      state.horses.forEach(horse => {
        horse.position = 0;
      });
    },
    SET_RACE_INTERVAL(state, interval) {
      state.raceInterval = interval; // Set race interval to state
    },
    CLEAR_RACE_INTERVAL(state) {
      // Clear race interval
      if (state.raceInterval) {
        clearInterval(state.raceInterval);
        state.raceInterval = null;
      }
    },
  },
  actions: {
    async generateHorses({ commit }) {
      // Generate horses
      const horses = generateHorses(); // Generate new horses
      commit('setHorses', horses); // Save horses to state
      const schedule = generateRaceSchedule(horses); // Generate race schedule
      commit('setRaceSchedule', schedule); // Save race schedule to state
    },
    async startRace({ commit, state }) {
      // Start the race
      commit('resetHorsePositions'); // Reset horse positions
      commit('CLEAR_RACE_INTERVAL'); // Clear current race interval

      // Determine horse speeds based on their conditions
      const horseSpeeds = state.horses.map(horse => calculateSpeed(horse.condition));

      const raceInterval = setInterval(() => {
        state.horses.forEach((horse, index) => {
          const speed = horseSpeeds[index];
          let newPosition = horse.position + speed;

          if (newPosition > 605) {
            newPosition = 605; // Limit maximum position of horses
          }

          commit('updateHorsePosition', { horseId: horse.id, position: newPosition }); // Update horse position
          console.log(`Horse ${horse.id} has moved ${newPosition.toFixed(2)} pixels.`);
        });

        const allHorsesFinished = state.horses.every(horse => horse.position >= 605);
        if (allHorsesFinished) {
          commit('CLEAR_RACE_INTERVAL'); // Stop the race when all horses reach the finish line
          console.log('Race finished.');
        }
      }, 100);

      commit('SET_RACE_INTERVAL', raceInterval); // Save race interval to state
    },
    updateHorsePosition({ commit }, { horseId, position }) {
      // Update position of a specific horse
      commit('updateHorsePosition', { horseId, position });
    },
  },
});

function generateHorses() {
  const horses = [];
  const colors = [
    'Red', 'Green', 'Blue', 'Yellow', 'Purple', 'Orange', 'Pink', 'Brown', 'Cyan', 'Magenta',
    'Lime', 'Olive', 'Navy', 'Teal', 'Maroon', 'Silver', 'Gold', 'Indigo', 'Violet', 'Crimson'
  ];

  for (let i = 1; i <= 20; i++) {
    const color = colors[i - 1]; // Use a fixed color based on index
    horses.push({
      id: i,
      color: color,
      condition: Math.floor(Math.random() * 100) + 1, // Generate a random condition value between 1 and 100
      position: 0,
      image: require(`@/assets/horse${i}.png`), // For horse image
    });
  }
  return horses;
}

function generateRaceSchedule(horses) {
  const distances = [1200, 1400, 1600, 1800, 2000, 2200]; // Define race distances
  const schedule = distances.map(distance => {
    const selectedHorses = [];
    const horseIds = new Set();

    for (let i = 1; i <= 10; i++) {
      let horse;
      do {
        horse = horses[Math.floor(Math.random() * horses.length)]; // Select a random horse
      } while (horseIds.has(horse.id)); // Prevent selecting the same horse again
      selectedHorses.push(horse);
      horseIds.add(horse.id);
    }

    return {
      distance,
      horses: selectedHorses, // Horses participating in the race
    };
  });
  return schedule;
}

function calculateSpeed(condition) {
  return Math.round(condition / 2); // Calculate horse speed based on condition properties
}
