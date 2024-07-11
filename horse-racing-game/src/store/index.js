import { createStore } from 'vuex';

function generateHorses() {
  const horses = [];
  for (let i = 1; i <= 20; i++) {
    horses.push({
      id: i,
      color: getRandomColor(),
      condition: Math.floor(Math.random() * 100) + 1,
      position: 0,
      image: require(`@/assets/horse${i}.png`), // Her atın resmini yükler
    });
  }
  return horses;
}

function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function generateRaceSchedule(horses) {
  const distances = [1200, 1400, 1600, 1800, 2000, 2200];
  const schedule = distances.map(distance => {
    const selectedHorses = [];
    const horseIds = new Set();
    while (selectedHorses.length < 10) {
      const horse = horses[Math.floor(Math.random() * horses.length)];
      if (!horseIds.has(horse.id)) {
        selectedHorses.push(horse);
        horseIds.add(horse.id);
      }
    }
    return {
      distance,
      horses: selectedHorses,
    };
  });
  return schedule;
}

export default createStore({
  state: {
    horses: [],
    raceSchedule: [],
    raceResults: [],
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
    addRaceResult(state, result) {
      state.raceResults.push(result);
    },
    clearRaceResults(state) {
      state.raceResults = [];
    },
  },
  actions: {
    generateHorses({ commit }) {
      const horses = generateHorses();
      commit('setHorses', horses);
    },
    startRace({ commit, state }) {
      commit('clearRaceResults');
      const schedule = generateRaceSchedule(state.horses);
      commit('setRaceSchedule', schedule);

      schedule.forEach((race, index) => {
        setTimeout(() => {
          race.horses.forEach(horse => {
            const newPosition = horse.position + Math.random() * 10;
            commit('updateHorsePosition', { horseId: horse.id, position: newPosition });
          });
          const winner = race.horses.reduce((prev, current) => (prev.position > current.position) ? prev : current);
          const result = `Winner: Horse ${winner.id}`;
          commit('addRaceResult', result);
        }, index * 5000); // Her yarışı 5 saniye arayla başlatır
      });
    },
  },
});



