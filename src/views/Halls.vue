<template>
  <div class="container halls">

    <div class="card list-card">

      <div class="card-header">
        <button class="button-rounded button-add-new" @click="handleCreateHall">Add new</button>
      </div>

      <div class="items-list halls-list">
        <HallsRow v-for="hall in halls"
                  :key="hall.id"
                  :hall="hall"
                  @editHall="handleEditHall"
                  @deleteHall="handleDeleteHall"
        />
      </div>

    </div>
  </div>

  <HallsCreateEditModal
      v-if="createEditModalVisible"
      :hall="hallToEdit"
      @close="createEditModalVisible = false"
      @refresh="fetchHalls"
  />
  <DeleteModal
      v-if="deleteModalVisible"
      :endpoint="hallsConfig.EDIT"
      :itemToDelete="hallToEdit"
      @close="deleteModalVisible = false"
      @refresh="fetchHalls"
  />

</template>

<script>
import HallsRow from "../components/halls/HallsRow";
import {hallsConfig} from "../config/EntityConfig";
import HallsCreateEditModal from "../components/halls/HallsCreateEditModal";
import DeleteModal from "../components/layout/DeleteModal";

export default {
  name: "Halls",

  components: {HallsCreateEditModal, HallsRow, DeleteModal},

  created() {
    if (!this.halls) {
      this.fetchHalls()
    }
  },

  data: function () {
    return {
      hallToEdit: null,
      createEditModalVisible: false,
      deleteModalVisible: false,
      hallsConfig
    }
  },

  computed: {

    halls() {
      return this.$store.getters.getHalls
    }
  },

  methods: {

    fetchHalls() {
      this.$store.dispatch('fetchItems', hallsConfig)
    },

    handleEditHall(hall) {
      this.hallToEdit = hall
      this.createEditModalVisible = true
    },

    handleDeleteHall(hall) {
      this.hallToEdit = hall
      this.deleteModalVisible = true
    },

    handleCreateHall() {
      this.hallToEdit = null
      this.createEditModalVisible = true
    }
  }
}
</script>