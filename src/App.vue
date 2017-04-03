<template>
    <div id="app">
        <header-component></header-component>
        <editor></editor>
    </div>
</template>

<script>
import HeaderComponent from './components/Header'
import Editor from './components/Editor'

export default {
    name: 'app',
    components: {
        HeaderComponent,
        Editor
    }
}
</script>

<style>
.btn.btn-danger {
    background: #ff4949;
    border-color: #ff4949;
  color: #fff;
}
.btn.btn-danger:focus,
.btn.btn-danger:hover {
    background: #ff6d6d;
    border-color: #ff6d6d;
  color: #fff;
}
.btn.btn-danger:active,
.btn.btn-danger.active {
    background: #e64242;
    border-color: #e64242;
  color: #fff;
}
.btn.btn-danger.loading::after {
  border-bottom-color: #fff;
  border-left-color: #fff;
}

.btn.btn-info {
    background: #39f;
    border-color: #39f;
  color: #fff;
}
.btn.btn-info:focus,
.btn.btn-info:hover {
    background: #5cadff;
    border-color: #5cadff;
  color: #fff;
}
.btn.btn-info:active,
.btn.btn-info.active {
    background: #3091f2;
    border-color: #3091f2;
  color: #fff;
}
.btn.btn-info.loading::after {
  border-bottom-color: #fff;
  border-left-color: #fff;
}

.editor-content {
    padding-bottom: 3rem
}
.editor-content .card-body {
    position: relative;
}
.editor-content .card-body .remove{
    position: absolute;
    right: 1.5rem;
    top: 1.5rem
}

.remove-inline-wrap {
    position: relative;
}
.remove-inline-wrap .remove-inline{
    position: absolute;
    right: 0;
    top: .6rem;
}
.card {
    box-shadow: 0 1px 6px rgba(0,0,0,.11);
}
</style>
