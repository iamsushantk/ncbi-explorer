import Vue from 'vue';
import Router from 'vue-router';
import Home from '../components/Home';
import Search from '../components/Search';
import Details from '../components/Details';

Vue.use(Router);

const routes = [{
        path: '/',
        name: 'home',
        title: 'Home',
        component: Home,
    },
    {
        path: '/:searchTerm',
        name: 'search',
        title: 'Search',
        component: Search,
    },
    {
        path: '/:searchTerm/:documentId',
        name: 'details',
        title: 'Details',
        component: Details,
    },
    {
        path: '*',
        redirect: {
            path: '/'
        },
    },
];

export default new Router({
    mode: 'history',
    routes,
});