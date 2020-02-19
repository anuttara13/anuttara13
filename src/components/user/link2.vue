<template>
  <div id="app3">
    <v-btn color="primary" dark v-on:click="getUser2">Link2</v-btn>
    <h4>Link2 : {{user2}}</h4>
  </div>
</template>

<script>
import {mapActions, mapState} from 'vuex'
export default {
  name: 'App3',
  methods: {
    ...mapActions({
      getUser2: 'getUser2'
    })
  },
  computed: {
    ...mapState({
      user2: state => state.user2
    })
  }
}
</script>

<style>

</style>