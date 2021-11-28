<template>
  <h1>Personnel</h1>
  <div class="container personnel">

    <div class="card">

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
      const url = 'https://hallsome-44d13-default-rtdb.europe-west1.firebasedatabase.app/personnel.json'
      axios.get(url).then(({data, status}) => {
            const keys = Object.keys(data)

            this.personnel = keys.map(key => {
              // const dataValueAtKey = data[key]
              // dataValueAtKey.id = key
              // return dataValueAtKey

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
