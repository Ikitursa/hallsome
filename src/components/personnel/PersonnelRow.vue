<template>
  <div class="items-list-row personnel-row">
    <div class="name personnel-name">{{person.name}} {{person.lastName}}
      <Tag v-if="person.manager" :label="tagLabel"/>
    </div>
    <div class="list-actions">
      <button class="list-button" @click="emitEditPerson">Edit</button>
      <button class="list-button" @click="emitDeletePerson">Delete</button>
    </div>
  </div>
</template>

<script>
import Tag from "../layout/Tag";
export default {
  name: "PersonnelRow",
  emits: ['editPerson','deletePerson'],
  props: {
    person:{
      required: true,
      type: Object
    }
  },

  data: function () {
    return {
      tagLabel:'Manager'
    }
  },

  created() {
  },

  components: {Tag},

  computed: {},

  methods: {
    emitEditPerson() {
      this.$emit('editPerson', this.person)
    },
    emitDeletePerson() {
      this.$emit('deletePerson', this.person.id)
    }
  }
}
</script>