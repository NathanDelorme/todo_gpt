<template>
  <li class="list-group-item">
    <div class="d-flex align-items-center justify-content-between">
      <div class="form-check">
        <input class="form-check-input" type="checkbox" v-model="task.isFinished" @change="updateTask">
        <label class="form-check-label" v-bind:class="{'text-decoration-line-through': task.isFinished}" v-if="!this.localIsEditing">{{ task.title }}</label>
        <input type="text" class="form-control" v-model="task.title" v-if="this.localIsEditing" v-on:keyup.enter="this.localIsEditing = false">
      </div>
      <div>
        <select class="form-select form-select-sm" v-model.number="task.priority" v-bind:disabled="!this.localIsEditing" @change="updateTask">
          <option value="2">Urgent</option>
          <option value="1">Important</option>
          <option value="0">Not important</option>
        </select>
        <button type="button" class="btn btn-primary" v-on:click="toggleEditing">{{ this.localIsEditing ? 'Save' : 'Modify' }}</button>
        <button type="button" class="btn btn-danger" v-on:click="deleteTask">Remove</button>
      </div>
    </div>
  </li>
</template>

<script>
export default {
  name: 'TaskComponent',
  props: ['user', 'todolists', 'tasks', 'todolistId', 'id', 'isEditing'],
  emits: ['update-task', 'delete-task'],
  data () {
    return {
      task: this.tasks[this.todolistId].find(item => item.idTask === this.id),
      localIsEditing: false
    }
  },
  created () {
  },
  methods: {
    toggleEditing () {
      this.localIsEditing = !this.localIsEditing
      if (!this.localIsEditing) {
        this.updateTask()
      }
    },
    updateTask () {
      console.log('update 1')
      this.$emit('update-task', this.task)
    },
    deleteTask () {
      this.$emit('delete-task', this.task)
    }
  }
}
</script>
