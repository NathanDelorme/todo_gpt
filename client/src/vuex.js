import { createStore } from 'vuex'

export default createStore({
  state: {
    user: null,
    todolists: [],
    tasks: {}
  },
  getters: {
    user: (state) => {
      return state.user
    },
    todolists: (state) => {
      return state.todolists
    },
    tasks: (state) => {
      return state.tasks
    }
  },
  actions: {
    user (context, user) {
      context.commit('user', user)
    },
    todolists (context, todolists) {
      context.commit('todolists', todolists)
    },
    removeTask (context, taskToDelete) {
      context.commit('removeTask', taskToDelete)
    },
    createTask (context, taskToAdd) {
      context.commit('createTask', taskToAdd)
    },
    tasks (context, data) {
      context.commit('tasks', data)
    }
  },
  mutations: {
    user (state, user) {
      state.user = user
    },
    todolists (state, todolists) {
      state.todolists = todolists
    },
    tasks (state, data) {
      state.tasks[data.idTodolist] = []
      for (const task of data.tasks) {
        state.tasks[data.idTodolist].push(task)
      }
    },
    removeTask (state, taskToDelete) {
      const idx = state.tasks[taskToDelete.idTodolist].findIndex((obj) => obj.idTask === taskToDelete.idTask)
      if (idx !== -1) {
        state.tasks[taskToDelete.idTodolist].splice(idx, 1)
      }
    },
    createTask (state, taskToAdd) {
      if (state.tasks[taskToAdd.idTodolist] === null || state.tasks[taskToAdd.idTodolist] === undefined) {
        state.tasks[taskToAdd.idTodolist] = []
      }
      state.tasks[taskToAdd.idTodolist].push(taskToAdd)
    }
  }
})
