import { defineStore } from 'pinia'
import axios from 'axios'
import Swal from 'sweetalert2'

export const useAppStore = defineStore('app', {
  state: () => ({
    baseUrl: 'http://localhost:3000',
    requestList: [],
    users: [],
    items: [],
    detailRequest: ''
  }),
  actions: {
    async fetchRequestList() {
      try {
        let { data } = await axios.get(this.baseUrl + '/requests')
        this.requestList = data
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: `${error.response.status}`,
          text: `${error.response.data.message}`
        })
      }
    },

    async fetchRequestById(value) {
      try {
        let { data } = await axios.get(this.baseUrl + '/requests/' + value)
        this.detailRequest = data
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: `${error.response.status}`,
          text: `${error.response.data.message}`
        })
      }
    },

    async fetchUsers() {
      try {
        let { data } = await axios.get(this.baseUrl + '/users')
        this.users = data
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: `${error.response.status}`,
          text: `${error.response.data.message}`
        })
      }
    },

    async fetchItems() {
      try {
        let { data } = await axios.get(this.baseUrl + '/items')
        this.items = data
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: `${error.response.status}`,
          text: `${error.response.data.message}`
        })
      }
    },

    async addNewRequest(value) {
      try {
        await axios.post(this.baseUrl + '/requests', value)
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: `Permintaan barang berhasil ditambahkan`,
          showConfirmButton: false,
          timer: 3000
        })
        this.$router.push('/')
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: `${error.response.status}`,
          text: `${error.response.data.message}`
        })
      }
    },

    async updateRequest(id, value) {
      try {
        await axios.patch(this.baseUrl + '/requests/' + id, value)
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: `Status permintaan barang dengan id: ${id} berhasil diubah menjadi '${value.status}'`,
          showConfirmButton: false,
          timer: 3000
        })
        this.fetchRequestList()
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: `${error.response.status}`,
          text: `${error.response.data.message}`
        })
      }
    },


  },
})
