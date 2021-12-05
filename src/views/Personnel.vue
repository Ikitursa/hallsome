<template>
  <h1>Personnel</h1>
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
      :endpoint="personnelEnums.EDIT"
      :itemToDelete="personToEdit"
      @close="deleteModalVisible = false"
      @refresh="fetchPersonnel"
  />
</template>

<script>
import PersonnelRow from "../components/personnel/PersonnelRow"
import {personnelEnums} from "../enums/EntityEnums";
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
      personnelEnums
    }

  },
  computed: {
    personnel() {
      return this.$store.getters.getPersonnel
    }
  },
  methods: {
    fetchPersonnel() {
      this.$store.dispatch('fetchItems', personnelEnums)
    },

    handleEditPerson(person) {
      //edit person
      //person= { id: 'personId, name: 'name', lastName: 'lastName', manager: Boolean }
      this.personToEdit = person
      this.createEditModalVisible = true
    },

    handleDeletePerson(person) {
      //deletes person
      //person = {id: 'personId' , name: 'name lastName'}
      this.personToEdit = person
      this.deleteModalVisible = true
    },

    handleCreatePerson() {
      //create person
      this.personToEdit = null
      this.createEditModalVisible = true
    }
  }
}
</script>
