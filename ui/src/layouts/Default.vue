<template>
  <q-layout view="hHh Lpr lff">
    <q-header elevated class="bg-gradient-primary">
      <q-toolbar>
        <q-btn flat @click="drawer = !drawer" round dense icon="eva-menu-outline" />
        <q-toolbar-title>
          BAMS BBTA3
        </q-toolbar-title>

        <q-btn
          flat
          dense
          round
          @click="goToTentang()"
          aria-label="Tentang">
          <q-icon name="eva-question-mark-circle-outline" />
        </q-btn>

        <q-btn
          flat
          dense
          round
          @click="cobaKeluar"
          aria-label="Keluar">
          <q-icon name="eva-log-out-outline" />
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-drawer
        v-model="drawer"
        show-if-above
        :mini="miniState"
        @mouseover="miniState = false"
        @mouseout="miniState = true"
        mini-to-overlay
        :width="180"
        :breakpoint="500"
        content-class="bg-grey-10">
        <q-scroll-area class="fit">
          <q-list padding class="text-white">
            <q-item :to="{name: 'dashboard'}" exact clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="eva-browser-outline" />
              </q-item-section>

              <q-item-section>
                DASHBOARD
              </q-item-section>
            </q-item>

            <q-item :to="{name: 'query'}" clickable v-ripple>
              <q-item-section avatar>
                <q-icon name="eva-search-outline" />
              </q-item-section>

              <q-item-section>
                QUERY
              </q-item-section>
            </q-item>
          </q-list>
        </q-scroll-area>
      </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'Default',
  data () {
    return {
      drawer: false,
      miniState: true,
      storageRef: null,
      showDialogPict: false,
      user: {
        id: '',
        hasAvatar: false,
        urlAvatar: ''
      }
    }
  },
  created() {
    this.$firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.user.id = user.uid
      }
    })
  },
  methods: {
    async cobaKeluar() {
      try {
        await this.$firebase.auth().signOut()
        this.$router.push('/masuk')
      } catch (err) {
        console.log(err.message)
      }
    },
    goToTentang() {
      this.$router.push({name: 'tentang'})
    }
  },
}
</script>

<style>
</style>
