<template>
  <div class="container reservations">

    <div class="wrapper-reservation-add-new">
      <button class="button-rounded button-add-new" @click="handleCreateReservation">Add new</button>
    </div>

    <h3 class="reservations-header">Upcoming reservations</h3>

    <div class="upcoming-reservations">
      <UpcomingReservationCard v-for="reservation in upcomingReservations"
                               :key="reservation.id"
                               :reservation="reservation"
                               @editReservation="handleEditReservation"
                               @deleteReservation="handleDeleteReservation"
      />
    </div>

    <h3 class="reservations-header">Past reservations</h3>

    <div class="card list-card">
      <div class="items-list past-reservations-list">

        <ReservationRow v-for="reservation in pastReservations"
                        :key="reservation.id"
                        :reservation="reservation"
                        @deleteReservation="handleDeleteReservation"
        />

      </div>
    </div>

  </div>

  <ReservationCreateEditModal
      v-if="createEditModalVisible"
      :reservation="reservationToEdit"
      @close="createEditModalVisible = false"
      @refresh="fetchReservations"
  />

  <DeleteModal
      v-if="deleteModalVisible"
      :endpoint="reservationsEnums.EDIT"
      :itemToDelete="reservationToEdit"
      @close="deleteModalVisible = false"
      @refresh="fetchReservations"
  />
</template>

<script>

import UpcomingReservationCard from "../components/reservations/UpcomingReservationCard";
import ReservationRow from "../components/reservations/ReservationRow";
import {reservationsEnums} from "../enums/EntityEnums";
import ReservationCreateEditModal from "../components/reservations/ReservationCreateEditModal";
import DeleteModal from "../components/layout/DeleteModal";
import {parseISO, isFuture} from 'date-fns'

export default {
  name: 'Reservations',

  components: {ReservationCreateEditModal, ReservationRow, UpcomingReservationCard, DeleteModal},

  created() {
    if (!this.reservations) {
      this.fetchReservations()
    }
  },

  data: function () {
    return {
      reservationToEdit: null,
      createEditModalVisible: false,
      deleteModalVisible: false,
      reservationsEnums
    }
  },

  computed: {

    reservations() {
      return this.$store.getters.getReservations
    },

    upcomingReservations() {
      return this.reservations ? this.reservations.filter(reservation =>
          isFuture(parseISO(reservation.date))
      ) : []
    },

    pastReservations() {

      return this.reservations ? this.reservations.filter(reservation =>
          !isFuture(parseISO(reservation.date))
      ) : []
    },
  },

  methods: {

    fetchReservations() {
      this.$store.dispatch('fetchItems', reservationsEnums
      )
    },

    handleEditReservation(reservation) {
      this.reservationToEdit = reservation
      this.createEditModalVisible = true
    },

    handleDeleteReservation(reservation) {
      this.reservationToEdit = reservation
      this.deleteModalVisible = true
    },

    handleCreateReservation() {
      this.reservationToEdit = null
      this.createEditModalVisible = true
    }
  }
}
</script>
