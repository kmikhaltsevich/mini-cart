<template>
  <v-list-item>
    <v-list-item-avatar>
      <div v-if="item.quantity">({{ quantityCalc() }})</div>
      <div v-else>(Нет)</div>
    </v-list-item-avatar>
    <v-list-item-content>
      <v-list-item-title :title="item.title">{{ item.title }}</v-list-item-title>
      <v-list-item-subtitle class="mt-2">
        <v-card outlined class="pa-1">
          <v-row class="align-center">
            <v-col cols="12" md="4">
              <div class="d-flex">
                <div class="text-no-wrap">
                  {{ priceCalc() }} руб.
                </div>
                <v-divider vertical class="mx-2 grey lighten-2"/>
                <div class="text-no-wrap">
                  {{ item.price }} USD
                </div>
              </div>
            </v-col>
            <v-spacer/>
            <v-col cols="6" md="3">
              <v-text-field
                v-model="localItem.quantity"
                :disabled="isItemAdded()"
                hide-details dense outlined class="mx-2"/>
            </v-col>
            <v-spacer/>
            <v-col cols="6" md="2" class="d-flex justify-end">
              <v-btn @click="addItemInOrder"
                     :disabled="isItemAdded()"
                     outlined
                     icon
                     title="В корзину"
                     color="warning">
                <v-icon>{{ isItemAdded() ? 'mdi-cart' : 'mdi-cart-outline' }}</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-list-item-subtitle>
    </v-list-item-content>
    <v-snackbar
      v-model="snackbar"
      timeout="6000"
      bottom
    >
      {{ snackbarText }}
      <template v-slot:action="{ attrs }">
        <v-btn
          color="red"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-list-item>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'ItemCard',
  data: () => ({
    localItem: null,
    snackbar: false,
    snackbarText: ''
  }),
  props: [ 'item' ],
  methods: {
    ...mapGetters({
      getRate: 'rate/getRate',
      getOrder: 'order/getOrder'
    }),
    ...mapMutations({
      setOrder: 'order/setOrder'
    }),
    priceCalc () {
      return (this.item.price * this.getRate()).toFixed(2)
    },
    quantityCalc () {
      if (this.isItemAdded()) return this.item.quantity - this.localItem.quantity
      return this.item.quantity
    },
    addItemInOrder () {
      if (this.item.quantity >= this.localItem.quantity) {
        this.snackbarText = 'Товар добавлен в корзину'
        this.snackbar = true
        return this.setOrder(this.localItem)
      }
      this.snackbarText = `Кол-во добавляемого товара не может превышать наличие. Сейчас: "${ this.localItem.quantity }"`
      this.snackbar = true

    },
    isItemAdded () {
      return !!(this.getOrder().find(i => i.id === this.localItem.id))
    }
  },
  created () {
    this.localItem = { ...this.item, quantity: 1 }
  }
}
</script>
