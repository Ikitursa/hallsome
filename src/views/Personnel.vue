<template>
  <h1>Personnel</h1>
  <div class="container personnel">

    <div class="card list-card">

      <div class="card-header">
        <button class="button-rounded button-add-new">Add new</button>
      </div>

      <div class="items-list personnel-list">
        <PersonnelRow v-for="person in personnel" key:="person.id" :person="person"/>
      </div>

    </div>
  </div>

</template>

<script>
import axios from 'axios'
import PersonnelRow from "../components/personnel/PersonnelRow"
import {firebaseObjectToList} from "../helpers/helpers";

export default {
  name: "Personnel",
  components: {PersonnelRow},
  created() {
    this.fetchPersonnel()
  },
  data: function () {
    return {
      personnel: null,
    }

  },
  methods: {
    fetchPersonnel() {
      const url = process.env.VUE_APP_BASE_URL + '/personnel.json'
      axios.get(url).then(({data, status}) => {

            this.personnel = firebaseObjectToList(data)
          }
      ).catch(error => {
        console.log(error)
      })

    }
  }
}
</script>
