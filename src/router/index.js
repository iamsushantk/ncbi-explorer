import Vue from 'vue';
import Router from 'vue-router';
import Dashboard from '../components/Dashboard'

Vue.use(Router);

const routes = [{
        path: '/dashboard',
        name: 'dashboard',
        title: 'Dashboard',
        component: Dashboard,
    },
    {
        path: '*',
        redirect: {
            name: 'dashboard'
        },
    },
];

export default new Router({
    routes,
});