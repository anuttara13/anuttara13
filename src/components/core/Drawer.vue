<template>
  <v-navigation-drawer
    id="app-drawer"
    v-model="inputValue"
    app
    dark
    floating
    persistent
    mobile-break-point="991"
    width="260"
  >
      <v-layout
        class="fill-height"
        tag="v-list"
        column
      >
        <v-list-tile
          v-for="(link, i) in links"
          :key="i"
          :to="link.to"
          :active-class="color"
          avatar
          class="v-list-item"
        >
        <router-link
            v-ripple
            slot="activator"
            class="toolbar-items"
            :to="link.to"
          >
          <v-list-tile-action>
            <v-icon>{{ link.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-title
            v-text="link.text"
          />
          </router-link>
        </v-list-tile>

         <v-list-tile
          class="v-list-item"
        >
        <router-link>
          <v-list-tile-action>
            aaaaaaaaaaaaaaa
          </v-list-tile-action>
          </router-link>
        </v-list-tile>
        <v-list-tile
          class="v-list-item"
        >
        <router-link>
          <v-list-tile-action>
            aaaaaaaaaaaaaaa
          </v-list-tile-action>
          </router-link>
        </v-list-tile>
      </v-layout>
  </v-navigation-drawer>
</template>

<script>
// Utilities
import {
  mapMutations,
  mapState
} from 'vuex'

export default {
  props: {
    opened: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    logo: 'favicon.ico',
    links: [
      {
        to: '/Dashboard',
        icon: 'mdi-view-dashboard',
        text: 'Dashboard'
      },
      {
        to: '/user-profile',
        icon: 'mdi-account',
        text: 'UserProfile'
      },
      {
        to: '/notifications',
        icon: 'mdi-account',
        text: 'notifications'
      },
      {
        to: '/UserManagement',
        icon: 'mdi-account',
        text: 'UserManagement'
      },
      {
        to: '/LastMovie',
        icon: 'mdi-account',
        text: 'LastMovie'
      },
      {
        to: '/test',
        icon: 'mdi-account',
        text: 'test'
      }
    ]
  }),
  computed: {
    ...mapState('app', ['image', 'color']),
    inputValue: {
      get () {
        return this.$store.state.app.drawer
      },
      set (val) {
        this.setDrawer(val)
      }
    },
    items () {
      return this.$t('Layout.View.items')
    }
  },

  methods: {
    ...mapMutations('app', ['setDrawer', 'toggleDrawer'])
  }
}
</script>

<style lang="scss">
  #app-drawer {
    .v-list__tile {
      border-radius: 4px;

      &--buy {
        margin-top: auto;
        margin-bottom: 17px;
      }
    }
  }
</style>
