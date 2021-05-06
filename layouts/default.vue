<template>
  <v-app dark>
    <main-header/>
    <v-main>
      <v-container>
        <nuxt/>
      </v-container>
    </v-main>
    <main-footer/>
  </v-app>
</template>

<script>
import MainHeader from '../components/MainHeader'
import MainFooter from '../components/MainFooter'

export default {
  components: { MainFooter, MainHeader }
}
</script>
