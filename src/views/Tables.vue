<template>
<h1>Tables</h1>
  <div class="container tables">

    <div class="card">

      <div class="card-header">
        <button class="button-rounded button-add-new">Add new</button>
      </div>

      <div class="items-list tables-list">
        <TablesRow v-for="table in tables" key:="table.id" :table="table"/>
      </div>

    </div>
  </div>
</template>

<script>
import axios from "axios";
import {firebaseObjectToList} from "../helpers/helpers";
import TablesRow from "../components/tables/TablesRow";

export default {
  name: "Tables",
  components: {TablesRow},
  created() {
    this.fetchTables()
  },
  data: function () {
    return {
      tables: null,
    }

  },
  methods: {
    fetchTables() {
      const url = process.env.VUE_APP_BASE_URL + '/tables.json'
      axios.get(url).then(({data, status}) => {

            this.tables = firebaseObjectToList(data)
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