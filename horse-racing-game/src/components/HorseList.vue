<template>
  <div class="container" ref="horseContainer" @scroll="handleScroll">
    <div class="horse-list">
      <table>
        <thead>
          <tr>
            <th colspan="3" class="table-title">Horse List (1-20)</th>
          </tr>
          <tr>
            <th>Number</th>
            <th>Condition</th>
            <th>Color</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(horse, index) in displayedHorses" :key="index">
            <td>{{ horse.id }}</td>
            <td>{{ horse.condition }}</td>
            <td>
              <span :style="{ color: horse.color }">
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
      horsesPerPage: 20,
      scrollOffset: 0
    };
  },
  computed: {
    horses() {
      return this.$store.state.horses;
    },
    displayedHorses() {
      return this.horses.slice(this.scrollOffset, this.scrollOffset + this.horsesPerPage);
    }
  },
  methods: {
    handleScroll() {
      const container = this.$refs.horseContainer;
      // Calculate scroll position
      const scrollPosition = container.scrollTop + container.clientHeight;
      // Check if scrolled to the bottom
      if (scrollPosition >= container.scrollHeight) {
        // Load more horses
        this.scrollOffset += this.horsesPerPage;
      }
    },
    fetchInitialHorses() {
      this.$store.dispatch('generateHorses');
    }
  },
  mounted() {
    this.fetchInitialHorses();
  }
};
</script>

<style scoped>
.container {
  text-align: left;
  font-family: 'Arial, sans-serif';
  background: grey;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  padding: 10px;
  width: 300px;
  height: 400px;
  overflow-y: scroll; /* Scroll bar her zaman görünür */
  overflow-x: hidden; /* X ekseninde scroll olmaması için */
}

.container::-webkit-scrollbar {
  width: 12px; /* Scroll bar genişliği */
}

.container::-webkit-scrollbar-thumb {
  background-color: #888; /* Scroll bar rengi */
  border-radius: 6px;
  opacity: 1; /* Scroll bar her zaman görünür */
}

.container:hover::-webkit-scrollbar-thumb {
  background-color: transparent; /* Fare ile üzerine gelince kaybolur */
}

.horse-list {
  overflow-y: scroll; /* Dikey scrollbar */
  overflow-x: hidden; /* X ekseninde scroll olmaması için */
  background-color: #f8f9fa; /* Arka plan rengi */
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 100%;
  max-height: 100%; /* Container'ın yüksekliğine uygun */
}

.horse-list::-webkit-scrollbar {
  width: 12px; /* Scroll bar genişliği */
}

.horse-list::-webkit-scrollbar-thumb {
  background-color: #888; /* Scroll bar rengi */
  border-radius: 6px;
  opacity: 1; /* Scroll bar her zaman görünür */
}

.table-title {
  background-color: yellow; /* Başlık arka plan rengi */
  color: #333;
  text-align: center;
  padding: 8px 16px;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  position: sticky; /* Sticky pozisyon */
  top: 0; /* En üstte sabitle */
  z-index: 1; /* Z indeksi */
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  text-align: left;
  padding: 8px;
  border: 1px solid #ddd;
}

th {
  background-color: #f2f2f2;
  border-bottom: 1px solid #ddd;
}
</style>
