<template>
  <div class="container">
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
                      <th>Horse ID</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(horse, horseIndex) in race.horses.slice(0, 20).sort((a, b) => b.condition - a.condition)" :key="horseIndex">
                      <td>{{ horseIndex + 1 }}</td>
                      <td :style="{ color: horse.color }">Horse {{ horse.id }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    raceSchedule() {
      return this.$store.state.raceSchedule;
    }
  }
};
</script>

<style scoped>

.container {
  font-family: 'Arial, sans-serif';
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: flex-end; /* Sağ üste hizala */
  overflow-y: auto; /* Dikey scrollbar */
  overflow-x: hidden; /* X ekseninde scroll olmasın */
  padding-right: 150px; /* RESULT KISMI İÇİN BOŞLUK BIRAKILDI */
  margin-top: -398px;
}

.container::-webkit-scrollbar {
  width: 12px; /* Scroll bar genişliği */
  background-color: #fff; /* Scroll bar arka plan rengi */
}

.container::-webkit-scrollbar-thumb {
  background-color: #888; /* Scroll bar rengi */
  border-radius: 6px;
}
.race-result {
  margin-top: 0px; /* Tablo arası boşluk */
  overflow-y: auto; /* Dikey scrollbar */
  text-align: right;
  max-height: calc(100vh - 170px); /* Sayfanın tamamından 170 piksel daha az bir maksimum yükseklik */
  border-radius: 4px;
}

.race-result::-webkit-scrollbar {
  width: 12px; /* Scroll bar genişliği */
  background-color: #fff; /* Scroll bar arka plan rengi */
}

.race-result::-webkit-scrollbar-thumb {
  background-color: #888; /* Scroll bar rengi */
  border-radius: 6px;
}
.table-title {
  background-color: blue;
  color: black;
  text-align: center;
  padding: 12px;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
}

.race-info {
  text-align: center;
}

.table-container {
  max-height: 390px;
  overflow-y: auto;
  overflow-x: hidden;
}

table {
  width: 100%;
  border-collapse: collapse;
  background-color: #fff;
  text-align: center;
}

th, td {
  text-align: center;
  padding: 8px;
  border: 1px solid #ddd;
}

th {
  background-color: #f2f2f2;
}

h3 {
  background-color: #f08080;
  color: black;
  padding: 2px;
  margin: 0;
  position: sticky;
  top: 0;
  z-index: 1;
}

.right-align {
  text-align: right;
}
</style>
