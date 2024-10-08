<template>
  <div id="home">
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import { initScene } from "../main";

export default {
  name: "AppHome",
  setup() {
    const canvas = ref(null);

    onMounted(() => {
      initScene(canvas.value);
    });

    return {
      canvas,
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/styles/partials/variables";

#home {
  height: 100vh;
  width: 100%;
  background-color: $color3;
  position: relative;
}

canvas {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
  width: 100%; /* Imposta la larghezza al 100% */
  height: 100%; /* Imposta l'altezza al 100% */
}
</style>
