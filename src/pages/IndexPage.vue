<template>
  <q-page class="row items-center justify-evenly">
    <UserForm/>
  </q-page>
</template>

<script lang="ts">
import UserForm from 'src/components/UserForm.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'IndexPage',
  components: { UserForm }
})
</script>
