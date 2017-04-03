<template>
    <div class="editor-content">
        <div class="detail">
            <div class="content">
                <div class="columns">
                    <div class="column col-6" v-for="(item, index) in list.content">
                        <div class="card">
                            <div class="card-body">
                                <div class="remove">
                                    <a href="javascript:;" class="label label-danger" @click="deleteMystery(index)">删除</a>
                                </div>
                                <div class="form-group">
                                    <label class="form-label">关键词</label>
                                    <input class="form-input" type="text" v-model="list.content[index].key" />
                                </div>
                                <div class="form-group">
                                    <select class="form-select" v-model="list.content[index].target">
                                        <option v-for="option in shikigamiList" v-bind:value="option">
                                            {{ option }}
                                        </option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="add-btn">
                    <button class="btn btn-block" @click="list.content.push(fCopy(rawMystery))">增加神秘妖怪</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    stores: {
        database: 'state.database',
        menuIndex: 'state.menuIndex'
    },
    computed: {
        list() {
            return this.database[this.menuIndex]
        },
        shikigamiList() {
            for (var item of this.database) {
                if (item.field == 'shikigami') {
                    return item.content.map(function(items, parentIndex) {
                        return items.sets.map(function(item, index) {
                            return item.name
                        })
                    }).reduce(function(pre, cur) {
                        return pre.concat(cur);
                    })
                }
            }
        },
    },
    data () {
        return {
            rawMystery: {
                key: '',
                target: ''
            }
        }
    },
    methods: {
        deleteMystery(index) {
            if (confirm('是否确定删除？')) {
                this.list.content.splice(index, 1)
            }
        },
        fCopy(object) {
            return JSON.parse(JSON.stringify(object))
        },
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
