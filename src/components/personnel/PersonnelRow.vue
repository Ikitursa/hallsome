<template>
  <div class="items-list-row personnel-row">
    <div class="personnel-name">{{person.name}} {{person.lastName}}
      <div v-if="person.manager" class="list-tag">Manager</div>
    </div>
    <div class="list-actions">
      <button class="list-button">Edit</button>
      <button class="list-button">Delete</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "PersonnelRow",

  props: {
    person:{
      required: true,
      type: Object
    }
  },

  data: function () {
    return {}
  },

  created() {
  },

  components: {},

  computed: {},

  methods: {}
}
</script>