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
.race-result {
  flex: 1; /* Esneklik */
  max-width: 180px; /* Maksimum genişlik */
  max-height: 732px; /* Sayfanın yüksekliğinden az bir maksimum yükseklik */
  overflow-y: auto; /* Dikey scrollbar */
  background-color: #fff; /* Arka plan rengi */
  border: 1px solid #ddd; /* Kenarlık */
  border-radius: 4px; /* Köşe yuvarlama */
  position: absolute; /* Mutlak pozisyon */
  top: 0; /* Alt kenara hizala */
  right: 0; /* Sağ kenara hizala */
  margin-top: 90px;
  border: 1px solid #333; /* Kenarlık */

}

.race-result::-webkit-scrollbar {
  width: 12px; /* Scroll bar genişliği */
  background-color: #fff; /* Scroll bar arka plan rengi */
  border: 1px solid #333;
}

.race-result::-webkit-scrollbar-thumb {
  background-color:  #d8d8d8fe; /* Scroll bar rengi */
  border-radius: 6px;
  border: 1px solid #333;
}

.table-title {
  background-color: rgb(90, 220, 90); /* Arka plan rengi */
  color: black;
  border: 1px solid #333;
  text-align: center;
  padding: 8px;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
}

.race-info {
  text-align: center; /* Yarış bilgilerini ortala */
}

.table-container {
  max-height: 748px; /* Maksimum yükseklik */
  overflow-y: auto; /* Dikey scrollbar */
  text-align: right; /* İçeriği sağa hizala */
}

table {
  width: 100%;
  border-collapse: collapse;
  background-color: #fff; /* Tablo arka plan rengi */
  text-align: center;
}

th, td {
  text-align: center; /* İçerikleri merkezi hizalar */
  border: 1px solid #ddd;
}

th {
  background-color: #f2f2f2;
}

h3 {
  background-color: #f08080; /* Arka plan rengi */
  color: black;
  margin: 0;
  position: sticky; /* Sticky pozisyon */
  top: 0; /* En üstte sabitle */
  z-index: 1; /* Z indeksi */
}
</style>
