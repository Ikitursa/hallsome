<template>
  <div class="backdrop">
    <div class="card update-card card-table-update centered-popup">
      <h3 class="update-card-title">{{ createEditFormTitle }}</h3>
      <div class="update-card-form">
        <form action="" id="hallUpdate">

          <div class="input-wrapper">
            <label class="form-input-label" for="name">Name*</label>
            <input class="update-form-input" type="text" id="name" v-model.trim="formData.title"
                   :class="{'invalid-input': !formFieldsValidation.title}">
          </div>

          <div class="input-wrapper dropdown">
            <label for="manager" class="form-input-label">Manager</label>
            <select id="manager"
                    v-model="formData.manager"
                    :class="{'invalid-input': !formFieldsValidation.manager}">
              <option disabled value="">Please select a manager</option>
              <option v-for="manager in managers">{{ manager.name }} {{ manager.lastName }}
              </option>
            </select>
          </div>

        </form>
      </div>
      <div class="update-card-actions">
        <button @click="emitCloseCreateEdit" class="button-rounded button-cancel">Cancel</button>
        <button
            @click="hallSubmit"
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
import {hallsEnums, personnelEnums} from "../../enums/EntityEnums";
import {notify} from "@kyvg/vue3-notification";

export default {
  title: "HallsCreateEditModal",

  props: {
    hall: {
      required: false,
      type: Object,
      default: null
    }
  },

  data: function () {
    return {
      formData: {
        title: '',
        manager: '',
      },
    }
  },

  created() {
    if (this.hall) {
      this.fillHallData()
    }
    if (!this.personnel) {
      this.fetchPersonnel()
    }
  },

  components: {},

  computed: {
    createEditFormTitle() {
      return this.hall ? 'Edit hall' : 'Add new hall'
    },

    personnel() {
      return this.$store.getters.getPersonnel
    },
    managers() {
      return this.personnel.filter(person =>
          person.manager
      );
    },

    submitButtonText() {
      return this.hall ? 'Update' : 'Submit'
    },

    formFieldsValidation() {
      return {
        title: !!this.formData.title,
        manager: !!this.formData.manager,

      }
    },
    formIsValid() {
      return this.formFieldsValidation.title && this.formFieldsValidation.manager
    }
  },

  methods: {
    fillHallData() {
      this.formData = {...this.hall}
    },

    fetchPersonnel() {
      this.$store.dispatch('fetchItems', personnelEnums)
    },

    emitCloseCreateEdit() {
      this.$emit('close')
    },

    refreshNotifyAndClose() {
      notify({
        group: 'notifications',
        title: 'Success',
        text: this.hall ? `Successfully updated hall` : `Successfully created hall`,
        type: 'success',
      })
      this.$emit('refresh')
      this.emitCloseCreateEdit()
    },

    hallSubmit() {
      if (this.formIsValid) {
        if (this.hall) {
          this.patchHall()
        } else {
          this.postHall()
        }
      } else {
        notify({
          group: 'notifications',
          title: `The ${hallsEnums.TARGET} form data is invalid`,
          text: 'Please check your inputs',
          type: 'error',
        })
      }
    },

    patchHall() {
      const url = process.env.VUE_APP_BASE_URL + hallsEnums.EDIT + this.hall.id + '.json'
      axios.patch(url, this.formData).then(() => {
            this.refreshNotifyAndClose()
          }
      ).catch(error => {
        notify({
          group: 'notifications',
          title: `The ${hallsEnums.TARGET} form data could not be updated`,
          text: `${error}`,
          type: 'error',
        })
      })
    },
    postHall() {
      const url = process.env.VUE_APP_BASE_URL + hallsEnums.ENDPOINT
      axios.post(url, this.formData).then(() => {
            this.refreshNotifyAndClose()
          }
      ).catch(error => {
        notify({
          group: 'notifications',
          title: `The ${hallsEnums.TARGET} form data could not be submitted`,
          text: `${error}`,
          type: 'error',
        })
      })
    }
  }
}
</script>