<template>
  <div class="items-list-row reservations-row">
    <div class="name reservation-name">{{reservation.guest}} ({{reservation.guestCount}}) - {{reservation.hall}}- {{reservation.date}}</div>
    <div class="list-actions">
      <button class="list-button">Delete</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "ReservationRow",

  props: {
    reservation:{
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