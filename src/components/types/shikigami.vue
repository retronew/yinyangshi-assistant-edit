<template>
    <div class="editor-content">
        <div class="detail">
            <div class="btn-group btn-group-block">
                <button class="btn" v-for="(group, index) in list.content" :class="{ active: index == typeIndex }" @click="typeIndex = index">{{ group.rank }}</button>
            </div>

            <div class="content">
                <div class="columns">
                    <div class="column col-6" v-for="(item, index) in list.content[typeIndex].sets">
                        <div class="card">
                            <div class="card-body">
                                <div class="remove">
                                    <a href="javascript:;" class="label label-danger" @click="deleteShikigami(typeIndex, index)">删除</a>
                                </div>
                                <div class="form-group">
                                    <label class="form-label">名称</label>
                                    <input class="form-input" type="text" v-model="list.content[typeIndex].sets[index].name" />
                                </div>
                                <div class="form-group">
                                    <label class="form-label">图片编号</label>
                                    <input class="form-input" type="text" v-model.number="list.content[typeIndex].sets[index].image" />
                                </div>
                                <div class="form-group">
                                    <label class="form-label">声优</label>
                                    <select class="form-select" v-model="list.content[typeIndex].sets[index].cv">
                                        <option value="null">
                                            无
                                        </option>
                                        <option v-for="(option, optionIndex) in cvList" v-bind:value="optionIndex">
                                            {{ option }}
                                        </option>
                                    </select>
                                </div>
                                <!-- <div class="form-group">
                                    <label class="form-label">御魂</label>
                                    <div v-for="(soulGroup, soulGroupIndex) in list.content[typeIndex].sets[index].soul">
                                        <div class="columns" v-for="(soul, soulIndex) in list.content[typeIndex].sets[index].soul[soulGroupIndex]">
                                            <div class="column col-6">
                                                <select class="form-select" v-model="list.content[typeIndex].sets[index].soul[soulGroupIndex][soulIndex][0]">
                                                    <option v-for="(option, optionIndex) in soulList" v-bind:value="option">
                                                        {{ option }}
                                                    </option>
                                                </select>
                                            </div>
                                            <div class="column col-6">
                                                <input class="form-input" type="number" v-model="list.content[typeIndex].sets[index].soul[soulGroupIndex][soulIndex][1]">
                                            </div>
                                        </div>
                                    </div>
                                </div> -->
                                <div class="form-group">
                                    <label class="form-label">技能</label>
                                    <div v-for="(skill, skillIndex) in list.content[typeIndex].sets[index].skills">
                                        <div class="divider"></div>
                                        <div class="columns">
                                            <div class="column col-4">
                                                <div class="form-group">
                                                    <label class="form-label">名称</label>
                                                    <input class="form-input" type="text" v-model="list.content[typeIndex].sets[index].skills[skillIndex].name">
                                                </div>
                                            </div>
                                            <div class="column col-4">
                                                <div class="form-group">
                                                    <label class="form-label">消费鬼火</label>
                                                    <input class="form-input" type="number" v-model.number="list.content[typeIndex].sets[index].skills[skillIndex].cost">
                                                </div>
                                            </div>
                                            <div class="column col-4">
                                                <div class="form-group remove-inline-wrap">
                                                    <label class="form-label">图片编号</label>
                                                    <div class="remove-inline">
                                                        <a href="javascript:;" class="label label-danger" @click="deleteSkill(typeIndex, index, skillIndex)">删除</a>
                                                    </div>
                                                    <input class="form-input" type="number" v-model.number="list.content[typeIndex].sets[index].skills[skillIndex].image">
                                                </div>
                                            </div>
                                            <div class="column col-12">
                                                <div class="form-group">
                                                    <label class="form-label">描述</label>
                                                    <textarea class="form-input" v-model="list.content[typeIndex].sets[index].skills[skillIndex].description" rows="3"></textarea>
                                                </div>
                                            </div>
                                            <div class="column col-6" v-for="(skillLevel, skillLevelIndex) in list.content[typeIndex].sets[index].skills[skillIndex].level">
                                                <div class="form-group remove-inline-wrap">
                                                    <label class="form-label">技能升级</label>
                                                    <div class="remove-inline">
                                                        <a href="javascript:;" class="label label-danger" @click="deleteSkillLevel(typeIndex, index, skillIndex, skillLevelIndex)">删除</a>
                                                    </div>
                                                    <input class="form-input" type="text" v-model="list.content[typeIndex].sets[index].skills[skillIndex].level[skillLevelIndex]">
                                                </div>
                                            </div>
                                            <div class="column col-12">
                                                <button class="btn btn-primary btn-sm btn-block" @click="addSkillLevel(typeIndex, index, skillIndex)">增加技能等级</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="mt-10">
                                        <button class="btn btn-primary btn-sm btn-block" @click="addSkill(typeIndex, index)">增加技能</button>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="form-switch">
                                        <input type="checkbox" v-model="list.content[typeIndex].sets[index].awakening.enable" />
                                        <i class="form-icon"></i> 是否能够觉醒
                                    </label>
                                </div>
                                <div class="form-group" v-if="list.content[typeIndex].sets[index].awakening.enable === true">
                                    <label class="form-label">觉醒材料</label>
                                    <div class="form-group">
                                        <label class="form-label">描述</label>
                                        <textarea class="form-input" v-model="list.content[typeIndex].sets[index].awakening.description" rows="3"></textarea>
                                    </div>
                                    <div class="columns" v-for="(awakening, awakeningIndex) in list.content[typeIndex].sets[index].awakening.material">
                                        <div class="column col-3">
                                            <div class="form-group">
                                                <select class="form-select" v-model="list.content[typeIndex].sets[index].awakening.material[awakeningIndex][0]">
                                                    <option v-for="(option, optionIndex) in materialList" v-bind:value="optionIndex">
                                                        {{ option.type }}
                                                    </option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="column col-3">
                                            <div class="form-group">
                                                <select class="form-select" v-model="list.content[typeIndex].sets[index].awakening.material[awakeningIndex][1]">
                                                    <option v-for="(option, optionIndex) in materialList[0].sets" v-bind:value="optionIndex">
                                                        {{ option }}
                                                    </option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="column col-4">
                                            <input class="form-input" type="number" v-model.number="list.content[typeIndex].sets[index].awakening.material[awakeningIndex][2]">
                                        </div>
                                        <div class="column col-2">
                                            <button class="btn btn-danger btn-block" @click="deleteMaterial(typeIndex, index, awakeningIndex)">删除</button>
                                        </div>
                                    </div>
                                </div>
                                <div class="mt-10" v-if="list.content[typeIndex].sets[index].awakening.enable === true">
                                    <button class="btn btn-primary btn-sm btn-block" @click="addMaterial(typeIndex, index)">增加觉醒材料</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="add-btn">
                    <button class="btn btn-block" @click="list.content[typeIndex].sets.push(fCopy(rawShikigami))">增加式神</button>
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
        cvList() {
            for (var item of this.database) {
                if (item.field == 'cv') {
                    return item.content
                }
            }
        },
        soulList() {
            for (var item of this.database) {
                if (item.field == 'soul') {
                    return item.content.list.map(function(group, index) {
                        return group.sets.map(function(child) {
                            return child.name
                        })
                    }).reduce(function(pre, cur) {
                        return pre.concat(cur)
                    })
                }
            }
        },
        materialList() {
            for (var item of this.database) {
                if (item.field == 'material') {
                    return item.content
                }
            }
        }
    },
    data () {
        return {
            typeIndex: 0,
            rawShikigami: {
                name: '',
                cv: null,
                image: null,
                soul: [
                    [
                        [
                            '',
                            0
                        ]
                    ]
                ],
                skills: [
                    {
                        name: '',
                        cost: 0,
                        image: null,
                        level: [],
                        description: ''
                    }
                ],
                awakening: {
                    enable: true,
                    material: [
                        [
                            0,
                            0,
                            0
                        ]
                    ],
                    description: ''
                },
            }
        }
    },
    methods: {
        deleteSkillLevel(typeIndex, index, skillIndex, skillLevelIndex) {
            if (confirm('是否确定删除？')) {
                this.list.content[typeIndex].sets[index].skills[skillIndex].level.splice(skillLevelIndex, 1)
            }
        },
        deleteSkill(typeIndex, index, skillIndex) {
            if (confirm('是否确定删除？')) {
                this.list.content[typeIndex].sets[index].skills.splice(skillIndex, 1)
            }
        },
        addSkill(typeIndex, index) {
            this.list.content[typeIndex].sets[index].skills.push(this.fCopy(this.rawShikigami.skills[0]))
        },
        addSkillLevel(typeIndex, index, skillIndex) {
            console.log(typeIndex)
            console.log(index)
            console.log(skillIndex)
            console.log(this.list.content[typeIndex].sets[index])
            this.list.content[typeIndex].sets[index].skills[skillIndex].level.push('')
        },
        deleteShikigami(typeIndex, index) {
            if (confirm('是否确定删除？')) {
                this.list.content[typeIndex].sets.splice(index, 1)
            }
        },
        addMaterial(typeIndex, index) {
            this.list.content[typeIndex].sets[index].awakening.material.push(this.fCopy(this.rawShikigami.awakening.material[0]))
        },
        deleteMaterial(typeIndex, index, awakeningIndex) {
            if (confirm('是否确定删除？')) {
                this.list.content[typeIndex].sets[index].awakening.material.splice(awakeningIndex, 1)
            }
        },
        fCopy(object) {
            return JSON.parse(JSON.stringify(object))
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
