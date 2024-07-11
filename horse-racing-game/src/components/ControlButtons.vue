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

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  background-color: #FF9E8F;
  padding: 10px;
  width: 100vw; /* Sayfanın tam genişliğini alacak şekilde ayarlandı */
}

.title {
  font-size: 24px;
  font-weight: bold;
  color: #333;
  width: 100%; /* Başlık genişliğini tam ekran genişliği olarak ayarladı */
}

.control-buttons {
  display: flex;
  align-items: center;
  width: 100%; /* Kontrol düğmelerinin genişliğini tam ekran genişliği olarak ayarladı */
  justify-content: flex-end; /* Sağa doğru hizalama */
}

.btn {
  margin: 0 10px;
  padding: 10px 20px;
  color: black;
  background-color: grey;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.3s ease;
}

.btn:hover {
  background-color: #666;
}

/* Tablet ve daha büyük cihazlar için */
@media (min-width: 600px) {
  .header {
    height: 60px;
  }

  .title {
    font-size: 28px;
  }

  .btn {
    margin: 0 15px;
    padding: 10px 25px;
    font-size: 16px;
  }
}

/* Mobil cihazlar için */
@media (max-width: 599px) {
  .header {
    flex-direction: column;
    align-items: flex-start;
    height: auto;
  }

  .title {
    font-size: 20px;
    margin-bottom: 10px;
  }

  .control-buttons {
    flex-direction: column;
    align-items: stretch;
    width: 100%;
    justify-content: flex-start; /* Mobilde düğmelerin üst üste gelmesi için */
    margin-right: 5px;
  }

  .btn {
    margin: 5px 0;
    width: 100%;
    text-align: right; /* Mobilde düğmeleri sağa doğru hizala */
  }
}
</style>
