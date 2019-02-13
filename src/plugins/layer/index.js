import Vue from 'vue'

function open(component, options = {}) {
  options = Object.assign({
    cancelable: true,
    props: {},
    listeners: {}
  }, options);
  let layer = new Vue({
    data: {
      open: true
    },
    provide: {
      cancelable: options.cancelable,
      closeLayer
    },
    render(h) {
      if (this.open) {
        return h(
          'transition',
          {
            attrs: {
              appear: true
            },
            on: {
              afterLeave: () => this.$destroy()
            }
          },
          [
            h(
              'div',
              {
                class: [
                  'layer',
                  options.name
                ],
                on: {
                  click: e => {
                    if (!options.cancelable) {
                      return
                    }
                    if (e.target === e.currentTarget) {
                      closeLayer()
                    }
                  }
                }
              },
              [
                h(
                  component,
                  {
                    props: options.props,
                    on: {
                      close: closeLayer,
                      ...options.listeners
                    }
                  }
                )
              ]
            )
          ]
        )
      }
    },
    mounted() {
      document.body.appendChild(this.$el)
    },
    destroyed() {
      document.body.removeChild(this.$el)
    }
  }).$mount();

  function closeLayer() {
    if (layer) {
      layer = layer.open = null
    }
  }

  return closeLayer
}

export default {
  open,
  install(Vue) {
    Vue.prototype.$open = open
  }
}