<template>
  <div class="items-list-row tables-row">
    <div class="name table-name">{{table.location}} - {{table.name}}
      <Tag :label="table.seats"/>
    </div>
    <div class="list-actions">
      <button class="list-button">Edit</button>
      <button class="list-button">Delete</button>
    </div>
  </div>
</template>

<script>
import Tag from "../layout/Tag";
export default {
  name: "TablesRow",

  props: {
    table:{
      required: true,
      type: Object
    }
  },

  data: function () {
    return {}
  },

  created() {
  },

  components: {Tag},

  computed: {},

  methods: {}
}
</script>