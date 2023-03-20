import http from '../http-common'

class TodolistDataService {
  getAll () {
    return http.get('/todolist')
  }

  getAllOfUser (userId) {
    return http.get(`/todolist/${userId}`)
  }

  create (data) {
    return http.post('/todolist', data)
  }

  get (id) {
    return http.get(`/todolist/${id}`)
  }

  update (id, data) {
    return http.put(`/todolist/${id}`, data)
  }

  delete (id) {
    return http.delete(`/todolist/${id}`)
  }
}
export default new TodolistDataService()
