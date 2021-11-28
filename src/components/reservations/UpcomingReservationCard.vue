<template>
  <div class="card upcoming-reservation-card" :class="{'high-priority-reservation': reservation.highPriorityGuest}">
    <div class="reservation-info">
      <div class="upcoming-reservation-name">{{ reservation.guest }} ({{reservation.guestCount}})</div>
      <div class="upcoming-reservation-date">{{ reservation.date }}</div>
      <div class="upcoming-reservation-table">{{ reservation.hall }} - {{ reservation.table }}</div>
    </div>
    <div class="upcoming-reservation-hover-actions">
      <div class="reservation-actions">
        <button class="reservation-button">Update</button>
        <button class="reservation-button">Delete</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UpcomingReservationCard",

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