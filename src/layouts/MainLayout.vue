<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>

        <q-toolbar-title>
          Ip4ay
        </q-toolbar-title>

        <div class="btnGroup">
          <q-btn push color="info" label="Home" href="http://localhost:9000/#/"/>
          <q-btn push color="info" label="Users" href="http://localhost:9000/#/users"/>
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MainLayout',

  components: {
  },

  setup () {
    return {

    }
  }
})
</script>

<style scoped>
.btnGroup {
  display: flex;
  gap: 20px
}
</style>
