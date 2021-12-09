<template>
  <div class="card upcoming-reservation-card" :class="{'high-priority-reservation': reservation.highPriorityGuest}">

    <div class="reservation-info">
      <div class="upcoming-reservation-name">{{ reservation.guest }} ({{ reservation.guestCount }})</div>
      <div class="upcoming-reservation-date">{{ formattedReservationDate }}</div>
      <div class="upcoming-reservation-table">{{ reservation.hall }} - {{ reservation.table }}</div>
    </div>

    <div class="upcoming-reservation-hover-actions">
      <div class="card reservation-actions">
        <button class="reservation-button" @click="emitEditReservation">Update</button>
        <button class="reservation-button" @click="emitDeleteReservation">Delete</button>
      </div>
    </div>

  </div>
</template>

<script>
import {parseISO, format} from 'date-fns'

export default {
  name: "UpcomingReservationCard",

  emits: ['editReservation', 'deleteReservation'],

  props: {
    reservation: {
      required: true,
      type: Object
    }
  },

  computed: {

    formattedReservationDate() {
      return format(parseISO(this.reservation.date), `dd.MM.yyyy HH:mm'h'`)
    },
  },

  methods: {

    emitEditReservation() {
      this.$emit('editReservation', this.reservation)
    },

    emitDeleteReservation() {
      const name = (this.reservation.guestCount > 1) ? (this.reservation.guestCount + ' guests') : '1 guest'
      this.$emit('deleteReservation', {
        id: this.reservation.id,
        name: `${this.reservation.guest} with ${name}`
      })
    }
  }
}
</script>