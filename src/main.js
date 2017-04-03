// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import './assets/spectre.css'
import stores from 'vue-stores'

import database from './assets/database'

Vue.use(stores)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    template: '<App/>',
    components: { App },
    data: {
        state: {
            database: database.database,
            menuIndex: 0
        }
    }
})
