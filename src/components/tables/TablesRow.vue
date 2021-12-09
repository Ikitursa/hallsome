<template>
  <div class="items-list-row tables-row">

    <div class="name table-name">{{ table.location }} - {{ table.name }}
      <Tag :label="table.seats"/>
    </div>

    <div class="list-actions">
      <button class="list-button" @click="emitEditTable">Edit</button>
      <button class="list-button" @click="emitDeleteTable">Delete</button>
    </div>

  </div>
</template>

<script>
import Tag from "../layout/Tag";

export default {
  name: "TablesRow",

  emits: ['editTable', 'deleteTable'],

  props: {
    table: {
      required: true,
      type: Object
    }
  },

  components: {Tag},

  methods: {

    emitEditTable() {
      this.$emit('editTable', this.table)
    },
    emitDeleteTable() {
      this.$emit('deleteTable', {id: this.table.id, name: `${this.table.location} - ${this.table.name}`})
    }
  }
}
</script>