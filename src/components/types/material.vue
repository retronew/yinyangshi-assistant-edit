<template>
    <div class="editor-content">
        <div class="detail">
            <div class="content">
                <div class="columns">
                    <div class="column col-6" v-for="(item, index) in list.content">
                        <div class="card">
                            <div class="card-body">
                                <div class="form-group">
                                    <label class="form-label">名称</label>
                                    <input class="form-input" type="text" v-model="list.content[index].type" />
                                </div>
                            </div>
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
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
