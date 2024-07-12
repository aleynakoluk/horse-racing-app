import { createStore } from 'vuex';

const LOCAL_STORAGE_KEY = 'horse-racing-game';

export default createStore({
  state: {
    horses: [],
    raceSchedule: [],
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
      commit('resetHorsePositions'); // Atların pozisyonlarını sıfırla
      const schedule = generateRaceSchedule(state.horses);
      commit('setRaceSchedule', schedule);

      await new Promise(resolve => {
        schedule.forEach((race, index) => {
          setTimeout(() => {
            race.horses.forEach(horse => {
              const newPosition = horse.position + Math.random() * 10;
              commit('updateHorsePosition', { horseId: horse.id, position: newPosition });
            });
            if (index === schedule.length - 1) {
              resolve(); // Yarışlar tamamlandığında promise'ı resolve et
            }
          }, index * 5000);
        });
      });

      setTimeout(() => {
        commit('resetHorsePositions'); // Atların yeniden başa dönmesi için pozisyonları sıfırla
      }, schedule.length * 5000); // Yarışların tamamının bitmesini bekleyip atları sıfırla
    },
  }
});

function generateHorses() {
  const horses = [];
  for (let i = 1; i <= 20; i++) {
    horses.push({
      id: i,
      color: getRandomColor(),
      condition: Math.floor(Math.random() * 100) + 1,
      position: 0,
      image: require(`@/assets/horse${i}.png`),
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
