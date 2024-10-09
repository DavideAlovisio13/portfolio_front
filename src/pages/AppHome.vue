<template>
  <div id="home">
    <canvas ref="canvas"></canvas>
    <div class="d-flex justify-content-center align-items-center content">
      <div class="vh-100 w-50">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Mollitia nemo dolorum nisi! Itaque ipsa quisquam harum quis. Perferendis facere quos error culpa asperiores quisquam ea accusantium, minima itaque id quidem!
      </div>
      <div class="vh-100 w-50 d-flex justify-content-center align-items-center">
      </div>
    </div>
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

  .content {
    position: absolute;
    z-index: 1;
  }

  canvas {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    width: 100%; /* Imposta la larghezza al 100% */
    height: 100%; /* Imposta l'altezza al 100% */
  }
 }
</style>
