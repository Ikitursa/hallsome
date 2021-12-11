<template>
  <div class="container personnel">

    <div class="card list-card">

      <div class="card-header">
        <button class="button-rounded button-add-new" @click="handleCreatePerson">Add new</button>
      </div>

      <div class="items-list personnel-list">
        <PersonnelRow
            v-for="person in personnel" :key="person.id"
            :person="person"
            @editPerson="handleEditPerson"
            @deletePerson="handleDeletePerson"/>
      </div>

    </div>

  </div>

  <PersonnelCreateEditModal
      v-if="createEditModalVisible"
      :person="personToEdit"
      @close="createEditModalVisible = false"
      @refresh="fetchPersonnel"
  />
  <DeleteModal
      v-if="deleteModalVisible"
      :endpoint="personnelConfig.EDIT"
      :itemToDelete="personToEdit"
      @close="deleteModalVisible = false"
      @refresh="fetchPersonnel"
  />

</template>

<script>
import PersonnelRow from "../components/personnel/PersonnelRow"
import {personnelConfig} from "../config/EntityConfig";
import PersonnelCreateEditModal from "../components/personnel/PersonnelCreateEditModal";
import DeleteModal from "../components/layout/DeleteModal";

export default {
  name: "Personnel",

  components: {PersonnelCreateEditModal, PersonnelRow, DeleteModal},

  created() {
    if (!this.personnel) {
      this.fetchPersonnel()
    }
  },

  data: function () {
    return {
      personToEdit: null,
      createEditModalVisible: false,
      deleteModalVisible: false,
      personnelConfig
    }
  },

  computed: {
    personnel() {
      return this.$store.getters.getPersonnel
    }
  },

  methods: {

    fetchPersonnel() {
      this.$store.dispatch('fetchItems', personnelConfig)
    },

    handleEditPerson(person) {
      this.personToEdit = person
      this.createEditModalVisible = true
    },

    handleDeletePerson(person) {
      this.personToEdit = person
      this.deleteModalVisible = true
    },

    handleCreatePerson() {
      this.personToEdit = null
      this.createEditModalVisible = true
    }
  }
}
</script>
