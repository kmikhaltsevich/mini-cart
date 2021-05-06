<template>
  <div>
    <v-row>
      <v-col cols="12" :md="this.requestInterval ? 6 : 12">
        <v-btn @click="startSync" color="success" block depressed>
          Запустить синхронизацию
        </v-btn>
      </v-col>
      <v-col v-if="this.requestInterval" cols="12" md="6">
        <v-btn @click="stopSync" color="error" block depressed>
          Остановить синхронизацию
        </v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col
        cols="12" md="6"
        v-if="getItems()"
        v-for="(group, index) in getItems()"
        :key="group.id+index"
      >
        <v-list-group :value="true" active-class="info darken-1 font-weight-bold rounded" color="white"
                      class="grey lighten-3 rounded">
          <template v-slot:activator>
            <v-list-item-title class="rounded">{{ group.titleGroup }}</v-list-item-title>
          </template>
          <div v-for="(item, index) in group.items" :key="item.id+index" class="item-border">
            <item-card :item="item"/>
          </div>
        </v-list-group>
      </v-col>
    </v-row>
  </div>
</template>

<script>

import { mapActions, mapGetters } from 'vuex'
import ItemCard from '../components/ItemCard'

export default {
  components: { ItemCard },
  data: () => ({
    requestInterval: null
  }),
  methods: {
    ...mapActions({
      fetchGoods: 'items/fetchGoods',
      fetchNames: 'items/fetchNames'
    }),
    ...mapGetters({
      getItems: 'items/getGoods',
      getRate: 'rate/getRate'
    }),
    async getDataInJson () {
      await this.fetchGoods()
      await this.fetchNames()
    },
    startSync () {
      this.requestInterval = setInterval(async () => {
        await this.getDataInJson()
      }, 15000)
    },
    stopSync () {
      clearInterval(this.requestInterval)
      this.requestInterval = null
    }
  },
  async created () {
    await this.getDataInJson()
    await this.startSync()
  }
}
</script>

<style lang="scss" scoped>
.item-border:not(:last-child) {
  border-bottom: 1px solid whitesmoke;
}
</style>
