<script setup>
const p = 5
</script>

<template lang="pug">
.flex.flex-col.gap-4
  .text-2xl Welcome!
  button.p-2.shadow-lg.bg-dark-200 Create a session
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
