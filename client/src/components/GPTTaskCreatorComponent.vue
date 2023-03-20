<template>
  <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">AI Generated To Do List</button>

  <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Ask Chat GPT to create a to do list about something :</h5>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label for="selectOption">Select a To Do List :</label>
            <select class="form-control" id="selectOption" v-model="selectedToDoList">
              <option value="" disabled>Select a To Do List</option>
              <option v-for="(todolist, index) in todolists" :key="index" :value="todolist">{{ todolist.title }}</option>
            </select>
          </div>
          <div class="form-group">
            <label for="questionTextarea">Describe your desired to do list :</label>
            <textarea class="form-control" id="questionTextarea" rows="3" v-model="question" maxlength="400" placeholder="Write about the goal and the requirement of your To Do List"></textarea>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" :disabled="!selectedToDoList || !question" @click="sendRequest" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Create tasks</button>
          <button type="button" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GPTTasksCreatorComponent',
  props: ['todolists'],
  emits: ['request-chat-gpt'],
  data () {
    return {
      localTodoLists: this.todolists,
      selectedToDoList: '',
      question: ''
    }
  },
  methods: {
    sendRequest () {
      this.$emit('request-chat-gpt', { selectedTodolist: this.selectedToDoList, question: this.question })
    }
  }
}
</script>

<style>
.modal {
  display: none;
}

.modal-dialog {
  max-width: 80%;
}

@media (min-width: 576px) {
  .modal-dialog {
    max-width: 60%;
  }
}

@media (min-width: 768px) {
  .modal-dialog {
    max-width: 50%;
  }
}

@media (min-width: 992px) {
  .modal-dialog {
    max-width: 40%;
  }
}

@media (min-width: 1200px) {
  .modal-dialog {
    max-width: 30%;
  }
}
</style>
