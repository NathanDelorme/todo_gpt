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
            <router-link to="/login" :class="{ 'nav-link active': $route.path === '/login', 'nav-link': $route.path !== '/login' }">Login</router-link>
          </li>
          <li className="nav-item">
            <router-link to="/register" :class="{ 'nav-link active': $route.path === '/register', 'nav-link': $route.path !== '/register' }">Register</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'DefaultNavbarComponent'
}
</script>
