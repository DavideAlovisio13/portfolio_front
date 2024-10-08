<template>
  <div id="navbar-top">
    <nav class="navbar w-100">
      <div id="navbarExampleTransparentExample" >
        <div class="navbar-start d-flex justify-content-center align-items-center">
          <ul class="d-flex">
            <li v-for="(item, index) in menuItems" :key="index">
              <router-link :to="{ name: item.routeName }" class="navbar-item" id="links">
                {{ item.label }}
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "AppHeader",
  setup() {
    return {
      menuItems: [
        {
          label: "Home",
          routeName: "home",
        },
        {
          label: "Projects",
          routeName: "projects",
        },
        {
          label: "About",
          routeName: "about",
        }
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../assets/styles/partials/variables";

#navbar-top {
    position: fixed;
    z-index: 1000;
    top: 0;
    width: 100%;
    .navbar {
        background-color: transparent;
    }
        #links{
        color: $color2;
    }
}


</style>
