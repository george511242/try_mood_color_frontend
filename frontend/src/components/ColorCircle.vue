<template>
  <v-card class="color-card" elevation="4" rounded="xl">
    <v-card-title class="font-weight-medium text-center">
      Your Color of Today
    </v-card-title>
    <v-card-subtitle class="text-center mb-2">{{ formattedDate }}</v-card-subtitle>

    <v-card-text class="text-center">
      <div class="circle" :style="{ backgroundColor: computedColor }"></div>
      <div class="mood-text mt-4">{{ text || 'No entry yet.' }}</div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "ColorCircle",
  props: {
    date: String,
    color: String,
    text: String,
  },
  computed: {
    formattedDate() {
      return this.date || new Date().toISOString().slice(0, 10);
    },
    computedColor() {
      return this.color?.trim() || "#f39c12";
    },
  },
};
</script>

<style scoped>
.color-card {
  width: 100%;
  max-width: 320px;
  min-height: 350px;
  margin: auto;
  padding: 16px;
  border-radius: 16px;
}

.circle {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  margin: auto;
  border: 2px solid #ddd;
  transition: background-color 0.4s ease-in-out;
}

.mood-text {
  font-size: 16px;
  color: #555;
  margin-top: 12px;
}
</style>
