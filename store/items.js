export const state = () => ({
  goods: null,
  names: null
})

export const mutations = {
  setGoods (state, data) {
    state.goods = data
  },
  setNames (state, data) {
    state.names = data
  }
}

export const getters = {
  getGoods: state => {
    if (!state.goods || !state.names) return null
    return state.goods.reduce((res, { G: groupId, T: itemId, C: price, P: quantity }) => {
      const { B: itemList, G: titleGroup } = state.names[groupId]
      const title = itemList[itemId].N
      const item = { title, price, quantity, id: itemId }
      if ( !res[groupId]?.items) {
        res[groupId] = { titleGroup, id: groupId, items: [ item ] }
      } else {
        res[groupId].items.push(item)
      }
      return res
    }, {})
  }
}

export const actions = {
  async fetchGoods ({ commit }) {
    try {
      const { data } = await this.$axios.get('./data.json')
      if ( !data?.Value?.Goods?.length) return
      commit('setGoods', data.Value.Goods)
    } catch (e) {
      console.error(e)
      throw e
    }
  },
  async fetchNames ({ commit }) {
    try {
      const { data } = await this.$axios.get('./names.json')
      if ( !data) return
      commit('setNames', data)
    } catch (e) {
      console.error(e)
      throw e
    }
  }
}
