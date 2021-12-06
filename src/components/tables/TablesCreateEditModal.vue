<template>
  <div class="backdrop">
    <div class="card update-card card-table-update centered-popup">
      <h3 class="update-card-title">{{ createEditFormTitle }}</h3>
      <div class="update-card-form">
        <form action="" id="hallUpdate">

          <div class="input-wrapper">
            <label class="form-input-label" for="name">Name*</label>
            <input class="update-form-input" type="text" id="name" v-model.trim="formData.name"
                   :class="{'invalid-input': !formFieldsValidation.name}">
          </div>

          <div class="input-wrapper dropdown">
            <label for="tableLocation" class="form-input-label">Location</label>
            <select id="tableLocation"
                    v-model="formData.location"
                    :class="{'invalid-input': !formFieldsValidation.location}">
              <option disabled value="">Please select a hall</option>
              <option
                  v-for="hall in halls">{{ hall.title }}</option>
            </select>
          </div>
          <div class="input-wrapper">
            <label class="form-input-label" for="number-of-seats">Seats*</label>
            <input class="update-form-input" type="number" id="number-of-seats" v-model.trim="formData.seats"
                   :class="{'invalid-input': !formFieldsValidation.seats}">
          </div>

        </form>
      </div>
      <div class="update-card-actions">
        <button @click="emitCloseCreateEdit" class="button-rounded button-cancel">Cancel</button>
        <button
            @click="tableSubmit"
            class="button-rounded button-submit"
            :disabled="!formIsValid"
        >{{ submitButtonText }}
        </button>
      </div>

    </div>

  </div>
</template>

<script>
import axios from "axios";
import {hallsEnums, tablesEnums} from "../../enums/EntityEnums";
import {notify} from "@kyvg/vue3-notification";

export default {
  name: "TablesCreateEditModal",

  props: {
    table: {
      required: false,
      type: Object,
      default: null
    }
  },

  data: function () {
    return {
      formData: {
        name: '',
        location: '',
        seats: '',
      },
    }
  },

  created() {
    if (this.table) {
      this.fillTableData()
    }
    if (!this.halls) {
      this.fetchHalls()
    }
  },

  components: {},

  computed: {

    createEditFormTitle() {
      return this.table ? 'Edit table' : 'Add new table'
    },

    halls() {
      return this.$store.getters.getHalls
    },

    submitButtonText() {
      return this.table ? 'Update' : 'Submit'
    },

    formFieldsValidation() {
      return {
        name: !!this.formData.name,
        location: !!this.formData.location,
        seats: this.formData.seats > 0

      }
    },
    formIsValid() {
      //use [].some for longer checks
      //it looks silly but this .some(value => !value) on a negative value returns true
      //so it has to be negated
      return ![this.formFieldsValidation.name, this.formFieldsValidation.location, this.formFieldsValidation.seats].some(value => !value)
    }
  },

  methods: {
    fillTableData() {
      this.formData = {...this.table}
    },

    fetchHalls() {
      this.$store.dispatch('fetchItems', hallsEnums)
    },

    emitCloseCreateEdit() {
      this.$emit('close')
    },

    refreshNotifyAndClose() {
      notify({
        group: 'notifications',
        title: 'Success',
        text: this.table ? `Successfully updated table` : `Successfully created table`,
        type: 'success',
      })
      this.$emit('refresh')
      this.emitCloseCreateEdit()
    },

    tableSubmit() {
      if (this.formIsValid) {
        if (this.table) {
          this.patchTable()
        } else {
          this.postTable()
        }
      } else {
        notify({
          group: 'notifications',
          title: `The ${tablesEnums.TARGET} form data is invalid`,
          text: 'Please check your inputs',
          type: 'error',
        })
      }
    },

    patchTable() {
      const url = process.env.VUE_APP_BASE_URL + tablesEnums.EDIT + this.table.id + '.json'
      axios.patch(url, this.formData).then(() => {
            this.refreshNotifyAndClose()
          }
      ).catch(error => {
        notify({
          group: 'notifications',
          title: `The ${tablesEnums.TARGET} form data could not be updated`,
          text: `${error}`,
          type: 'error',
        })
      })
    },
    postTable() {
      const url = process.env.VUE_APP_BASE_URL + tablesEnums.ENDPOINT
      axios.post(url, this.formData).then(() => {
            this.refreshNotifyAndClose()
          }
      ).catch(error => {
        notify({
          group: 'notifications',
          title: `The ${tablesEnums.TARGET} form data could not be submitted`,
          text: `${error}`,
          type: 'error',
        })
      })
    }
  }
}
</script>