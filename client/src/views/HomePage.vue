<template>
  <main v-if="user" class="container mt-5">
    <section>
      <h1 class="text-center mb-4">Todo GPT - AI based Todo List application !</h1>
      <div class="row justify-content-center">
        <div class="col-md-6">
          <p class="text-center">Logged as {{ user.email }}</p>
        </div>
      </div>
    </section>
    <section>
      <div class="d-grid gap-3">
        <GPTTasksCreatorComponent :todolists="todolists" v-on:request-chat-gpt="requestChatGPT"/>
        <ToDoListCreatorComponent v-on:create-to-do-list="createTodolist"/>
        <div>
          <TodoListComponent v-for="(todolist) in todolists"
                             :key="todolist.idTodolist"
                             :id="todolist.idTodolist"
                             :todolists="todolists"
                             :isEditing="false"
                             :showTasks="false"
                             :user="user"
                             :tasks="tasks"
                             v-on:remove-to-do-list="deleteTodolist"
                             v-on:update-to-do-list="updateTodolist"
                             v-on:create-task="createTask"
                             v-on:delete-task="deleteTask"
                             v-on:update-task="updateTask"/>
        </div>
      </div>
    </section>
  </main>
  <div v-else>{{ this.$router.push({ name: 'login' }) }}</div>
</template>

<script>
import TodoListComponent from '@/components/TodoListComponent.vue'
import TodolistDataService from '@/services/TodolistDataService'
import ToDoListCreatorComponent from '@/components/ToDoListCreatorComponent'
import TaskDataService from '@/services/TaskDataService'
import GPTTasksCreatorComponent from '@/components/GPTTaskCreatorComponent'

export default {
  components: { GPTTasksCreatorComponent, ToDoListCreatorComponent, TodoListComponent },
  name: 'HomePage',
  props: ['user', 'todolists', 'tasks'],
  methods: {
    deleteTodolist (id) {
      TodolistDataService.delete(id).then(response => {
        TodolistDataService.getAllOfUser(this.user.idUser).then(response => {
          this.$store.dispatch('todolists', response.data.todolists)
        })
      })
    },
    updateTodolist (todolist) {
      todolist.lastModifiedDate = new Date()
      TodolistDataService.update(todolist.idTodolist, todolist).then(response => {})
    },
    createTodolist (todolist) {
      todolist.idUser = this.user.idUser
      TodolistDataService.create(todolist).then(response => {
        TodolistDataService.getAllOfUser(this.user.idUser).then(response => {
          this.$store.dispatch('todolists', response.data.todolists)
        })
      })
    },
    createTask (task) {
      TaskDataService.create(task).then(response => {
        this.$store.dispatch('createTask', response.data)
      })
    },
    deleteTask (task) {
      TaskDataService.delete(task.idTask).then(response => {
        this.$store.dispatch('removeTask', task)
      })
    },
    updateTask (task) {
      TaskDataService.update(task.idTask, task).then(response => { })
    },
    requestChatGPT (data) {
      TaskDataService.requestGPT(data).then(response => {
        for (const task of response.data.tasks) {
          this.$store.dispatch('createTask', task)
        }
      })
    }
  }
}
</script>
