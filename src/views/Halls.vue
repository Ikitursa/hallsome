<template>
  <h1>Halls</h1>
  <div class="container halls">

    <div class="card">

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
  methods:{
    fetchHalls() {
      const url = 'https://hallsome-44d13-default-rtdb.europe-west1.firebasedatabase.app/halls.json'
      axios.get(url).then(({data, status}) => {
            const keys = Object.keys(data)

            this.halls = keys.map(key => {

              return {
                ...data[key],
                id: key
              }
            })
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