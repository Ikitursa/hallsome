<template>
  <div class="backdrop">

    <div class="card update-card card-personnel-update centered-popup">

      <h3 class="update-card-title">{{ createEditFormTitle }}</h3>

      <div class="update-card-form">

        <form action="" id="personnelUpdate">

          <div class="input-wrapper">
            <label class="form-input-label" for="name">Name*</label>
            <input type="text"
                   class="update-form-input"
                   id="name"
                   v-model.trim="formData.name"
                   :class="{'invalid-input': !formFieldsValidation.name}"
            >
          </div>

          <div class="input-wrapper">
            <label class="form-input-label" for="lastName">Last name*</label>
            <input type="text"
                   class="update-form-input"
                   id="lastName"
                   v-model.trim="formData.lastName"
                   :class="{'invalid-input': !formFieldsValidation.lastName}"
            >
          </div>

          <div class="input-wrapper checkbox">
            <label class="form-input-label" for="manager">Manager</label>
            <input type="checkbox"
                   class="update-form-input form-checkbox"
                   id="manager"
                   value="frontend"
                   v-model="formData.manager"
            >
          </div>

        </form>

      </div>

      <div class="update-card-actions">
        <button class="button-rounded button-cancel"
                @click="emitCloseCreateEdit"
        >Cancel
        </button>
        <button
            class="button-rounded button-submit"
            @click="personSubmit"
            :disabled="!formIsValid"
        >{{ submitButtonText }}
        </button>
      </div>

    </div>

  </div>
</template>

<script>
import axios from "axios";
import {personnelConfig} from "../../config/EntityConfig";
import {notify} from "@kyvg/vue3-notification";

export default {
  name: "PersonnelCreateEditModal",

  props: {
    person: {
      required: false,
      type: Object,
      default: null
    }
  },

  data: function () {
    return {
      formData: {
        name: '',
        lastName: '',
        manager: false,
      },
    }
  },

  created() {
    if (this.person) {
      this.fillPersonData()
    }
  },

  computed: {

    createEditFormTitle() {
      return this.person ? 'Edit employee' : 'Add new employee'
    },

    submitButtonText() {
      return this.person ? 'Update' : 'Submit'
    },

    formFieldsValidation() {
      return {
        name: !!this.formData.name,
        lastName: !!this.formData.lastName

      }
    },

    formIsValid() {
      //use [].some for longer checks
      return this.formFieldsValidation.name && this.formFieldsValidation.lastName
    }
  },

  methods: {

    fillPersonData() {
      //works for generating a deep copy for objects without functions
      //the second is for creating a shallow copy which is alright in the current case
      //this.formData = JSON.parse(JSON.stringify(this.person))
      this.formData = {...this.person}
    },

    emitCloseCreateEdit() {
      this.$emit('close')
    },

    refreshNotifyAndClose() {
      notify({
        group: 'notifications',
        title: 'Success',
        text: this.person ? `Successfully updated person` : `Successfully created person`,
        type: 'success',
      })
      this.$emit('refresh')
      this.emitCloseCreateEdit()
    },

    personSubmit() {
      if (this.formIsValid) {
        if (this.person) {
          this.patchPerson()
        } else {
          this.postPerson()
        }
      } else {
        notify({
          group: 'notifications',
          title: `The ${personnelConfig.TARGET} form data is invalid`,
          text: 'Please check your inputs',
          type: 'error',
        })
      }
    },

    patchPerson() {
      const url = process.env.VUE_APP_BASE_URL + personnelConfig.EDIT + this.person.id + '.json'
      axios.patch(url, this.formData).then(() => {
            this.refreshNotifyAndClose()
          }
      ).catch(error => {
        notify({
          group: 'notifications',
          title: `The ${personnelConfig.TARGET} form data could not be updated`,
          text: `${error}`,
          type: 'error',
        })
      })
    },

    postPerson() {
      const url = process.env.VUE_APP_BASE_URL + personnelConfig.ENDPOINT
      axios.post(url, this.formData).then(() => {
            this.refreshNotifyAndClose()
          }
      ).catch(error => {
        notify({
          group: 'notifications',
          title: `The ${personnelConfig.TARGET} form data could not be submitted`,
          text: `${error}`,
          type: 'error',
        })
      })
    },
  }
}
</script>