<template>
  <button type="button" class="btn btn-outline-primary" data-bs-toggle="modal" :data-bs-target="'#taskCreator' + this.todolistID" >Create Task</button>

  <div class="modal fade" :id="'taskCreator' + this.todolistID" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Task Creator</h5>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label for="titleTaskInput">Title :</label>
            <input type="text" class="form-control text-center" id="titleTaskInput" v-model="this.newTask.title">
            <select class="form-select form-select-sm" v-model.number="this.newTask.priority">
              <option value="2">Urgent</option>
              <option value="1">Important</option>
              <option value="0">Not important</option>
            </select>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" :disabled="!newTask.title" @click="createTask" data-bs-toggle="modal" :data-bs-target="'#taskCreator' + this.todolistID">Create to do list</button>
          <button type="button" class="btn btn-secondary" data-bs-toggle="modal" :data-bs-target="'#taskCreator' + this.todolistID">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TaskCreatorComponent',
  props: ['tasks', 'todolistID'],
  emits: ['create-task'],
  data () {
    return {
      newTask: {
        title: '',
        isFinished: false,
        priority: 0,
        idTodolist: null
      }
    }
  },
  methods: {
    createTask () {
      this.newTask.idTodolist = this.todolistID
      this.$emit('create-task', this.newTask)
    }
  }
}
</script>
