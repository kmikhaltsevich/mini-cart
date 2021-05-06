<template>
  <div>
    <v-app-bar fixed app>
      <v-toolbar-title v-text="title"/>
      <v-spacer/>
      <v-btn @click="dialog = true" icon color="warning" small class="mr-2">
        <v-icon>mdi-pen</v-icon>
      </v-btn>
      <div class="success--text mr-2">
        ${{ getRate() }}
      </div>
      <v-badge
        :value="getOrder() && getOrder().length"
        :content="getOrder() ? getOrder().length : ''"
        color="error"
        offset-x='22'
        offset-y='22'
      >
        <v-btn
          icon
          @click.stop="drawer = !drawer"
        >
          <v-icon>mdi-cart-outline</v-icon>
        </v-btn>
      </v-badge>
    </v-app-bar>

    <v-dialog v-model="dialog" width="640">
      <v-card width="640" class="pa-3">
        <v-form
          ref='form'
          v-model='validForm'
          lazy-validation
        >
          <v-text-field
            v-model="newRate"
            :rules="[rules.minMax]"
            outlined
            type="number"/>
          <v-btn @click="setNewRate" outlined color="info" block>Обновить</v-btn>
        </v-form>
      </v-card>
    </v-dialog>

    <v-navigation-drawer
      v-model="drawer"
      right
      temporary
      fixed
      width="85%"
    >
      <div class="d-flex justify-space-between ma-3">
        <div class="mb-0 text-h6">Корзина</div>
        <v-btn @click="drawer = false" icon>
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </div>
      <v-list v-if="getOrder() && getOrder().length">
        <v-list-item
          v-for="(item, index) in getOrder()"
          :key="item.id+index"
        >
          <v-list-item-content>
            <v-list-item-title>
              <div class="d-flex align-center justify-space-between">
                <div class="text-overline">{{ item.title }}</div>
                <v-btn @click="removeItemInOrder(item.id)" icon color="error">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </div>
            </v-list-item-title>
            <v-list-item-subtitle>
              <div class="d-flex align-center justify-space-between mb-2">
                <div>Цена:</div>
                <div class="dot"></div>
                <div>{{ priceCalc(item.price) }} руб.</div>
              </div>
              <div class="d-flex align-center justify-space-between mb-2">
                <div>Кол-во:</div>
                <div class="dot"></div>
                <div>{{ item.quantity }}</div>
              </div>
              <div class="d-flex align-center justify-space-between">
                <div>Сумма:</div>
                <div class="dot"></div>
                <div>{{ (priceCalc(item.price) * item.quantity).toFixed(2) }} руб.</div>
              </div>
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <div class="mx-3" v-else>
        Товары отсутствуют
      </div>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'MainHeader',
  data () {
    return {
      drawer: false,
      dialog: false,
      validForm: false,
      title: 'Mini Cart',
      newRate: null,
      rules: {
        minMax: value => value>20 && value<80 || 'min: 20 | max: 80'
      }
    }
  },
  methods: {
    ...mapGetters({
      getRate: 'rate/getRate',
      getOrder: 'order/getOrder'
    }),
    ...mapMutations({
      removeItemInOrder: 'order/removeItemInOrder',
      updRate: 'rate/updRate'
    }),
    priceCalc (price) {
      return (price * this.getRate()).toFixed(2)
    },
    async setNewRate () {
      await this.$refs.form.validate()
      if ( !this.validForm) return
      this.updRate(this.newRate)
    }
  }
}
</script>
<style lang="scss" scoped>
.dot {
  flex: 1 0;
  border-bottom: 1px solid #000;
  height: 1em;
  margin: 0 .4em;
}
</style>
