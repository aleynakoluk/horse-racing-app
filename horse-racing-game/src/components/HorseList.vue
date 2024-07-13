<template>
  <!-- At listesini içeren container divi oluşturma -->
  <div class="container" ref="horseContainer" @scroll="handleScroll">
    <div class="horse-list">
      <table>
        <thead>
          <tr>
            <th colspan="3" class="table-title">Horse List (1-20)</th>
          </tr>       
          <tr>
            <th>Name</th>
            <th>Condition</th>
            <th>Color</th>
          </tr>
        </thead>
        <tbody>
          <!-- Her bir at için bir tablo satır oluşturma-->
          <tr v-for="(horse, index) in displayedHorses" :key="index">
            <td>{{ names[index % names.length] }}</td> 
            <td>{{ horse.condition }}</td>
            <td>
              <span>
                {{ horse.color }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      horsesPerPage: 20, // Her sayfada gösterilecek at sayısı
      scrollOffset: 0, // Kaydırma konumunu takip etmek için offset
      names: ["Ekselans", "Herkül","Prens", "Görkem", "Karamel","Roswell", "Romeo", "Taffy", "Tekila", "Popcorn", "Sirius","Uila", "Buddy", "Max", "Black Beauty", "Alfa", "Asalet", "Siyah İnci", "Abanoz","Prenses"]
    };
  },
  computed: {
    // Vuex store'dan atları getirme
    horses() {
      return this.$store.state.horses.map((horse, index) => ({
        ...horse,
        name: this.names[index % this.names.length]
      }));
    },
    // Görüntülenen atları hesaplama
    displayedHorses() {
      return this.horses.slice(this.scrollOffset, this.scrollOffset + this.horsesPerPage);
    }
  },
  methods: {
    // Başlangıçta atları getirme
    fetchInitialHorses() {
      this.$store.dispatch('generateHorses');
    },
  },
  mounted() {
    // Bileşen yüklendiğinde atları getirme
    this.fetchInitialHorses();
  }
};
</script>

<style scoped>
.container {
  text-align: left;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 10px;
  width: 280px;
  max-width: 200px;
  height: 400px;
  overflow-y: scroll;
  overflow-x: hidden;
  margin-top: 20px;
}

.horse-list::-webkit-scrollbar {
  width: 12px;
  background-color: white;
  border: 1px solid #333;
}

.horse-list::-webkit-scrollbar-thumb {
  background-color: #d8d8d8fe;
  border-radius: 6px;
  border: 1px solid #333;
}

.horse-list {
  overflow-y: scroll;
  overflow-x: hidden;
  background-color: #f8f9fa;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 100%;
  max-height: 100%;
  border: 1px solid #333;
}

.table-title {
  background-color: yellow;
  color: black;
  border: 1px solid #333;
  text-align: center;
  padding: 9px;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  position: sticky;
  top: 0;
  z-index: 1;
  font-size: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  text-align: center;
  padding: 8px;
  border: 1px solid #ddd;
}

th {
  background-color: #f2f2f2;
  border-bottom: 1px solid #ddd;
  width: 33.33%;
}

@media (min-width: 600px) {
  .container {
    max-width: 300px;
    height: 700px;
    padding-left: 20px;
  }

  .table-title {
    font-size: 24px;
  }

  th, td {
    font-size: 16px;
    padding: 7px;
  }
}

@media (max-width: 599px) {
  .container {
    width: 100%;
    height: 100vh;
    padding: 5px;
  }

  .table-title {
    font-size: 18px;
  }

  th, td {
    font-size: 12px;
    padding: 6px;
  }
}
</style>
