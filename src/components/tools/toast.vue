<template>
    <div class="toast-mask">
        <transition name="slide-fade">
            <div v-show="shown" class="toast" :class="'toast-' + this.type">
                <span class="message" v-text="message"></span>
            </div>
        </transition>
    </div>
</template>

<style scoped>
.toast {
    position: absolute;
    top: 54px;
    right: 54px;
    width: auto;
    text-align: center;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-active {
  transform: translateX(10px);
  opacity: 0;
}
</style>

<script>
    export default{
        data(){
           return {
              shown:false
           }
        },
        props:{
            message:String,
            type:{
                type:String,
                default:'info'  //info/success/warn/error/loading
            },
            duration:{
                type:Number,
                default:1500
            }
        }
    }
</script>
