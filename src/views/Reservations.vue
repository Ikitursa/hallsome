<template>
  <h1>Reservations</h1>
  <div class="container reservations">
    <div class="wrapper-reservation-add-new">
      <button class="button-rounded button-add-new">Add new</button>
    </div>
    <h3 class="reservations-header">Upcoming reservations</h3>
    <div class="upcoming-reservations">

      <div class="upcoming-reservation-card">
        <div class="reservation-info">
          <div class="upcoming-reservation-name">Anny Ann</div>
          <div class="upcoming-reservation-date">30.11.2021. 15:00h</div>
          <div class="upcoming-reservation-table">Party room - Table I</div>
        </div>
        <div class="upcoming-reservation-hover-actions">
          <div class="reservation-actions">
            <button class="reservation-button">Update</button>
            <button class="reservation-button">Delete</button>
          </div>
        </div>
      </div>

      <div class="upcoming-reservation-card high-priority-reservation">
        <div class="reservation-info">
          <div class="upcoming-reservation-name">Anny Ann</div>
          <div class="upcoming-reservation-date">30.11.2021. 15:00h</div>
          <div class="upcoming-reservation-table">Grand hall - Presidential table</div>
        </div>
        <div class="upcoming-reservation-hover-actions">
          <div class="reservation-actions">
            <button class="reservation-button">Update</button>
            <button class="reservation-button">Delete</button>
          </div>
        </div>
      </div>

      <div class="upcoming-reservation-card">
        <div class="reservation-info">
          <div class="upcoming-reservation-name">Anny Ann</div>
          <div class="upcoming-reservation-date">30.11.2021. 15:00h</div>
          <div class="upcoming-reservation-table">Grand hall - Presidential table</div>
        </div>
        <div class="upcoming-reservation-hover-actions">
          <div class="reservation-actions">
            <button class="reservation-button">Update</button>
            <button class="reservation-button">Delete</button>
          </div>
        </div>
      </div>

      <div class="upcoming-reservation-card">
        <div class="reservation-info">
          <div class="upcoming-reservation-name">Anny Ann Anny Long (12)</div>
          <div class="upcoming-reservation-date">30.11.2021. 15:00h</div>
          <div class="upcoming-reservation-table">Party room - Table I</div>
        </div>
        <div class="upcoming-reservation-hover-actions">
          <div class="reservation-actions">
            <button class="reservation-button">Update</button>
            <button class="reservation-button">Delete</button>
          </div>
        </div>
      </div>

      <div class="upcoming-reservation-card">
        <div class="reservation-info">
          <div class="upcoming-reservation-name">Anny Ann</div>
          <div class="upcoming-reservation-date">30.11.2021. 15:00h</div>
          <div class="upcoming-reservation-table">Grand hall - Presidential table</div>
        </div>
        <div class="upcoming-reservation-hover-actions">
          <div class="reservation-actions">
            <button class="reservation-button">Update</button>
            <button class="reservation-button">Delete</button>
          </div>
        </div>
      </div>
    </div>

    <h3 class="reservations-header">Past reservations</h3>

    <div class="card">
      <div class="items-list past-reservations-list">

        <div class="items-list-row reservations-row">
          <div class="name personnel-name">Some Name(7) - Grand hall - Executive table - 01.02.2021. 19:00h</div>
          <div class="list-actions">
            <!--            <button class="list-button">Edit</button>-->
            <button class="list-button">Delete</button>
          </div>
        </div>

        <div class="items-list-row reservations-row">
          <div class="name personnel-name">Some Name(7) - Grand hall - Executive table - 01.02.2021. 19:00h</div>
          <div class="list-actions">
            <!--            <button class="list-button">Edit</button>-->
            <button class="list-button">Delete</button>
          </div>
        </div>

        <div class="items-list-row reservations-row">
          <div class="name personnel-name">Some Name(7) - Grand hall - Executive table - 01.02.2021. 19:00h</div>
          <div class="list-actions">
            <!--            <button class="list-button">Edit</button>-->
            <button class="list-button">Delete</button>
          </div>
        </div>

      </div>

    </div>
  </div>
</template>

<script>


export default {
  name: 'Reservations',
  components: {}
}
</script>
