export const state = () => ({
  order: []
})

export const mutations = {
  setOrder (state, data) {
    if ( !state.order) state.order = []
    state.order.push(data)
  },
  removeItemInOrder (state, id) {
    state.order.forEach((item, index) => {
      if (state.order[index]?.id === id) {
        state.order.splice(index, 1)
      }
    })
  }
}

export const getters = {
  getOrder: state => state.order
}

export const actions = {}
