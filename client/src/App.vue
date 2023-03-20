<template>
  <header>
    <DefaultNavbarComponent v-if="$route.path === '/login' || $route.path === '/' || $route.path === '/register'" />
    <LoggedNavbarComponent v-else/>
  </header>
  <main>
    <div class="container-sm mt-3">
      <div class="card">
        <div class="card-body">
          <router-view
            :user="user"
            :todolists="todolists"
            :tasks="tasks"
          />
        </div>
      </div>
    </div>
  </main>
  <footer>
    <FooterComponent />
  </footer>
</template>

<script>
import DefaultNavbarComponent from '@/components/DefaultNavbarComponent.vue'
import LoggedNavbarComponent from '@/components/LoggedNavbarComponent.vue'
import FooterComponent from '@/components/FooterComponent.vue'
import { mapGetters } from 'vuex'

export default {
  name: 'App',
  components: {
    FooterComponent,
    LoggedNavbarComponent,
    DefaultNavbarComponent
  },
  computed: {
    ...mapGetters(['user']),
    ...mapGetters(['todolists']),
    ...mapGetters(['tasks'])
  }
}
</script>
