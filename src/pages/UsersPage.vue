<template>
  <q-page>
    <div>
      <UserTable/>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import UserTable from '../components/UserTable.vue'

export default defineComponent({
  name: 'UsersPage',
  components: {
    UserTable
  }
})
</script>
