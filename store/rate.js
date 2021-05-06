export const state = () => ({
  rate: 25
})

export const mutations = {
  setRate (state, data) {
    state.rate = data
  },
  updRate (state, data) {
    state.rate = data
  }
}

export const getters = {
  getRate: state => state.rate
}

export const actions = {
}
