<template>
  <h2 class="text-center mb-4">Login</h2>
  <div class="row justify-content-center">
    <div class="col-md-6">
      <form @submit.prevent="login">
        <div class="mb-3">
          <label for="email" class="form-label">Email address</label>
          <input type="email" class="form-control" id="email" v-model="userLog.email" placeholder="name@example.com" required>
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Password</label>
          <input type="password" class="form-control" id="password" v-model="userLog.password" placeholder="enter your password" required>
        </div>
        <div class="d-grid">
          <button type="submit" class="btn btn-primary">Login</button>
          <div v-if="errorOccurs" class="text-danger">{{ errorMessage }}</div>
        </div>
      </form>
      <div class="text-center mt-3">
        <p>Don't have an account? <router-link to="/register">Register here</router-link></p>
      </div>
    </div>
  </div>
</template>

<script>
import UserDataService from '@/services/UserDataService'
import router from '@/routers'
import TodolistDataService from '@/services/TodolistDataService'
import TaskDataService from '@/services/TaskDataService'

export default {
  name: 'LoginPage',
  props: ['user', 'todolists', 'tasks'],
  data () {
    return {
      userLog: {
        email: '',
        password: ''
      },
      errorOccurs: false,
      errorMessage: ''
    }
  },
  methods: {
    login () {
      UserDataService.postLogin(this.userLog).then(response => {
        this.$store.dispatch('user', response.data.user)

        TodolistDataService.getAllOfUser(response.data.user.idUser).then(response => {
          this.$store.dispatch('todolists', response.data.todolists)
          for (const todolist of response.data.todolists) {
            TaskDataService.getAllOfTodolist(todolist.idTodolist).then(response => {
              this.$store.dispatch('tasks', {
                tasks: response.data.tasks,
                idTodolist: todolist.idTodolist
              })
            })
          }
        }).catch(error => {
          if (error.response && error.response.data) {
            this.errorMessage = error.response.data.message
          } else {
            this.errorMessage = 'An error occurred while processing the request.'
          }
          this.errorOccurs = true
        })

        this.errorOccurs = false
        this.errorMessage = ''
        router.push({ path: 'home' })
      }).catch(error => {
        if (error.response && error.response.data) {
          this.errorMessage = error.response.data.message
        } else {
          this.errorMessage = 'An error occurred while processing the request.'
        }
        this.errorOccurs = true
      })
    }
  },
  created () {
    document.title = 'Todo GPT - Login'
  }
}
</script>
