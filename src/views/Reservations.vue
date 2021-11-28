<template>
  <h1>Reservations</h1>
  <div class="container reservations">
    <div class="wrapper-reservation-add-new">
      <button class="button-rounded button-add-new">Add new</button>
    </div>
    <h3 class="reservations-header">Upcoming reservations</h3>
    <div class="upcoming-reservations">

      <UpcomingReservationCard v-for="reservation in reservations" key:="reservation.id" :reservation="reservation"/>

    </div>

    <h3 class="reservations-header">Past reservations</h3>

    <div class="card">
      <div class="items-list past-reservations-list">

        <ReservationRow v-for="reservation in reservations" key:="reservation.id" :reservation="reservation"/>

      </div>

    </div>
  </div>
</template>

<script>


import axios from "axios";
import {firebaseObjectToList} from "../helpers/helpers";
import UpcomingReservationCard from "../components/reservations/UpcomingReservationCard";
import ReservationRow from "../components/reservations/ReservationRow";

export default {
  name: 'Reservations',
  components: {ReservationRow, UpcomingReservationCard},
  created() {
    this.fetchReservations()
  },
  data: function () {
    return {
      reservations: null,
    }

  },
  methods: {
    fetchReservations() {
      const url = process.env.VUE_APP_BASE_URL + '/reservations.json'
      axios.get(url).then(({data, status}) => {

            this.reservations = firebaseObjectToList(data)
          }
      ).catch(error => {
        console.log(error)
      })

    }
  }
}
</script>
