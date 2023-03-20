<template>
  <div class="mb-3">
    <div class="card text-center">
      <div class="card-header text-muted">{{ todolist.lastModifiedDate }}</div>
      <div class="card-body">
        <div>
          <h5 class="card-title" v-if="!localIsEditing">{{ todolist.title }}</h5>
          <input type="text" class="form-control text-center" v-if="localIsEditing" v-model="todolist.title">
        </div>
        <div>
          <p class="card-text lh-base" style="white-space: pre-line;" v-if="!localIsEditing">{{ todolist.description }}</p>
          <textarea class="form-control text-center" v-if="localIsEditing" v-model="todolist.description"></textarea>
        </div>
        <br>
        <div class="progress">

          <div class="progress-bar" role="progressbar" :style="'width: ' + urgentPercent + '%; background-color: darkred'"></div>
          <div class="progress-bar" role="progressbar" :style="'width: ' + importantPercent + '%; background-color: darkorange'"></div>
          <div class="progress-bar" role="progressbar" :style="'width: ' + notImportantPercent + '%; background-color: forestgreen'"></div>

        </div>
        <br>
        <br>
        <div class="btn-group" role="group">
          <input type="checkbox" class="btn-check" :id="'toggleTasks' + todolist.idTodolist"  autocomplete="off" @click="toggleTasks">
          <label class="btn btn-primary" :for="'toggleTasks' + todolist.idTodolist">{{ localShowTasks ? 'Hide tasks' : 'Show tasks' }}</label><br>
          <input type="checkbox" class="btn-check" :id="'toggleEditing' + todolist.idTodolist" autocomplete="off" @click="toggleEdit">
          <label class="btn btn-warning" :for="'toggleEditing' + todolist.idTodolist">{{ localIsEditing ? 'Save' : 'Modify' }}</label><br>
          <button class="btn btn-danger" @click.stop="deleteTodolist">Delete</button>
        </div>
        <div v-if="localShowTasks" class="text-start">
          <hr>
          <div class="d-grid mb-3">
            <TaskCreatorComponent :tasks="tasks" :todolistID="id" v-on:create-task="createTask"/>
          </div>
          <TaskComponent class="mb-3"
                         v-for="(task) in tasks[this.id]"
                         :key="task.idTask"
                         :id="task.idTask"
                         :tasks="tasks"
                         :user="user"
                         :todolists="todolists"
                         :todolistId="this.id"
                         :isEditing="false"
                         v-on:delete-task="deleteTask"
                         v-on:update-task="updateTask"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TaskComponent from '@/components/TaskComponent'
import TaskCreatorComponent from '@/components/TaskCreatorComponent'

export default {
  components: { TaskCreatorComponent, TaskComponent },
  props: ['user', 'todolists', 'tasks', 'id', 'isEditing', 'showTasks'],
  emits: ['remove-to-do-list', 'update-to-do-list', 'create-task', 'delete-task', 'update-task'],
  data () {
    return {
      todolist: this.todolists.find(item => item.idTodolist === this.id),
      localIsEditing: this.isEditing,
      localShowTasks: this.showTasks,
      urgentPercent: 0,
      importantPercent: 0,
      notImportantPercent: 0
    }
  },
  watch: {
    tasks: {
      deep: true,
      handler () {
        this.urgentPercent = this.getTasksPourcentage(2)
        this.importantPercent = this.getTasksPourcentage(1)
        this.notImportantPercent = this.getTasksPourcentage(0)
      }
    }
  },
  created () {
    this.urgentPercent = this.getTasksPourcentage(2)
    this.importantPercent = this.getTasksPourcentage(1)
    this.notImportantPercent = this.getTasksPourcentage(0)
  },
  methods: {
    getTasksPourcentage (importance) {
      if (this.tasks === null || this.tasks === undefined || this.tasks[this.id] === null || this.tasks[this.id] === undefined || this.tasks[this.id].length === 0) {
        return 0
      }
      return this.tasks[this.id].filter(item => item.priority === importance && item.isFinished === true).length * 100 / this.tasks[this.id].length
    },
    createTask (task) {
      this.$emit('create-task', task)
    },
    deleteTask (task) {
      this.$emit('delete-task', task)
    },
    updateTask (task) {
      console.log('update 2')
      this.$emit('update-task', task)
    },
    deleteTodolist () {
      this.$emit('remove-to-do-list', this.id)
    },
    updateTodolist () {
      this.$emit('update-to-do-list', this.todolist)
    },
    toggleEdit () {
      this.localIsEditing = !this.localIsEditing
      if (!this.localIsEditing) {
        this.updateTodolist()
      }
    },
    toggleTasks () {
      this.localShowTasks = !this.localShowTasks
    }
  }
}
</script>
