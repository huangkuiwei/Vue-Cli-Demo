import Layer from '../layer'
import Toast from './toast.vue'

function toast(component, options) {
  if (options && typeof options !== 'object') {
    options = {
      time: options,
    }
  }
  options = Object.assign({
    time: 2000,
    name: 'layer-toast',
    cancelable: false
  }, options);
  if (typeof component === 'string') {
    options.props = {
      message: component
    };
    component = Toast;
  }
  let close = Layer.open(component, options);

  return new Promise(reject => {
    setTimeout(() => {
      close();
      reject()
    }, options.time)
  })
}

export default {
  toast,
  install(Vue) {
    Vue.prototype.$toast = toast
  }
}