import {createStore} from 'vuex'
import axios from "axios";
import {firebaseObjectToList} from "../helpers/helpers";
import {notify} from "@kyvg/vue3-notification";


export default createStore({
    state: {
        personnel: null,
        halls: null,
        tables: null,
        reservations: null,
    },

    getters: {

        getPersonnel(state) {
            return state.personnel
        },

        getHalls(state) {
            return state.halls
        },

        getTables(state) {
            return state.tables
        },

        getReservations(state) {
            return state.reservations
        },
    },

    mutations: {

        setItems(state, payload) {
            state[payload.target] = payload.items
        }
    },

    actions: {

        fetchItems({commit}, options) {
            const url = process.env.VUE_APP_BASE_URL + options.ENDPOINT

            axios.get(url).then(({data, status}) => {
                    commit('setItems', {
                        target: options.TARGET,
                        items: firebaseObjectToList(data)
                    })
                }
            ).catch(error => {
                notify({
                    group: 'notifications',
                    title: `The ${options.TARGET} data could not be fetched`,
                    text: `${error}`,
                    type: 'error',
                })
                console.log(error)
            })
        },


    },
    modules: {}
})
