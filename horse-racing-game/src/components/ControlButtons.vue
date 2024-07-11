<template>
  <header class="header">
    <div class="title">Horse Racing</div>
    <div class="control-buttons">
      <button @click="generateHorses" class="btn">Generate Horses</button>
      <button @click="startRace" class="btn">Start Race</button>
    </div>
  </header>
</template>

<script>
export default {
  methods: {
    generateHorses() {
      this.$store.dispatch('generateHorses');
    },
    startRace() {
      this.$store.dispatch('startRace');
    },
  },
};
</script>

<style scoped>
.container {
  text-align: center;
  margin: 20px;
  font-family: 'Arial, sans-serif';
  min-height: 100vh;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  background-color: #FF9E8F;
  height: 40px;
}

.title {
  font-size: 24px;
  font-weight: bold;
  color: #333;
}

.control-buttons {
  display: flex;
  align-items: center;
}

.btn {
  margin: 0 10px;
  padding: 10px 20px;
  color: black;
  background-color: grey;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  padding: 2px 10px; /* Buton boyutunu küçült */
  font-size: 14px; /* Buton yazı boyutunu küçült */
  border-radius: 3px; /* Köşe yuvarlaklığını azalt */
  transition: background-color 0.3s ease;
}

.btn:hover {
  background-color: grey;
}


</style>
