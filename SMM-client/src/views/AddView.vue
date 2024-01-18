<script>
import { useAppStore } from '@/stores/app';
import { mapActions, mapState } from 'pinia';

export default {
  data() {
    return {
      selectedDate: this.getTodayDate(),
      selectedUser: {},
      idx: '',
      NIK: '',
      reqItems: [
        {
          id: '',
          name: '',
          unit: '',
          location: '',
          stock: '',
        },
      ],
      reqDetails: [
        {
          quantity: '',
          note: '',
        },
      ],
    };
  },
  computed: {
    ...mapState(useAppStore, ['users', 'items']),
  },
  methods: {
    ...mapActions(useAppStore, ['fetchUsers', 'fetchItems', 'addNewRequest']),
    getTodayDate() {
      const now = new Date();
      const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
        timeZone: 'Asia/Jakarta',
      };
      let date = now.toLocaleString('id-ID', options).split(',')[0].split('/').reverse().join('-');
      let time = now.toLocaleString('en-US', options).split(', ')[1];
      return date + 'T' + time;
    },

    getUser(nik) {
      let user = this.users.filter((u) => u.NIK === nik);
      return (this.selectedUser = user[0]);
    },

    addItemRow() {
      this.reqItems.push({
        id: '',
        name: '',
        unit: '',
        location: '',
        stock: '',
      }),
        this.reqDetails.push({
          quantity: '',
          note: '',
        });
    },

    removeItemRow() {
      if (this.reqItems.length > 1) {
        this.reqItems.pop();
        this.reqDetails.pop();
      }
    },

    handleSubmit() {
      let UserId = this.selectedUser.id;
      let items = [];
      this.reqItems.forEach((e, idx) => {
        items.push({
          ItemId: e.id,
          quantity: this.reqDetails[idx].quantity,
          note: this.reqDetails[idx].note,
        });
      });
      this.addNewRequest({ UserId, items });
    },
  },
  watch: {
    NIK(newNIK) {
      this.getUser(newNIK);
    },
  },
  created() {
    this.fetchUsers();
    this.fetchItems();
  },
};
</script>

<template>
  <div class="container my-5">
    <div class="mb-5 text-center">
      <h1 style="color: var(--primary)">Tambah Permintaan Barang</h1>
    </div>
    <div class="row">
      <div class="col-4">
        <label>NIK Peminta :</label>
        <input class="form-control" type="text" v-model="NIK" />
      </div>
      <div class="col-4">
        <label>Nama :</label>
        <input class="form-control" type="text" v-model="selectedUser.name" disabled />
      </div>
      <div class="col-4">
        <label>Departemen :</label>
        <input class="form-control" type="text" v-model="selectedUser.department" disabled />
      </div>
    </div>
    <div class="col-4 pe-3 my-5">
      <label>Tanggal Permintaan :</label>
      <input type="datetime-local" class="form-control" v-model="selectedDate" />
    </div>
    <h4 class="mb-4 mt-5">Daftar Barang</h4>
    <form @submit.prevent="handleSubmit()">
      <table class="table">
        <thead>
          <tr class="text-center">
            <th>#</th>
            <th>Nama Barang</th>
            <th>Lokasi</th>
            <th>Stock</th>
            <th>Unit</th>
            <th>Quantity</th>
            <th>Keterangan</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(reqItem, index) in reqItems" :key="index">
            <td>{{ index + 1 }}</td>
            <td class="px-1 col-4">
              <select class="form-control" v-model="reqItems[index]" required>
                <option style="color: dimgrey" value="" disabled>-select item-</option>
                <option v-for="item in items" :key="item.id" :value="item" style="color: black">
                  {{ item.name }}
                </option>
              </select>
            </td>
            <td class="px-1 col-1"><input class="form-control" v-model="reqItems[index].location" disabled /></td>
            <td class="px-1 col-1"><input class="form-control" v-model="reqItems[index].stock" disabled /></td>
            <td class="px-1 col-1"><input class="form-control" v-model="reqItems[index].unit" disabled /></td>
            <td class="px-1 col-1"><input type="number" min="0" :max="reqItems[index].stock" class="form-control" v-model="reqDetails[index].quantity" required /></td>
            <td class="px-1"><input class="form-control" v-model="reqDetails[index].note" /></td>
          </tr>
        </tbody>
      </table>
      <div class="w-100 text-end">
        <button class="btn btn-outline-danger btn-sm me-3" type="button" @click="removeItemRow">- Hapus</button>
        <button class="btn btn-outline-success btn-sm" type="button" @click="addItemRow">+ Tambah</button>
      </div>
      <div class="text-center mt-5">
        <router-link to="/" type="button" @click="$router.back()" class="btn btn-secondary col-2 me-2">Batal</router-link>
        <button type="submit" class="btn btn-primary col-2 ms-2">Proses</button>
      </div>
    </form>
  </div>
</template>
