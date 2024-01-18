<script>
import RequestRow from '../components/RequestRow.vue';
import { useAppStore } from '../stores/app';
import { mapActions, mapState } from 'pinia';

export default {
  components: {
    RequestRow,
  },
  data() {
    return {
      selectedRequest: null,
    };
  },
  computed: {
    ...mapState(useAppStore, ['requestList']),
  },
  methods: {
    ...mapActions(useAppStore, ['fetchRequestList']),
    openModal(request) {
      this.selectedRequest = request;
    },
    closeModal() {
      this.selectedRequest = null;
    },
  },
  created() {
    this.fetchRequestList();
  },
};
</script>

<template>
  <div class="container pt-5">
    <h1 class="text-center" style="color: var(--primary)">List Permintaan Barang</h1>
    <div class="my-5">
      <div class="row justify-content-center">
        <div class="col-1 h5">#</div>
        <div class="col-2 h5">Tanggal</div>
        <div class="col-2 h5">Departemen</div>
        <div class="col-2 h5">Nama</div>
        <div class="col-3 h5">Status / Action</div>
        <div class="col-1"></div>
      </div>
      <RequestRow v-for="(request, index) in requestList" :key="request.id" :request="request" :index="index" />
    </div>
  </div>
</template>
