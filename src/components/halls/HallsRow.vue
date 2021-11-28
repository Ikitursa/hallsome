<template>
  <div class="items-list-row halls-row">
    <div class="name hall-name">{{hall.title}}
      <Tag :label="hall.manager"/>
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

  components: {Tag},

  computed: {},

  methods: {}
}
</script>