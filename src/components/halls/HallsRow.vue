<template>
  <div class="items-list-row halls-row">
    <div class="name hall-name">{{hall.title}}
      <div class="list-tag">{{ hall.manager }}</div>
    </div>
    <div class="list-actions">
      <button class="list-button">Edit</button>
      <button class="list-button">Delete</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "HallsRow",

  props: {
    hall:{
      required: true,
      type: Object
    }},

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