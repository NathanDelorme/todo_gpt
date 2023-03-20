<template>
  <h2 class="text-center mb-4">Register</h2>
  <div class="row justify-content-center">
    <div class="col-md-6">
      <form @submit.prevent="submitForm">
        <div class="mb-3">
          <label for="email" class="form-label">Email address</label>
          <input type="email" class="form-control" id="email" v-model="userLog.email" placeholder="name@example.com" required>
        </div>
        <div class="mb-3">
          <label for="emailVerify" class="form-label" >Verify Email address</label>
          <input type="email" class="form-control" id="emailVerify" v-model="emailVerify" placeholder="name@example.com" required>
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Password</label>
          <input type="password" class="form-control" id="password" v-model="userLog.password" placeholder="enter your password" required>
        </div>
        <div class="mb-3">
          <label for="passwordVerify" class="form-label">Verify Password</label>
          <input type="password" class="form-control" id="passwordVerify" v-model="passwordVerify" placeholder="enter your password" required>
        </div>
        <div class="d-grid">
          <button type="submit" class="btn btn-primary">Register</button>
          <div v-if="errorOccurs" class="text-danger">{{ errorMessage }}</div>
          <div v-if="success" class="text-success">Your account has been created. You can login.</div>
        </div>
      </form>
      <div class="text-center mt-3">
        <p>Already have an account? <router-link to="/login">Login here</router-link></p>
      </div>
    </div>
  </div>
</template>

<script>
import UserDataService from '@/services/UserDataService'

export default {
  name: 'RegisterPage',
  props: ['user', 'todolists', 'tasks'],
  data () {
    return {
      userLog: {
        email: '',
        password: ''
      },
      emailVerify: '',
      passwordVerify: '',
      errorOccurs: false,
      errorMessage: '',
      success: false
    }
  },
  methods: {
    submitForm () {
      this.success = false
      if (this.userLog.email !== this.emailVerify) {
        this.errorOccurs = true
        this.errorMessage = 'Emails must be similar'
        return
      }
      if (this.userLog.password !== this.passwordVerify) {
        this.errorOccurs = true
        this.errorMessage = 'Passwords must be similar'
        return
      }

      UserDataService.create(this.userLog).then(response => {
        this.success = true
        this.errorOccurs = false
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
    document.title = 'Todo GPT - Register'
  }
}
</script>
