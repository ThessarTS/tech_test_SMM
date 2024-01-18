<script>
import { mapState, mapActions } from 'pinia';
import { useAppStore } from '../stores/app';
export default {
  props: ['request', 'index'],
  computed: {
    ...mapState(useAppStore, ['detailRequest']),
    createdDate() {
      return this.request.createdAt.split('T')[0].split('-').reverse().join('-');
    },
    dateToShow() {
      return this.detailRequest.createdAt.slice(0, 16);
    },
  },
  methods: {
    ...mapActions(useAppStore, ['fetchRequestById', 'updateRequest']),
    openDetailModal() {
      this.$emit('open-detail', this.request);
    },

    handleApprove(id) {
      this.updateRequest(id, { status: 'approved' });
    },

    handleReject(id) {
      this.updateRequest(id, { status: 'rejected' });
    },
  },
};
</script>

<template>
  <div id="content" class="row my-3 shadow">
    <div class="col-1">{{ index + 1 }}</div>
    <div class="col-2">{{ createdDate }}</div>
    <div class="col-2">{{ request.User.department }}</div>
    <div class="col-2">{{ request.User.name }}</div>
    <div v-if="request.status != 'requested'" class="col-3" style="padding-left: 80px">
      <h6>{{ request.status }}</h6>
    </div>
    <div v-if="request.status == 'requested'" class="col-3">
      <button @click="handleApprove(request.id)" type="button" class="btn btn-sm btn-primary col-4 me-1">Approve</button>
      <button @click="handleReject(request.id)" type="button" class="btn btn-sm btn-danger col-4 ms-1">Reject</button>
    </div>
    <div class="col-1">
      <button @click.prevent="fetchRequestById(request.id)" type="button" class="btn" data-bs-toggle="modal" data-bs-target="#exampleModal">Detail>></button>
    </div>
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-xl">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5 text-dark" id="exampleModalLabel">Detail Permintaan Barang</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div v-if="detailRequest" class="modal-body">
            <!-- modal Body -->
            <div class="row">
              <div class="col-4">
                <label class="text-dark">NIK Peminta :</label>
                <input class="form-control" type="text" :value="detailRequest.User.NIK" disabled />
              </div>
              <div class="col-4">
                <label class="text-dark">Nama :</label>
                <input class="form-control" type="text" :value="detailRequest.User.name" disabled />
              </div>
              <div class="col-4">
                <label class="text-dark">Departemen :</label>
                <input class="form-control" type="text" :value="detailRequest.User.department" disabled />
              </div>
            </div>
            <div class="row my-5">
              <div class="col-4 pe-3">
                <label class="text-dark">Tanggal Permintaan :</label>
                <input type="datetime-local" class="form-control" v-model="dateToShow" disabled />
              </div>
              <div class="col-4 pe-3">
                <label class="text-dark">Status Permintaan :</label>
                <input type="text" class="form-control" :value="detailRequest.status" disabled />
              </div>
            </div>
            <h4 class="mb-4 mt-5 text-dark">Daftar Barang</h4>
            <table class="table table-striped mb-5">
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
                <tr class="text-center" v-for="(el, index) in detailRequest.RequestedItems" :key="index">
                  <td>{{ index + 1 }}</td>
                  <td>{{ el.Item.name }}</td>
                  <td>{{ el.Item.location }}</td>
                  <td>{{ el.Item.stock }}</td>
                  <td>{{ el.Item.unit }}</td>
                  <td>{{ el.quantity }}</td>
                  <td>{{ el.note }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
#content {
  height: 50px;
  align-items: center;
  justify-content: center;
  background-color: var(--grey);
}
</style>
