<template>
    <section id="editor" class="container grid-960">
        <div class="layout">
            <div class="layout-menu">
                <ul class="tab tab-block">
                    <li class="tab-item" v-for="(menu, index) in database" :class="{ active: menuIndex == index }">
                        <a href="javascript:;" v-on:click="menuIndex = index">{{ menu.name }}</a>
                    </li>
                </ul>
            </div>
            <div class="layout-content">
                <component :is="currentView"></component>
            </div>
        </div>
    </section>
</template>

<script>
import cv from './types/cv'
import soul from './types/soul'
import mystery from './types/mystery'
import mapGroup from './types/map'
import material from './types/material'
import shikigami from './types/shikigami'
import master from './types/master'

export default {
    components: {
        cv,
        soul,
        mystery,
        mapGroup,
        material,
        shikigami,
        master
    },
    data () {
        return {
            title: '阴阳师数据库编辑器',
        }
    },
    stores: {
        database: 'state.database',
        menuIndex: 'state.menuIndex'
    },
    computed: {
        currentView: function () {
            return this.database[this.menuIndex].field
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.layout-content {
    padding: 8px 0
}
</style>
