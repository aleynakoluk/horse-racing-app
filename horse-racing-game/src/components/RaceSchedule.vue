<template>
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
                    <th>Name</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(horse, horseIndex) in race.horses.slice(0, 20)" :key="horseIndex">
                    <td>{{ horseIndex + 1 }}</td>
                    <td >{{ getHorseName(horse.id) }}</td>
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
      // Replace with your logic to fetch horse name from the names array or elsewhere
      // For example, assuming you have a names array:
      const names = ["Ekselans", "Herkül", "Prens", "Görkem", "Karamel", "Roswell", "Romeo", "Taffy", "Tekila", "Popcorn", "Sirius", "Uila", "Buddy", "Max", "Black Beauty", "Alfa", "Asalet", "Siyah İnci", "Abanoz", "Prenses"];
      // Assuming horseId starts from 1
      return names[horseId - 1 % names.length];
    }
  },
  created() {
    // Fetch race schedule data when component is created
    this.$store.dispatch('fetchRaceSchedule');
  }
};
</script>

<style scoped>
.race-schedule {
  flex: 1;
  max-width: 180px;
  max-height: 732px;
  overflow-y: auto;
  background-color: #fff;
  border: 1px solid #333;
  border-radius: 4px;
  position: absolute;
  top: 0;
  margin-top: 90px;
  right: 138px;
}

.race-schedule::-webkit-scrollbar {
  width: 12px;
  background-color: #fff;
  border: 1px solid #333;
}

.race-schedule::-webkit-scrollbar-thumb {
  background-color:  #d8d8d8fe;
  border-radius: 6px;
  border: 1px solid #333;
}

.table-title {
  background-color: blue;
  color: black;
  border: 1px solid #333;
  text-align: center;
  padding: 9px;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
}

.race-info {
  text-align: center;
}

.table-container {
  text-align: right;
  max-height:  728px;
  overflow-y: auto;
  position: relative;
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
