import { createStore } from 'vuex';

// Atları oluşturacak fonksiyon
function generateHorses() {
  const horses = [];
  for (let i = 1; i <= 20; i++) {
    horses.push({
      id: i,
      color: getRandomColor(),
      condition: Math.floor(Math.random() * 100) + 1,
      position: 0,
      image: require(`@/assets/horse${i}.png`), // ` karakteri eklenmiş
    });
  }
  return horses;
}

// Rastgele renk oluşturacak fonksiyon
function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Yerel depolama anahtarları
const LOCAL_STORAGE_KEY = 'horse-racing-game';

// Yarış programını oluşturacak fonksiyon
function generateRaceSchedule(horses) {
  const distances = [1200, 1400, 1600, 1800, 2000, 2200];
  const schedule = distances.map(distance => {
    const selectedHorses = [];
    const horseIds = new Set();

    // 10 at seçmek için döngü
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
      // Önce yerel depolamadan atları al
      const storedHorses = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
      if (storedHorses) {
        commit('setHorses', storedHorses);
      } else {
        // Yerel depolamada atlar yoksa yeni atlar oluştur
        const horses = generateHorses();
        commit('setHorses', horses);
        // Oluşturulan atları yerel depolamaya kaydet
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(horses));
      }
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
