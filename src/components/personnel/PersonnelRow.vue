<template>
  <div class="items-list-row personnel-row">
    <div class="name personnel-name">{{person.name}} {{person.lastName}}
      <Tag v-if="person.manager" :label="tagLabel"/>
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
  name: "PersonnelRow",

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

  methods: {}
}
</script>