<template>
    <div class="editor-content">
        <div class="columns">
            <div class="column col-6" v-for="(position, index) in list.content.position">
                <div class="form-group">
                    <label class="form-label">{{ '御魂' + position.id + '号位' }}</label>
                    <input class="form-input" type="text" v-model="list.content.position[index].statistic" />
                </div>
            </div>
        </div>

        <div class="detail">
            <div class="btn-group btn-group-block">
                <button class="btn" v-for="(group, index) in list.content.list" :class="{ active: index == typeIndex }" @click="typeIndex = index">{{ group.type }}</button>
            </div>
            <div class="content">
                <div class="columns">
                    <div class="column col-6" v-for="(item, index) in list.content.list[typeIndex].sets">
                        <div class="card">
                            <div class="card-body">
                                <div class="remove">
                                    <a href="javascript:;" class="label label-danger" @click="deleteSoul(typeIndex, index)">删除</a>
                                </div>
                                <div class="form-group">
                                    <label class="form-label">名称</label>
                                    <input class="form-input" type="text" v-model="list.content.list[typeIndex].sets[index].name" />
                                </div>
                                <div class="form-group">
                                    <label class="form-switch">
                                        <input type="checkbox" v-model="list.content.list[typeIndex].sets[index].get" />
                                        <i class="form-icon"></i> 是否可直接获取
                                    </label>
                                </div>
                                <div class="form-group">
                                    <label class="form-label">2两套效果</label>
                                    <input class="form-input" type="text" v-model="list.content.list[typeIndex].sets[index].special[0]" />
                                </div>
                                <div class="form-group">
                                    <label class="form-label">4件套效果</label>
                                    <input class="form-input" type="text" v-model="list.content.list[typeIndex].sets[index].special[1]" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="add-btn">
                    <button class="btn btn-block" @click="list.content.list[typeIndex].sets.push(fCopy(rawSoul))">增加御魂</button>
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
        }
    },
    data () {
        return {
            rawSoul: {
                name: '',
                get: true,
                special: [
                    '', ''
                ]
            },
            typeIndex: 0
        }
    },
    methods: {
        deleteSoul(typeIndex, index) {
            if (confirm('是否确定删除？')) {
                this.list.content.list[typeIndex].sets.splice(index, 1)
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
.detail {
    padding: 1rem 0
}
</style>
