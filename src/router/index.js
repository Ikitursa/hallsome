import {createRouter, createWebHistory} from 'vue-router'
import Reservations from "../views/Reservations";
import Tables from "../views/Tables";
import Halls from "../views/Halls";
import Personnel from "../views/Personnel";


const routes = [
    {
        path: '/',
        name: 'Home',
        redirect: '/reservations'
    },
    {
        path: '/reservations',
        name: 'Reservations',
        component: Reservations
    },
    {
        path: '/tables',
        name: 'Tables',
        component: Tables
    },
    {
        path: '/halls',
        name: 'Halls',
        component: Halls
    },
    {
        path: '/personnel',
        name: 'Personnel',
        component: Personnel
    }

]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
