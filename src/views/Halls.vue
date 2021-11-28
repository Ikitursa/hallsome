<template>
  <h1>Halls</h1>
  <div class="container halls">

    <div class="card list-card">

      <div class="card-header">
        <button class="button-rounded button-add-new">Add new</button>
      </div>

      <div class="items-list halls-list">
        <HallsRow v-for="hall in halls" key:="hall.id" :hall="hall"/>
      </div>

    </div>
  </div>
</template>

<script>
import HallsRow from "../components/halls/HallsRow";
import axios from "axios";
import {firebaseObjectToList} from "../helpers/helpers";

export default {
  name: "Halls",
  components: {HallsRow},
  created() {
    this.fetchHalls()
  },
  data: function () {
    return {
      halls: null,
    }

  },
  methods: {
    fetchHalls() {
      const url = process.env.VUE_APP_BASE_URL + '/halls.json'
      axios.get(url).then(({data, status}) => {
            this.halls = firebaseObjectToList(data)
          }
      ).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>

<style scoped>

</style>