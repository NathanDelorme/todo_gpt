<template>
  <button type="button" class="btn btn-outline-primary" data-bs-toggle="modal" data-bs-target="#todoListCreator" >Create To Do List</button>
  <div class="modal fade" id="todoListCreator" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">To Do List Creator</h5>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label for="titleInput">Title :</label>
            <input type="text" class="form-control text-center" id="titleInput" v-model="title">
            <label for="descriptionTextarea">Description :</label>
            <textarea class="form-control text-center" id="descriptionTextarea" rows="3" v-model="description" maxlength="1000"></textarea>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" :disabled="!description || !title" @click="createToDoList" data-bs-toggle="modal" data-bs-target="#todoListCreator">Create to do list</button>
          <button type="button" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#todoListCreator">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ToDoListCreatorComponent',
  emits: ['create-to-do-list'],
  data () {
    return {
      title: '',
      description: ''
    }
  },
  methods: {
    createToDoList () {
      const newTodoList = {
        title: this.title,
        description: this.description,
        creationDate: new Date(),
        lastModifiedDate: new Date()
      }
      this.title = ''
      this.description = ''
      this.$emit('create-to-do-list', newTodoList)
    }
  }
}
</script>
