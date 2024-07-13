import { createStore } from 'vuex';

const LOCAL_STORAGE_KEY = 'horse-racing';

export default createStore({
  state: {
    horses: [],
    raceSchedule: [],
    raceInterval: null,
  },
  mutations: {
    setHorses(state, horses) {
      state.horses = horses;
    },
    setRaceSchedule(state, schedule) {
      state.raceSchedule = schedule;
    },
    updateHorsePosition(state, { horseId, position }) {
      const horse = state.horses.find(h => h.id === horseId);
      if (horse) {
        horse.position = position;
      }
    },
    resetHorsePositions(state) {
      state.horses.forEach(horse => {
        horse.position = 0;
      });
    },
    SET_RACE_INTERVAL(state, interval) {
      state.raceInterval = interval;
    },
    CLEAR_RACE_INTERVAL(state) {
      if (state.raceInterval) {
        clearInterval(state.raceInterval);
        state.raceInterval = null;
      }
    },
  },
  actions: {
    async generateHorses({ commit }) {
      let storedHorses = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
      if (!storedHorses) {
        storedHorses = generateHorses();
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(storedHorses));
      }
      commit('setHorses', storedHorses);
      const schedule = generateRaceSchedule(storedHorses);
      commit('setRaceSchedule', schedule);
    },
    async startRace({ commit, state }) {
      commit('resetHorsePositions');
      commit('CLEAR_RACE_INTERVAL');

      // Determine horse speeds based on their conditions
      const horseSpeeds = state.horses.map(horse => calculateSpeed(horse.condition));

      const raceInterval = setInterval(() => {
        state.horses.forEach((horse, index) => {
          const speed = horseSpeeds[index];
          let newPosition = horse.position + speed;

          // Ensure horses cannot move beyond 305 pixels
          if (newPosition > 305) {
            newPosition = 305;
          }

          commit('updateHorsePosition', { horseId: horse.id, position: newPosition });
          console.log(`Horse ${horse.id} has moved ${newPosition.toFixed(2)} pixels.`);
        });

        const allHorsesFinished = state.horses.every(horse => horse.position >= 305);
        if (allHorsesFinished) {
          commit('CLEAR_RACE_INTERVAL');
          console.log('Race finished.');
        }
      }, 100); // Animasyon hızı (ms cinsinden)

      commit('SET_RACE_INTERVAL', raceInterval);
    },
    updateHorsePosition({ commit }, { horseId, position }) {
      commit('updateHorsePosition', { horseId, position });
    },
  },
});

// Function to generate initial horses
function generateHorses() {
  const horses = [];
  for (let i = 1; i <= 20; i++) {
    horses.push({
      id: i,
      color: getRandomColor(),
      condition: Math.floor(Math.random() * 61) + 40,
      position: 0,
      image: require(`@/assets/horse${i}.png`),
    });
  }
  return horses;
}

// Function to generate race schedule
function generateRaceSchedule(horses) {
  const distances = [1200, 1400, 1600, 1800, 2000, 2200];
  const schedule = distances.map(distance => {
    const selectedHorses = [];
    const horseIds = new Set();

    for (let i = 1; i <= 10; i++) {
      let horse;
      do {
        horse = horses[Math.floor(Math.random() * horses.length)];
      } while (horseIds.has(horse.id));
      selectedHorses.push(horse);
      horseIds.add(horse.id);
    }

    return {
      distance,
      horses: selectedHorses,
    };
  });
  return schedule;
}

// Function to calculate horse speed based on condition
function calculateSpeed(condition) {
  return Math.round(condition / 10);
}

// Function to generate random color
function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
