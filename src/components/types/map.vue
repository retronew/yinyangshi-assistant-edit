<template>
    <div class="editor-content">
        <div class="detail">
            <div class="btn-group btn-group-block">
                <button class="btn" v-for="(group, index) in list.content" :class="{ active: index == typeIndex }" @click="typeIndex = index; mapIndex = 0; secondIndex = 0">{{ group.name }}</button>
            </div>

            <div class="content">
                <div class="columns">
                    <div class="column col-4">
                        <ul class="menu">
                            <li class="menu-item" v-for="(item, index) in list.content[typeIndex].sets">
                                <a href="javascript:;" @click="mapIndex = index; secondIndex = 0" :class="{ active: mapIndex == index }">
                                    {{ item.name }}
                                </a>
                            </li>
                        </ul>
                        <div class="mt-10">
                            <button class="btn btn-primary btn-sm btn-block" @click="addMap(typeIndex)">新增副本</button>
                        </div>
                    </div>

                    <div class="column col-8">
                        <div class="card" v-if="typeIndex == 0">
                            <div class="card-body">
                                <div class="form-group">
                                    <label class="form-label">副本名称</label>
                                    <input class="form-input" type="text" v-model="list.content[typeIndex].sets[mapIndex].name" />
                                </div>
                                <div class="form-group">
                                    <label class="form-switch">
                                        <input type="checkbox" v-model="list.content[typeIndex].sets[mapIndex].main" />
                                        <i class="form-icon"></i> 是否为主线副本
                                    </label>
                                </div>
                                <div class="form-group" v-show="list.content[typeIndex].sets[mapIndex].main === true">
                                    <label class="form-label">副本序号</label>
                                    <input class="form-input" type="number" v-model.number="list.content[typeIndex].sets[mapIndex].id" />
                                </div>
                                <div v-for="(round, roundIndex) in list.content[typeIndex].sets[mapIndex].sets">
                                    <div class="divider"></div>
                                    <div class="form-group remove-inline-wrap">
                                        <label class="form-label">关卡名称</label>
                                        <div class="remove-inline">
                                            <a href="javascript:;" class="label label-danger" @click="deleteRound(typeIndex, mapIndex, roundIndex)">删除</a>
                                        </div>
                                        <input class="form-input" type="text" v-model="list.content[typeIndex].sets[mapIndex].sets[roundIndex].name" />
                                    </div>
                                    <div class="columns" v-for="(detail, detailIndex) in list.content[typeIndex].sets[mapIndex].sets[roundIndex].content">
                                        <div class="column col-6">
                                            <div class="form-group">
                                                <label class="form-label">妖怪</label>
                                                <select class="form-select" v-model="list.content[typeIndex].sets[mapIndex].sets[roundIndex].content[detailIndex][0]">
                                                    <option v-for="option in shikigamiList" v-bind:value="option">
                                                        {{ option }}
                                                    </option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="column col-6">
                                            <div class="form-group remove-inline-wrap">
                                                <label class="form-label">数量</label>
                                                <div class="remove-inline">
                                                    <a href="javascript:;" class="label label-danger" @click="deleteMonster(typeIndex, mapIndex, roundIndex, detailIndex)">删除妖怪</a>
                                                </div>
                                                <input class="form-input" type="number" v-model.number="list.content[typeIndex].sets[mapIndex].sets[roundIndex].content[detailIndex][1]">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="remove-map mt-10">
                                        <button class="btn btn-primary btn-sm btn-block" @click="addMonster(typeIndex, mapIndex, roundIndex)">新增妖怪</button>
                                    </div>
                                </div>
                                <div class="remove-map mt-10">
                                    <button class="btn btn-sm btn-block" @click="addRound(typeIndex, mapIndex)">新增关卡</button>
                                </div>
                            </div>
                        </div>

                        <div class="card" v-if="typeIndex == 1">
                            <div class="card-body">
                                <div class="form-group">
                                    <label class="form-label">副本名称</label>
                                    <input class="form-input" type="text" v-model="list.content[typeIndex].sets[mapIndex].name" />
                                </div>
                                <div v-for="(round, roundIndex) in list.content[typeIndex].sets[mapIndex].sets">
                                    <div class="divider"></div>
                                    <div class="remove-inline-wrap">
                                        <span class="form-label">第{{ roundIndex + 1 }}轮</span>
                                        <div class="remove-inline">
                                            <a href="javascript:;" class="label label-danger" @click="deleteRound(typeIndex, mapIndex, roundIndex)">删除</a>
                                        </div>
                                    </div>
                                    <div class="columns" v-for="(detail, detailIndex) in list.content[typeIndex].sets[mapIndex].sets[roundIndex].content">
                                        <div class="column col-6">
                                            <div class="form-group">
                                                <label class="form-label">妖怪</label>
                                                <select class="form-select" v-model="list.content[typeIndex].sets[mapIndex].sets[roundIndex].content[detailIndex][0]">
                                                    <option v-for="option in shikigamiList" v-bind:value="option">
                                                        {{ option }}
                                                    </option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="column col-6">
                                            <div class="form-group remove-inline-wrap">
                                                <label class="form-label">数量</label>
                                                <div class="remove-inline">
                                                    <a href="javascript:;" class="label label-danger" @click="deleteMonster(typeIndex, mapIndex, roundIndex, detailIndex)">删除妖怪</a>
                                                </div>
                                                <input class="form-input" type="number" v-model.number="list.content[typeIndex].sets[mapIndex].sets[roundIndex].content[detailIndex][1]">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="remove-map mt-10">
                                        <button class="btn btn-primary btn-sm btn-block" @click="addMonster(typeIndex, mapIndex, roundIndex)">新增妖怪</button>
                                    </div>
                                </div>
                                <div class="remove-map mt-10">
                                    <button class="btn btn-sm btn-block" @click="addRound(typeIndex, mapIndex)">新增关卡</button>
                                </div>
                            </div>
                        </div>

                        <div class="card" v-if="typeIndex == 2 || typeIndex == 3">
                            <div class="card-body">
                                <div class="form-group">
                                    <label class="form-label">副本名称</label>
                                    <input class="form-input" type="text" v-model="list.content[typeIndex].sets[mapIndex].name" />
                                </div>
                                <div class="btn-group btn-group-block">
                                    <button class="btn" v-for="(group, index) in list.content[typeIndex].sets[mapIndex].sets" :class="{ active: index == secondIndex }" @click="secondIndex = index" v-text="group.name"></button>
                                    <button class="btn" @click="addSecondMap(typeIndex, mapIndex)">新增</button>
                                </div>
                                <div class="form-group" v-if="list.content[typeIndex].sets[mapIndex].sets[secondIndex].name">
                                    <label class="form-label">层数名称</label>
                                    <input class="form-input" type="text" v-model="list.content[typeIndex].sets[mapIndex].sets[secondIndex].name" />
                                </div>
                                <div>
                                    <div v-for="(detail, detailIndex) in list.content[typeIndex].sets[mapIndex].sets[secondIndex].sets">
                                        <div class="divider"></div>
                                        <div class="remove-inline-wrap">
                                            <span class="form-label">第{{ detailIndex + 1 }}轮</span>
                                            <div class="remove-inline">
                                                <a href="javascript:;" class="label label-danger" @click="deleteRound(typeIndex, mapIndex, secondIndex, detailIndex)">删除该轮</a>
                                            </div>
                                        </div>
                                        <div class="columns" v-for="(level, levelIndex) in list.content[typeIndex].sets[mapIndex].sets[secondIndex].sets[detailIndex].content">
                                            <div class="column col-6">
                                                <div class="form-group">
                                                    <label class="form-label">妖怪</label>
                                                    <select class="form-select" v-model="list.content[typeIndex].sets[mapIndex].sets[secondIndex].sets[detailIndex].content[levelIndex][0]">
                                                        <option v-for="option in shikigamiList" v-bind:value="option">
                                                            {{ option }}
                                                        </option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="column col-6">
                                                <div class="form-group remove-inline-wrap">
                                                    <label class="form-label">数量</label>
                                                    <div class="remove-inline">
                                                        <a href="javascript:;" class="label label-danger" @click="deleteMonster(typeIndex, mapIndex, secondIndex, detailIndex, levelIndex)">删除妖怪</a>
                                                    </div>
                                                    <input class="form-input" type="number" v-model.number="list.content[typeIndex].sets[mapIndex].sets[secondIndex].sets[detailIndex].content[levelIndex][1]">
                                                </div>
                                            </div>
                                        </div>
                                        <div class="remove-map mt-10">
                                            <button class="btn btn-primary btn-sm btn-block" @click="addMonster(typeIndex, mapIndex, secondIndex, detailIndex)">新增妖怪</button>
                                        </div>
                                    </div>
                                </div>
                                <div class="remove-map mt-10">
                                    <button class="btn btn-sm btn-block" @click="addRound(typeIndex, mapIndex, secondIndex)">新增关卡</button>
                                </div>
                                <div class="remove-map mt-10">
                                    <button class="btn btn-danger btn-sm btn-block" @click="deleteSecondMap(typeIndex, mapIndex, secondIndex)" v-if="list.content[typeIndex].sets[mapIndex].sets.length > 1">删除该层</button>
                                </div>
                            </div>
                        </div>

                        <div class="card" v-if="typeIndex == 4 || typeIndex == 5">
                            <div class="card-body">
                                <div class="form-group">
                                    <label class="form-label">副本名称</label>
                                    <input class="form-input" type="text" v-model="list.content[typeIndex].sets[mapIndex].name" />
                                </div>
                                <div class="form-group">
                                    <label class="form-label">层数</label>
                                    <input class="form-input" type="number" v-model.number="list.content[typeIndex].sets[mapIndex].round">
                                </div>
                            </div>
                        </div>

                        <div class="remove-map mt-10">
                            <button class="btn btn-danger btn-sm btn-block" @click="deleteMap(typeIndex, mapIndex)">删除副本</button>
                        </div>
                    </div>
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
            typeIndex: 0,
            mapIndex: 0,
            secondIndex: 0, // 专门为御魂副本准备
            rawTS: {
                id: null,
                name: '新地图',
                sets: [
                    {
                        name: '',
                        content: [
                            [
                                '',
                                0
                            ],
                        ]
                    },
                ]
            },
            rawYQ: {
                name: '新妖气',
                sets: [
                    {
                        content: [
                            [
                                '',
                                0
                            ]
                        ]
                    },
                ]
            },
            rawYHMW: { // 御魂和秘闻
                name: '新副本',
                sets: [
                    {
                        name: '新楼层',
                        sets: [
                            {
                                content: [
                                    [
                                        '',
                                        0
                                    ]
                                ]
                            },
                        ]
                    }
                ]
            },
            rawJXYL: { // 觉醒和御灵
                name: '新副本',
                round: 0
            }
        }
    },
    methods: {
        addMap(typeIndex) {
            if (typeIndex == 0) { // 探索副本
                this.list.content[typeIndex].sets.push(this.fCopy(this.rawTS))
            } else if (typeIndex == 1) {
                this.list.content[typeIndex].sets.push(this.fCopy(this.rawYQ))
            } else if (typeIndex == 2 || typeIndex == 3) {
                this.list.content[typeIndex].sets.push(this.fCopy(this.rawYHMW))
            } else if (typeIndex == 4 || typeIndex == 5) {
                this.list.content[typeIndex].sets.push(this.fCopy(this.rawJXYL))
            }
            this.mapIndex = this.list.content[typeIndex].sets.length - 1
        },
        addSecondMap(typeIndex, mapIndex) { // 御魂和秘闻副本增加层数
            this.list.content[typeIndex].sets[mapIndex].sets.push(this.fCopy(this.rawYHMW.sets[0]))
            this.secondIndex = this.list.content[typeIndex].sets[mapIndex].sets.length - 1
        },
        deleteSecondMap(typeIndex, mapIndex, secondIndex) { // 御魂和秘闻副本删除层数
            if (secondIndex == this.list.content[typeIndex].sets[mapIndex].sets.length - 1) {
                this.secondIndex = this.list.content[typeIndex].sets[mapIndex].sets.length - 2
            }
            this.list.content[typeIndex].sets[mapIndex].sets.splice(secondIndex, 1)
        },
        addRound(typeIndex, mapIndex, roundIndex) {
            if (typeIndex == 0) {
                this.list.content[typeIndex].sets[mapIndex].sets.push(this.fCopy(this.rawTS.sets[0]))
            } else if (typeIndex == 1) {
                this.list.content[typeIndex].sets[mapIndex].sets.push(this.fCopy(this.rawYQ.sets[0]))
            } else if (typeIndex == 2 || typeIndex == 3) {
                this.list.content[typeIndex].sets[mapIndex].sets[roundIndex].sets.push(this.fCopy(this.rawYHMW.sets[0].sets[0]))
            }
        },
        addMonster(typeIndex, mapIndex, roundIndex, levelIndex) {
            if (typeIndex == 0) {
                this.list.content[typeIndex].sets[mapIndex].sets[roundIndex].content.push(this.fCopy(this.rawTS.sets[0].content[0]))
            } else if (typeIndex == 1) {
                this.list.content[typeIndex].sets[mapIndex].sets[roundIndex].content.push(this.fCopy(this.rawYQ.sets[0].content[0]))
            } else if (typeIndex == 2 || typeIndex == 3) {
                this.list.content[typeIndex].sets[mapIndex].sets[roundIndex].sets[levelIndex].content.push(this.fCopy(this.rawYHMW.sets[0].sets[0].content[0]))
            }
        },
        deleteMonster(typeIndex, mapIndex, roundIndex, detailIndex, levelIndex) {
            if (confirm('是否确定删除？')) {
                if (typeIndex == 2 || typeIndex == 3) {
                    this.list.content[typeIndex].sets[mapIndex].sets[roundIndex].sets[detailIndex].content.splice(levelIndex, 1)
                } else {
                    this.list.content[typeIndex].sets[mapIndex].sets[roundIndex].content.splice(detailIndex, 1)
                }
            }
        },
        deleteRound(typeIndex, mapIndex, roundIndex, levelIndex) {
            if (confirm('是否确定删除？')) {
                if (typeIndex == 2 || typeIndex == 3) {
                    this.list.content[typeIndex].sets[mapIndex].sets[roundIndex].sets.splice(levelIndex, 1)
                } else {
                    this.list.content[typeIndex].sets[mapIndex].sets.splice(roundIndex, 1)
                }
            }
        },
        deleteMap(typeIndex, mapIndex) {
            if (confirm('是否确定删除？')) {
                if (mapIndex == this.list.content[typeIndex].sets.length - 1) {
                    this.mapIndex = this.list.content[typeIndex].sets.length - 2
                }
                this.list.content[typeIndex].sets.splice(mapIndex, 1)
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
