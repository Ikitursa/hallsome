<template>
  <h1>Personnel</h1>
  <div class="container personnel">

    <div class="card list-card">

      <div class="card-header">
        <button class="button-rounded button-add-new" @click="createPerson">Add new</button>
      </div>

      <div class="items-list personnel-list">
        <PersonnelRow v-for="person in personnel" key:="person.id"
                      :person="person"
                      @emitEditPerson="handleEditPerson"
                      @emitDeletePerson="handleDeletePerson"/>
      </div>

    </div>
  </div>
  <PersonnelCreateEdit
      v-if="createEditVisible" :person="currentPerson"
      @closeCreateEdit="createEditVisible = false"
      @reloadData="fetchPersonnel()"
  />
</template>

<script>
import axios from 'axios'
import PersonnelRow from "../components/personnel/PersonnelRow"
import {firebaseObjectToList} from "../helpers/helpers";
import {notify} from "@kyvg/vue3-notification";
import PersonnelCreateEdit from "../components/personnel/PersonnelCreateEdit";

export default {
  name: "Personnel",
  components: {PersonnelCreateEdit, PersonnelRow},
  created() {
    this.fetchPersonnel()
  },
  data: function () {
    return {
      personnel: null,
      currentPerson: null,
      createEditVisible: false,
      //for enabling the delete modal later
      deleteVisible: false
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
    },
    handleEditPerson(person) {
      console.log('person?', person)
      this.currentPerson = person
      this.createEditVisible = true
    },
    handleDeletePerson(personId) {
      //deletes person
      this.currentPerson = personId
      this.deleteVisible = true
    },
    createPerson() {
      //update person
      this.currentPerson = null
      this.createEditVisible = true
    }
  }
}
</script>
