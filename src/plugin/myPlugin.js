let myPlugin = {};
myPlugin.install = function (Vue) {
  Vue.directive('scroll', {
    bind(el, binding) {
      let scrollTop = el.scrollTop || 0;
      el.onscroll = function () {
        if (binding.modifiers.up && el.scrollTop < scrollTop) {
          binding.value()
        }
        if (binding.modifiers.down && el.scrollTop > scrollTop) {
          binding.value()
        }
        if (binding.modifiers.start && el.scrollTop === 0) {
          binding.value()
        }
        if (binding.modifiers.end && el.scrollTop + el.clientHeight === el.scrollHeight) {
          binding.value()
        }
        scrollTop = el.scrollTop
      }
    },
    unbind() {
      el.scrollTop = null
    }
  })
};

export default myPlugin