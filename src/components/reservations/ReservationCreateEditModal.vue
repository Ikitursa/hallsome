<template>
  <div class="backdrop">

    <div class="card update-card card-table-update centered-popup">

      <h3 class="update-card-title">{{ createEditFormTitle }}</h3>

      <div class="update-card-form">

        <form action="" id="hallUpdate">

          <div class="input-wrapper">
            <label class="form-input-label" for="name">Name*</label>
            <input type="text"
                   class="update-form-input"
                   id="name"
                   v-model.trim="formData.guest"
                   :class="{'invalid-input': !formFieldsValidation.guest}"
            >
          </div>

          <div class="input-wrapper">
            <label class="form-input-label" for="number-of-guests">Guest count*</label>
            <input type="number"
                   class="update-form-input"
                   id="number-of-guests"
                   v-model.number="formData.guestCount"
                   :class="{'invalid-input': !formFieldsValidation.guestCount}"
            >
          </div>

          <div class="input-wrapper">
            <label class="form-input-label" for="date">Date*</label>
            <input type="datetime-local"
                   class="update-form-input"
                   id="date"
                   v-model.trim="formData.date"
                   :class="{'invalid-input': !formFieldsValidation.date}"
            >
          </div>

          <div class="input-wrapper dropdown">
            <label for="hall" class="form-input-label">Hall*</label>
            <select class="update-form-input"
                    id="hall"
                    v-model="formData.hall"
                    :class="{'invalid-input': !formFieldsValidation.hall}"
            >
              <option disabled value="">Please select a hall</option>
              <option v-for="hall in fittingHalls">{{ hall }}
              </option>
            </select>
          </div>

          <div class="input-wrapper dropdown">
            <label for="table" class="form-input-label">Table*</label>
            <select class="update-form-input"
                    id="table"
                    v-model="formData.table"
                    :class="{'invalid-input': !formFieldsValidation.table}"
            >
              <option disabled value="">Please select a table</option>
              <option v-for="table in displayedTables"
                      :value="table.name"
              >{{ table.name }} - ({{ table.seats }})
              </option>
            </select>
          </div>

          <div class="input-wrapper checkbox">
            <label class="form-input-label" for="high-priority-reservation">High priority</label>
            <input type="checkbox"
                   class="update-form-input form-checkbox"
                   id="high-priority-reservation"
                   value="frontend"
                   v-model="formData.highPriorityGuest"
            >
          </div>

        </form>

      </div>

      <div class="update-card-actions">
        <button class="button-rounded button-cancel"
                @click="emitCloseCreateEdit">Cancel
        </button>
        <button class="button-rounded button-submit"
                @click="reservationSubmit"
                :disabled="!formIsValid"
        >{{ submitButtonText }}
        </button>
      </div>

    </div>

  </div>
</template>

<script>

import axios from "axios";
import {tablesEnums, reservationsEnums} from "../../enums/EntityEnums";
import {notify} from "@kyvg/vue3-notification";

export default {
  name: "ReservationCreateEditModal",

  props: {
    reservation: {
      required: false,
      type: Object,
      default: null
    }
  },

  data: function () {
    return {
      formData: {
        guest: '',
        hall: '',
        table: '',
        guestCount: '',
        highPriorityGuest: false,
        date: null
      }
    }
  },

  created() {
    if (this.reservation) {
      this.fillReservationData()
    }
    if (!this.tables) {
      this.fetchTables()
    }
  },

  computed: {

    createEditFormTitle() {
      return this.reservation ? 'Edit reservation' : 'Add new reservation'
    },

    tables() {
      return this.$store.getters.getTables
    },

    fittingHalls() {
      return [...new Set(this.fittingTables.map(value => value.location))]
    },

    fittingTables() {
      return this.tables ? this.tables.filter(table =>
          table.seats >= this.formData.guestCount
      ) : []
    },

    displayedTables() {
      return this.fittingTables.filter(table =>
          table.location === this.formData.hall
      );
    },

    submitButtonText() {
      return this.reservation ? 'Update' : 'Submit'
    },

    formFieldsValidation() {
      return {
        guest: !!this.formData.guest,
        hall: !!this.formData.hall,
        table: !!this.formData.table,
        guestCount: this.formData.guestCount > 0,
        date: !!this.formData.date,
      }
    },

    formIsValid() {
      return ![
        this.formFieldsValidation.guest,
        this.formFieldsValidation.hall,
        this.formFieldsValidation.table,
        this.formFieldsValidation.guestCount,
        this.formFieldsValidation.date].some(value => !value)
    }
  },

  methods: {

    fillReservationData() {
      this.formData = {...this.reservation}
    },

    fetchTables() {
      this.$store.dispatch('fetchItems', tablesEnums)
    },

    emitCloseCreateEdit() {
      this.$emit('close')
    },

    refreshNotifyAndClose() {
      notify({
        group: 'notifications',
        title: 'Success',
        text: this.reservation ? `Successfully updated reservation` : `Successfully created reservation`,
        type: 'success',
      })
      this.$emit('refresh')
      this.emitCloseCreateEdit()
    },

    reservationSubmit() {
      if (this.formIsValid) {
        if (this.reservation) {
          this.patchReservation()
        } else {
          this.postReservation()
        }
      } else {
        notify({
          group: 'notifications',
          title: `The ${reservationsEnums.TARGET} form data is invalid`,
          text: 'Please check your inputs',
          type: 'error',
        })
      }
    },

    patchReservation() {
      const url = process.env.VUE_APP_BASE_URL + reservationsEnums.EDIT + this.reservation.id + '.json'
      axios.patch(url, this.formData).then(() => {
            this.refreshNotifyAndClose()
          }
      ).catch(error => {
        notify({
          group: 'notifications',
          title: `The ${reservationsEnums.TARGET} form data could not be updated`,
          text: `${error}`,
          type: 'error',
        })
      })
    },

    postReservation() {
      const url = process.env.VUE_APP_BASE_URL + reservationsEnums.ENDPOINT
      axios.post(url, this.formData).then(() => {
            this.refreshNotifyAndClose()
          }
      ).catch(error => {
        notify({
          group: 'notifications',
          title: `The ${reservationsEnums.TARGET} form data could not be submitted`,
          text: `${error}`,
          type: 'error',
        })
      })
    }
  }
}
</script>