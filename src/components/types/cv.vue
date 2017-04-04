<template>
    <div class="editor-content">
        <div class="add-cv">
            <div class="columns">
                <div class="column col-6">
                    <div class="input-group">
                        <input type="text" class="form-input" v-model="cv" @keyup.enter="addCV" />
                        <button class="btn btn-primary input-group-btn" @click="addCV">增加CV</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="columns">
            <div class="column col-3" v-for="(item, index) in list.content">
                <div class="input-group">
                    <span class="input-group-addon">{{ leftPad(index + 1, 2, 0) }}</span>
                    <input type="text" class="form-input" v-model="list.content[index]" />
                    <button class="btn btn-danger input-group-btn" @click="deleteCV(index)">删除</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Toast from '../tools/toast.js'
import leftPad from 'left-pad'

export default {
    stores: {
        database: 'state.database',
        menuIndex: 'state.menuIndex'
    },
    computed: {
        list() {
            return this.database[this.menuIndex]
        }
    },
    data () {
        return {
            cv: ''
        }
    },
    methods: {
        addCV() {
            if (this.cv.length) {
                if (this.list.content.indexOf(this.cv) == -1) {
                    this.list.content.push(this.cv)
                    this.cv = ''
                } else {
                    Toast.error(this.cv + '已存在')
                }
            }
        },
        deleteCV(index) {
            if (confirm('是否确定删除？')) {
                this.list.content.splice(index, 1)
            }
        },
        leftPad(str, len, ch) {
            return leftPad(str, len, ch)
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
