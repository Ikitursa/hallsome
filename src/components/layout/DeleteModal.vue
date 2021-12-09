<template>
  <div class="backdrop">
    <div class="card update-card card-personnel-update centered-popup">

      <h3 class="update-card-title update-card-form">{{ deleteModalText }}</h3>

      <div class="update-card-actions">
        <button class="button-rounded button-cancel" @click="emitCloseDelete">Cancel</button>
        <button class="button-rounded button-submit" @click="handleDelete">Delete</button>
      </div>

    </div>
  </div>
</template>

<script>
import axios from "axios";
import {notify} from "@kyvg/vue3-notification";

export default {
  name: "DeleteModal",

  props: {
    itemToDelete: {
      required: true,
      type: Object,
    },

    endpoint: {
      required: true,
      type: String,
    },
  },

  computed: {

    deleteModalText() {
      return `Are you sure you want to delete [${this.itemToDelete.name}]`
    }
  },

  methods: {

    emitCloseDelete() {
      this.$emit('close')
    },

    refreshNotifyAndClose() {
      notify({
        group: 'notifications',
        title: 'Success',
        text: `Successfully deleted [${this.itemToDelete.name}]`,
        type: 'success',
      })
      this.$emit('refresh')
      this.emitCloseDelete()
    },

    handleDelete() {
      const url = process.env.VUE_APP_BASE_URL + this.endpoint + this.itemToDelete.id + '.json'
      axios.delete(url).then(() => {
            this.refreshNotifyAndClose()
          }
      ).catch(error => {
        notify({
          group: 'notifications',
          title: `[${this.itemToDelete.name}] could not be deleted`,
          text: `${error}`,
          type: 'error',
        })
      })
    },
  }
}
</script>