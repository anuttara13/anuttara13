<template>
  <div id="app2">
    <v-btn color="primary" dark v-on:click="getUser">Link1</v-btn>
    <h4>Link1 : {{user}}</h4>
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'
export default {
  name: 'App2',
  methods: {
    ...mapActions({
      getUser: 'getUser'
    })
  },
  computed: {
    ...mapState({
      user: state => state.user
    })
  }
}
</script>

<style>

</style>