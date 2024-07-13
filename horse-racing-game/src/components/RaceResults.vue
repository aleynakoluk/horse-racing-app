<template>
  <div class="race-result">
    <table>
      <thead>
        <tr>
          <th colspan="2" class="table-title">Result</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(race, index) in raceSchedule" :key="index" class="right-align">
          <td colspan="2" class="race-info">
            <h3>{{ index + 1 }}ST Lab - {{ race.distance }}m</h3>
            <div class="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Position</th>
                    <th>Name</th> <!-- Değişiklik: Horse Name olarak güncellendi -->
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(horse, horseIndex) in race.horses.slice(0, 20).sort((a, b) => b.condition - a.condition)" :key="horseIndex">
                    <td>{{ horseIndex + 1 }}</td>
                    <td >{{ getHorseName(horse.id) }}</td> <!-- getHorseName metodu kullanıldı -->
                  </tr>
                </tbody>
              </table>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  computed: {
    raceSchedule() {
      return this.$store.state.raceSchedule;
    }
  },
  methods: {
    getHorseName(horseId) {
      const names = ["Ekselans", "Herkül", "Prens", "Görkem", "Karamel", "Roswell", "Romeo", "Taffy", "Tekila", "Popcorn", "Sirius", "Uila", "Buddy", "Max", "Black Beauty", "Alfa", "Asalet", "Siyah İnci", "Abanoz", "Prenses"];
      return names[(horseId - 1) % names.length];
    }
  }
};
</script>

<style scoped>
.race-result {
  flex: 1;
  max-width: 180px;
  max-height: 732px;
  overflow-y: auto;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  position: absolute;
  top: 0;
  right: 0;
  margin-top: 90px;
  border: 1px solid #333;
}

.race-result::-webkit-scrollbar {
  width: 12px;
  background-color: #fff;
  border: 1px solid #333;
}

.race-result::-webkit-scrollbar-thumb {
  background-color: #d8d8d8fe;
  border-radius: 6px;
  border: 1px solid #333;
}

.table-title {
  background-color: rgb(90, 220, 90);
  color: black;
  border: 1px solid #333;
  text-align: center;
  padding: 8px;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
}

.race-info {
  text-align: center;
}

.table-container {
  max-height: 748px;
  overflow-y: auto;
  text-align: right;
}

table {
  width: 100%;
  border-collapse: collapse;
  background-color: #fff;
  text-align: center;
}

th, td {
  text-align: center;
  border: 1px solid #ddd;
}

th {
  background-color: #f2f2f2;
}

h3 {
  background-color: #f08080;
  color: black;
  margin: 0;
  position: sticky;
  top: 0;
  z-index: 1;
}
</style>
