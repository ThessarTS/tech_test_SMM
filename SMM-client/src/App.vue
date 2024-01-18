<script>
import Sidebar from './components/SidebarSection.vue';

export default {
  components: {
    Sidebar,
  },
};
</script>

<template>
  <div class="app">
    <!-- Sidebar -->
    <Sidebar />

    <!-- Content -->
    <router-view />
  </div>
</template>

<style lang="scss">
:root {
  --primary: #d6bd68;
  --grey: #64748b;
  --dark: #1e293b;
  --dark-alt: #334155;
  --light: #f1f5f9;
  --sidebar-width: 300px;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Fira sans', sans-serif;
  color: #f1f5f9;
}

body {
  background: var(--dark-alt);
}

button {
  cursor: pointer;
  appearance: none;
  border: none;
  outline: none;
  background: none;
}

.app {
  display: flex;

  main {
    flex: 1 1 0;
    padding: 2rem;

    @media (max-width: 1024px) {
      padding-left: 6rem;
    }
  }
}
</style>
