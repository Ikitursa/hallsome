<template>
  <div class="container tables">
    <div class="card list-card">

      <div class="card-header">
        <button class="button-rounded button-add-new" @click="handleCreateTable">Add new</button>
      </div>

      <div class="items-list tables-list">
        <TablesRow v-for="table in tables"
                   :key="table.id"
                   :table="table"
                   @editTable="handleEditTable"
                   @deleteTable="handleDeleteTable"
        />
      </div>

    </div>
  </div>

  <TablesCreateEditModal
      v-if="createEditModalVisible"
      :table="tableToEdit"
      @close="createEditModalVisible = false"
      @refresh="fetchTables"
  />
  <DeleteModal
      v-if="deleteModalVisible"
      :endpoint="tablesConfig.EDIT"
      :itemToDelete="tableToEdit"
      @close="deleteModalVisible = false"
      @refresh="fetchTables"
  />
</template>

<script>

import TablesRow from "../components/tables/TablesRow";
import {tablesConfig} from "../config/EntityConfig";
import TablesCreateEditModal from "../components/tables/TablesCreateEditModal";
import DeleteModal from "../components/layout/DeleteModal";

export default {
  name: "Tables",

  components: {TablesCreateEditModal, TablesRow, DeleteModal},

  created() {
    if (!this.tables) {
      this.fetchTables()
    }
  },

  data: function () {
    return {
      tableToEdit: null,
      createEditModalVisible: false,
      deleteModalVisible: false,
      tablesConfig
    }
  },

  computed: {
    tables() {
      return this.$store.getters.getTables
    }
  },

  methods: {

    fetchTables() {
      this.$store.dispatch('fetchItems', tablesConfig)
    },

    handleEditTable(table) {
      this.tableToEdit = table
      this.createEditModalVisible = true
    },

    handleDeleteTable(table) {
      this.tableToEdit = table
      this.deleteModalVisible = true
    },

    handleCreateTable() {
      this.tableToEdit = null
      this.createEditModalVisible = true
    }
  }

}
</script>