<template>
  <MainMenu/>
  <router-view/>
</template>


<script>
import MainMenu from "./components/layout/MainMenu";
export default {
  components: {MainMenu}
}
</script>