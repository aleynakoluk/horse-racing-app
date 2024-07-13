import { createStore } from 'vuex';

const LOCAL_STORAGE_KEY = 'storage';
const COLOR_STORAGE_KEY = 'horses-colors';

export default createStore({
  state: {
    horses: [], // Atların listesi
    raceSchedule: [], // Yarış programı
    raceInterval: null, // Yarış intervali
  },
  mutations: {
    setHorses(state, horses) {
      state.horses = horses; // Atları state'e ayarlama
    },
    setRaceSchedule(state, schedule) {
      state.raceSchedule = schedule; // Yarış programını state'e ayarlama
    },
    updateHorsePosition(state, { horseId, position }) {
      // Belirli bir atın pozisyonunu güncelleme
      const horse = state.horses.find(h => h.id === horseId);
      if (horse) {
        horse.position = position;
      }
    },
    resetHorsePositions(state) {
      // Tüm atların pozisyonunu sıfırlama
      state.horses.forEach(horse => {
        horse.position = 0;
      });
    },
    SET_RACE_INTERVAL(state, interval) {
      state.raceInterval = interval; // Yarış intervalini duruma ayarlama
    },
    CLEAR_RACE_INTERVAL(state) {
      // Yarış intervalini temizleme
      if (state.raceInterval) {
        clearInterval(state.raceInterval);
        state.raceInterval = null;
      }
    },
  },
  actions: {
    async generateHorses({ commit }) {
      // Atları oluşturma ve yerel depolamadan yükleme
      let storedHorses = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
      let storedColors = JSON.parse(localStorage.getItem(COLOR_STORAGE_KEY));
      
      if (!storedHorses || !storedColors) {
        storedHorses = generateHorses(); // Yeni atlar oluşturma
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(storedHorses)); // Atları local depolamaya kaydetme
        localStorage.setItem(COLOR_STORAGE_KEY, JSON.stringify(storedHorses.map(horse => horse.color))); // Renkleri local depolamaya kaydetme
      }
      commit('setHorses', storedHorses); // Atları state'e kaydet
      const schedule = generateRaceSchedule(storedHorses); // Yarış programı oluşturma
      commit('setRaceSchedule', schedule); // Yarış programını duruma kaydetme
    },
    async startRace({ commit, state }) {
      // Yarışı başlatma
      commit('resetHorsePositions'); // Atların pozisyonlarını sıfırlama
      commit('CLEAR_RACE_INTERVAL'); // Mevcut yarışı durdurma

      // Atların hızlarını durumlarına göre belirleme
      const horseSpeeds = state.horses.map(horse => calculateSpeed(horse.condition));

      const raceInterval = setInterval(() => {
        state.horses.forEach((horse, index) => {
          const speed = horseSpeeds[index];
          let newPosition = horse.position + speed;

          if (newPosition > 605) {
            newPosition = 605; // Atların maksimum pozisyonunu sınırlama
          }

          commit('updateHorsePosition', { horseId: horse.id, position: newPosition }); // Atın pozisyonunu güncelleme
          console.log(`Horse ${horse.id} has moved ${newPosition.toFixed(2)} pixels.`);
        });

        const allHorsesFinished = state.horses.every(horse => horse.position >= 605);
        if (allHorsesFinished) {
          commit('CLEAR_RACE_INTERVAL'); // Tüm atlar bitiş çizgisine ulaştığında yarışı durdurma
          console.log('Race finished.');
        }
      }, 100);

      commit('SET_RACE_INTERVAL', raceInterval); // Yarış intervalini duruma kaydetme
    },
    updateHorsePosition({ commit }, { horseId, position }) {
      // Belirli bir atın pozisyonunu güncelleme
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
    const color = colors.splice(Math.floor(Math.random() * colors.length), 1)[0]; // Rastgele renk seçme
    horses.push({
      id: i,
      color: color,
      condition: Math.floor(Math.random() * 100) + 1, // 1 ile 100 arasında rastgele bir condition değeri oluşturma
      position: 0,
      image: require(`@/assets/horse${i}.png`), // At resmi için
    });
  }
  return horses;
}

function generateRaceSchedule(horses) {
  const distances = [1200, 1400, 1600, 1800, 2000, 2200]; // Yarış mesafelerini belirlene
  const schedule = distances.map(distance => {
    const selectedHorses = [];
    const horseIds = new Set();

    for (let i = 1; i <= 10; i++) {
      let horse;
      do {
        horse = horses[Math.floor(Math.random() * horses.length)]; // Rastgele at seçme
      } while (horseIds.has(horse.id)); // Aynı atı tekrar seçmeyi önleme
      selectedHorses.push(horse);
      horseIds.add(horse.id);
    }

    return {
      distance,
      horses: selectedHorses, // Yarışa katılacak atlar
    };
  });
  return schedule;
}

function calculateSpeed(condition) {
  return Math.round(condition / 2); // Atın hızını condition özelliklerine göre hesapla
}
