<template>
    <div class="editor-content">
        <div class="detail">
            <div class="btn-group btn-group-block">
                <button class="btn" v-for="(group, index) in list.content" :class="{ active: index == typeIndex }" @click="typeIndex = index">{{ group.name }}</button>
                <button class="btn" @click="addMaster">增加</button>
            </div>

            <div class="content">
                <div class="columns">
                    <div class="column col-12">
                        <div class="card">
                            <div class="card-body">
                                <div class="form-group">
                                    <label class="form-label">名称</label>
                                    <input class="form-input" type="text" v-model="list.content[typeIndex].name" />
                                </div>
                                <div class="form-group">
                                    <label class="form-label">声优</label>
                                    <select class="form-select" v-model="list.content[typeIndex].cv">
                                        <option value="null">
                                            无
                                        </option>
                                        <option v-for="(option, optionIndex) in cvList" v-bind:value="optionIndex">
                                            {{ option }}
                                        </option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label class="form-label">描述</label>
                                    <textarea class="form-input" type="text" rows="3" v-model="list.content[typeIndex].description"></textarea>
                                </div>
                                <div class="form-group">
                                    <label class="form-label">技能</label>
                                    <div v-for="(skill, skillIndex) in list.content[typeIndex].skills">
                                        <div class="divider"></div>
                                        <div class="columns">
                                            <div class="column col-6">
                                                <div class="form-group">
                                                    <label class="form-label">名称</label>
                                                    <input class="form-input" type="text" v-model="list.content[typeIndex].skills[skillIndex].name">
                                                </div>
                                            </div>
                                            <div class="column col-6">
                                                <div class="form-group remove-inline-wrap">
                                                    <label class="form-label">图片编号</label>
                                                    <div class="remove-inline">
                                                        <a href="javascript:;" class="label label-danger" @click="deleteSkill(typeIndex, skillIndex)">删除</a>
                                                    </div>
                                                    <input class="form-input" type="number" v-model.number="list.content[typeIndex].skills[skillIndex].image">
                                                </div>
                                            </div>
                                            <div class="column col-12">
                                                <div class="form-group">
                                                    <label class="form-label">描述</label>
                                                    <textarea class="form-input" v-model="list.content[typeIndex].skills[skillIndex].description" rows="3"></textarea>
                                                </div>
                                            </div>
                                            <div class="column col-6" v-for="(skillLevel, skillLevelIndex) in list.content[typeIndex].skills[skillIndex].level">
                                                <div class="form-group remove-inline-wrap">
                                                    <label class="form-label">技能升级</label>
                                                    <div class="remove-inline">
                                                        <a href="javascript:;" class="label label-danger" @click="deleteSkillLevel(typeIndex, skillIndex, skillLevelIndex)">删除</a>
                                                    </div>
                                                    <input class="form-input" type="text" v-model="list.content[typeIndex].skills[skillIndex].level[skillLevelIndex]">
                                                </div>
                                            </div>
                                            <div class="column col-12">
                                                <button class="btn btn-primary btn-sm btn-block" @click="addSkillLevel(typeIndex, skillIndex)">增加技能等级</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="mt-10">
                                        <button class="btn btn-primary btn-sm btn-block" @click="addSkill(typeIndex)">增加技能</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="remove-btn">
                    <button class="btn btn-danger btn-sm btn-block" @click="deleteMaster" v-if="list.content.length > 1">删除主角</button>
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
        }
    },
    data () {
        return {
            typeIndex: 0,
            rawMaster: {
                name: '新主角',
                cv: '',
                skills: [
                    {
                        name: '',
                        image: null,
                        level: [],
                        description: ''
                    }
                ]
            }
        }
    },
    methods: {
        addSkill(typeIndex) {
            this.list.content[typeIndex].skills.push(this.fCopy(this.rawMaster.skills[0]))
        },
        addSkillLevel(typeIndex, skillIndex) {
            this.list.content[typeIndex].skills[skillIndex].level.push('')
        },
        deleteSkill(typeIndex, skillIndex) {
            if (confirm('是否确定删除？')) {
                this.list.content[typeIndex].skills.splice(skillIndex, 1)
            }
        },
        deleteSkillLevel(typeIndex, skillIndex, skillLevelIndex) {
            if (confirm('是否确定删除？')) {
                this.list.content[typeIndex].skills[skillIndex].level.splice(skillLevelIndex, 1)
            }
        },
        addMaster() {
            this.list.content.push(this.fCopy(this.rawMaster))
            this.typeIndex = this.list.content.length - 1
        },
        deleteMaster() {
            if (confirm('是否确定删除？')) {
                this.list.content.splice(this.typeIndex, 1)
                this.typeIndex -= 1
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
