<template>
  <div class="items-list-row reservations-row">

    <div class="name reservation-name">{{ reservation.guest }} ({{ reservation.guestCount }}) - {{ reservation.hall }}-
      {{ reservation.table }} - {{ formattedReservationDate }}
    </div>

    <div class="list-actions">
      <button class="list-button" @click="emitDeleteReservation">Delete</button>
    </div>

  </div>
</template>

<script>
import {parseISO, format} from 'date-fns'

export default {
  name: "ReservationRow",

  emits: ['deleteReservation'],

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