<template>
  <div class="items-list-row halls-row">

    <div class="name hall-name">{{ hall.title }}
      <Tag :label="hall.manager"/>
    </div>

    <div class="list-actions">
      <button class="list-button" @click="emitEditHall">Edit</button>
      <button class="list-button" @click="emitDeleteHall">Delete</button>
    </div>

  </div>
</template>

<script>
import Tag from "../layout/Tag";

export default {
  name: "HallsRow",

  emits: ['editHall', 'deleteHall'],

  props: {
    hall: {
      required: true,
      type: Object
    }
  },

  components: {Tag},

  methods: {

    emitEditHall() {
      this.$emit('editHall', this.hall)
    },

    emitDeleteHall() {
      this.$emit('deleteHall', {id: this.hall.id, name: this.hall.title})
    }
  }
}
</script>