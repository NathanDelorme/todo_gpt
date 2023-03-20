import http from '../http-common'

class TaskDataService {
  getAll () {
    return http.get('/task')
  }

  getAllOfTodolist (todolistId) {
    return http.get(`/task/${todolistId}`)
  }

  create (data) {
    return http.post('/task', data)
  }

  requestGPT (data) {
    return http.post('/task/gpt', data)
  }

  get (id) {
    return http.get(`/task/${id}`)
  }

  update (id, data) {
    return http.put(`/task/${id}`, data)
  }

  delete (id) {
    return http.delete(`/task/${id}`)
  }
}

export default new TaskDataService()
