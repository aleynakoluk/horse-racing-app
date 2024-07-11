<template>
  <div class="container">
    <div class="race-schedule">
      <table>
        <thead>
          <tr>
            <th colspan="2" class="table-title">Program</th>
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
                    <tr v-for="(horse, horseIndex) in race.horses.slice(0, 20)" :key="horseIndex">
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

.race-schedule {
  margin-top: 0px; /* Tablo arası boşluk */
  overflow-y: auto; /* Dikey scrollbar */
  text-align: right;
  max-height: calc(100vh - 170px); /* Sayfanın tamamından 170 piksel daha az bir maksimum yükseklik */
  border-radius: 4px;
}

.race-schedule::-webkit-scrollbar {
  width: 12px; /* Scroll bar genişliği */
  background-color: #fff; /* Scroll bar arka plan rengi */
}

.race-schedule::-webkit-scrollbar-thumb {
  background-color: #888; /* Scroll bar rengi */
  border-radius: 6px;
}

.table-title {
  background-color: blue; /* Arka plan rengi */
  color: black;
  text-align: center;
  padding: 12px;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
}

.race-info {
  text-align: center; /* Yarış bilgilerini ortala */
}

.table-container {
  max-height: 390px; /* Maksimum yükseklik */
  overflow-y: auto; /* Dikey scrollbar */
  overflow-x: hidden; /* X ekseninde scroll olmasın */
}

.table-container::-webkit-scrollbar {
  width: 12px; /* Scroll bar genişliği */
  background-color: #fff; /* Scroll bar arka plan rengi */
}

.table-container::-webkit-scrollbar-thumb {
  background-color: #888; /* Scroll bar rengi */
  border-radius: 6px;
}

table {
  width: 100%;
  border-collapse: collapse;
  background-color: #fff; /* Tablo arka plan rengi */
  text-align: center;
}

th, td {
  text-align: center; 
  padding: 0px;
  border: 1px solid #ddd;
  white-space: nowrap; /* Uzun içerikler için satır sonu kırılmasını önle */
}

th {
  background-color: #f2f2f2;
}

h3 {
  background-color: #f08080; /* Arka plan rengi */
  color: black;
  padding: 2px;
  margin: 0;
  position: sticky; /* Sticky pozisyon */
  top: 0; /* En üstte sabitle */
  z-index: 1; /* Z indeksi */
}

.right-align {
  text-align: center; 
}
</style>
