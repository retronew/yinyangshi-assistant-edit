/**
 * Created by pomy on 11/23/16.
 */

'use strict';

import Vue from 'vue';
import Toast from './toast.vue';

const ToastConstructor = Vue.extend(Toast);

let instance = null;

ToastConstructor.prototype.remove = function() {
    this.shown = false;
    instance = null;
    removeDom(this.$el);
};

let processProps = (props) => {
    if (typeof props === 'string') {
        props = {
            message: props
        }
    }
    return props || {};
};

let getAnInstance = () => {

    if(instance){
        return instance;
    }

    return new ToastConstructor({
        el: document.createElement('div')
    });
};

let removeDom = el => {
    if (el.parentNode) {
        el.parentNode.removeChild(el);
    }
};

const show = (props) => {
    instance = getAnInstance();

    clearTimeout(instance.timer);
    instance.message = props.message || '';
    instance.duration = (typeof props.duration === "number" && props.duration >= 0) ? props.duration : 1500;
    instance.type = props.type || 'primary';

    document.body.appendChild(instance.$el);

    Vue.nextTick(function() {
        instance.shown = true;
        //if duration is 0, toast will always show
        //you can invoke remove to hidden it
        if(instance.duration) {
            instance.timer = setTimeout(function() {
                instance.remove();
            }, instance.duration);
        }
    });
    return instance;
};

const info = function(props) {
    props = processProps(props);
    props = Object.assign({type: 'primary'}, props);
    return show(props);
};

const error = function(props) {
    props = processProps(props);
    props = Object.assign({type: 'danger'}, props);
    return show(props);
};

const success  = function(props) {
    props = processProps(props);
    props = Object.assign({type: 'success'}, props);
    return show(props);
};

export default {
    info,
    error,
    success
}
