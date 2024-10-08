<template>
  <div>
    <nav class="navbar is-transparent">
      <div id="navbarExampleTransparentExample" class="navbar-menu">
        <div class="navbar-start">
          <ul class="d-flex">
            <li v-for="(item, index) in menuItems" :key="index">
              <router-link :to="{ name: item.routeName }" class="navbar-item">
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

<style lang="scss" scoped></style>
