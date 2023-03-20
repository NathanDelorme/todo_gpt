<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary" style="background-color: whitesmoke">
    <div class="container-fluid">
      <h1 class="navbar-brand">Todo GPT</h1>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li className="nav-item">
            <router-link to="/login" @click="logout" class="nav-link">Logout</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import UserDataService from '@/services/UserDataService'
import router from '@/routers'

export default {
  name: 'LoggedNavbarComponent',
  props: ['logout'],
  logout () {
    UserDataService.getLogout().then(response => {
      this.$store.dispatch('user', null)
      router.push('login')
    })
  }
}
</script>
