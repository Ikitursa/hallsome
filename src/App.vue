<template>
  <MainMenu/>
  <router-view/>
  <notifications
      group="notifications"
      position="bottom right"
      :max="3"
      :speed="500"
  />
</template>


<script>
import MainMenu from "./components/layout/MainMenu";
export default {
  components: {MainMenu}
}
</script>