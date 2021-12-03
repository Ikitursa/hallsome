<template>
  <div class="backdrop">
    <div class="card update-card card-personnel-update centered-popup">
      <h3 class="update-card-title">Add new employee</h3>
      <div class="update-card-form">
        <form action="" id="personnelUpdate">
          <div class="input-wrapper">
            <label class="form-input-label" for="name">Name*</label>
            <input class="update-form-input" type="text" id="name" v-model.trim="formData.name"
                   :class="{'invalid-input': !inputValid.name}" @blur="inputValid.name = true">
          </div>
          <div class="input-wrapper">
            <label class="form-input-label" for="lastName">Last name*</label>
            <input class="update-form-input" type="text" id="lastName" v-model.trim="formData.lastName"
                   :class="{'invalid-input': !inputValid.lastName}" @blur="inputValid.lastName = true">
          </div>
          <div class="input-wrapper checkbox">
            <label class="form-input-label" for="manager">Manager</label>
            <input class="update-form-input form-checkbox" type="checkbox" id="manager" value="frontend"
                   v-model="formData.manager">
          </div>
        </form>
      </div>
      <div class="update-card-actions">
        <button @click="emitCloseCreateEdit" class="button-rounded button-cancel">Cancel</button>
        <button @click="personSubmit" class="button-rounded button-submit">Submit</button>
      </div>

    </div>

  </div>
</template>

<script>
import axios from "axios";
import {firebaseObjectToList} from "../../helpers/helpers";

export default {
  name: "PersonnelCreateEdit",

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
      inputValid: {
        name: true,
        lastName: true,
        formValid: true
      },
    }
  },

  created() {
    if (this.person) {
      this.fillPersonData()
    }
  },

  components: {},

  computed: {},

  methods: {
    fillPersonData() {
      //works for generating a deep copy for objects without functions
      //the second is for creating a shallow copy which is alright in the current case
      //this.formData = JSON.parse(JSON.stringify(this.person))
      this.formData = {...this.person}
    },
    emitCloseCreateEdit() {
      this.$emit('closeCreateEdit')
    },
    validateFormData() {
      this.inputValid.name =!!this.formData.name
      this.inputValid.lastName = this.formData.lastName !== ''
      //use [].some for longer checks
      this.inputValid.name && this.inputValid.lastName
          ? this.inputValid.formValid = true : this.inputValid.formValid = false
      return this.inputValid.formValid
    },

    personSubmit() {
      if (this.validateFormData()) {
        if (this.person) {
          this.patchPerson()
        } else {
          this.postPerson()
        }
      } else {
        this.show('notifications', 'warn')
      }
    },

    patchPerson() {
      const url = process.env.VUE_APP_BASE_URL + '/personnel/' + this.person.id + '.json'
      axios.patch(url, this.formData).then(({data, status}) => {
            this.show('notifications', 'success')
            this.$emit('reloadData')
            this.emitCloseCreateEdit()
          }
      ).catch(error => {
        this.show('notifications', 'error')
        console.log(error)
      })
    },
    postPerson() {
      const url = process.env.VUE_APP_BASE_URL + '/personnel.json'
      axios.post(url, this.formData).then(({data, status}) => {
            this.show('notifications', 'success')
            this.$emit('reloadData')
            this.emitCloseCreateEdit()
          }
      ).catch(error => {
        this.show('notifications', 'error')
        console.log(error)
      })
    },

    notifyMessageGenerator(type) {
      const messages = {
        //success needs more work
        success: 'Updated/Created successfully',
        warn: 'the form data is invalid',
        error: 'an error has occurred'
      }

      return (messages[type])
    },

    show(group, type = '') {
      const text = `Date: ${new Date()}`;
      this.$notify({
        group,
        title: this.notifyMessageGenerator(type),
        text,
        type,
        data: {
          randomNumber: Math.random(),
        },
      });
    },
    clean(group) {
      this.$notify({group, clean: true});
    }
  }

}
</script>