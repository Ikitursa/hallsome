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
      v-if="createEditVisible" :person="personToEdit"
      @close="createEditVisible = false"
      @refresh="fetchPersonnel"
  />
</template>

<script>
import PersonnelRow from "../components/personnel/PersonnelRow"
import {personnelEnums} from "../enums/EntityEnums";
import PersonnelCreateEditModal from "../components/personnel/PersonnelCreateEditModal";

export default {
  name: "Personnel",
  components: {PersonnelCreateEditModal, PersonnelRow},
  created() {
    if(!this.personnel){
      this.fetchPersonnel()
    }
  },
  data: function () {
    return {
      personToEdit: null,
      createEditVisible: false,
      //for enabling the delete modal later
      deleteVisible: false
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
      this.personToEdit = person
      this.createEditVisible = true
    },

    handleDeletePerson(personId) {
      //deletes person
      this.personToEdit = personId
      this.deleteVisible = true
    },

    handleCreatePerson() {
      //create person
      this.personToEdit = null
      this.createEditVisible = true
    }
  }
}
</script>
