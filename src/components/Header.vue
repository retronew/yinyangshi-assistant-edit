<template>
    <section class="section section-header bg-gray">
        <section class="grid-header container grid-960">
            <nav class="navbar">
                <section class="navbar-section">
                    <a href="#" class="navbar-brand mr-10">{{ title }}</a>
                    <button class="btn btn-primary ml-10" @click="saveData">保存数据</button>
                    <button class="btn btn-link ml-10" @click="$refs.loadFile.click()">读取文件</button>
                </section>
                <section class="navbar-section">
                    <a href="#" target="_blank" class="btn btn-primary">GitHub</a>
                </section>
            </nav>
        </section>
        <input class="form-input hide" type="file" ref="loadFile" v-on:change="handleFileSelect($event)">
    </section>
</template>

<script>
export default {
    data () {
        return {
            title: '阴阳师数据库编辑器'
        }
    },
    stores: {
        database: 'state.database'
    },
    methods: {
        saveData() {
            var name = 'database',
                data = this.database,
                json = JSON.stringify(data),
            	blob = new Blob([json], {type: 'application/json'}),
            	url  = URL.createObjectURL(blob)

            var a = document.createElement('a')
            a.download = name + '.json'
            a.href = url
            a.click()
        },
        handleFileSelect(event) {
            var self = this,
                files = event.target.files[0] // FileList object

            var reader = new FileReader()
            reader.onload = function() {
                self.database = JSON.parse(this.result)
            }

            reader.readAsText(files)
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.bg-gray {
  background: #f8f9fa;
  color: #667189;
  padding: 1rem;
}
.bg-dark {
  background: #50596c;
  color: #fff;
  padding: 1rem;
}
.section-header {
  padding: 1rem .5rem;
  width: 100%;
}

.grid-header .navbar {
  height: 4rem;
}
.grid-header .navbar-section {
  padding: 0;
}
.grid-header .navbar-brand {
  color: #5b657a;
}
</style>
