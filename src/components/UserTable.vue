<template>
  <q-page class="row items-center justify-evenly">
    <div class="q-pa-md">
    <q-table
      flat bordered
      subject="Users"
      :rows="users"
      :columns="columns"
      row-key="id"
      v-model:pagination="pagination"
      hide-pagination
      @row-click="onRowClick = true"
    />

    <div class="row justify-center q-mt-md">
      <q-pagination
        v-model="pagination.page"
        color="grey-8"
        :max="pagesNumber"
        size="sm"
      />
    </div>
  </div>

  <div class="q-pa-md q-gutter-sm">
    <q-dialog v-model="onRowClick" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <q-form
      class="q-gutter-md"
    >
      <div class="group">
      <q-input
        outlined
        v-model="cpf"
        label="CPF *"
        hint="cpf"
        lazy-rules
        :rules="[ val => {
            const regex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/
            if(val && !regex.test(val)) return 'Por favor, insira um CPF válido'
            return true
          }]"
      />

      <q-input
        outlined
        v-model="firstName"
        label="Nome *"
        hint="fist name"
        lazy-rules
        :rules="[ val => {
            const regex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s-]{1,20}$/
            if(val && !regex.test(val)) return 'Por favor, insira um Nome válido'
            return true
          }]"
      />

      <q-input
        outlined
        v-model="lastName"
        label="Sobrenome *"
        hint="last name"
        lazy-rules
        :rules="[ val => {
            const regex = /^[A-Za-zÀ-ÖØ-öø-ÿ\s-]{1,20}$/
            if(val && !regex.test(val)) return 'Por favor, insira um Sobrenome válido'
            return true
          }]"
      />
      </div>
      <div class="group">
      <q-input
        outlined
        v-model="birthdate"
        label="Data de nascimento *"
        type="date"
        hint="Native date"
        lazy-rules
      />

      <q-input
        outlined
        v-model="email"
        label="Email *"
        hint="email"
        lazy-rules
        :rules="[ val => {
            const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
            if(val && !regex.test(val)) return 'Por favor, insira um Email válido'
            return true
          }]"
      />

      <q-select
        outlined
        v-model="gender"
        :options="options"
        label="Gênero *"
        hint="gender"
      />
      </div>
    </q-form>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Cancelar" color="primary" v-close-popup />
          <q-btn flat label="Deletar" color="primary" v-close-popup />
          <q-btn flat label="Atualizar" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>

  </q-page>
</template>

<script lang="ts">
import { defineComponent, computed, ref, onMounted } from 'vue'
import { User } from '../components/models'

export default defineComponent({
  name: 'UserTable',
  setup () {
    const pagination = ref({
      sortBy: 'desc',
      descending: false,
      page: 1,
      rowsPerPage: 10
    })

    const users = ref<User[]>([])

    const columns = [
      {
        name: 'id',
        required: true,
        label: 'ID',
        align: 'left',
        field: 'id'
      },
      {
        name: 'cpf',
        required: true,
        label: 'CPF',
        align: 'left',
        field: 'cpf'
      },
      {
        name: 'firstName',
        required: true,
        label: 'Nome',
        align: 'left',
        field: 'firstName'
      },
      {
        name: 'lastName',
        required: true,
        label: 'Sobrenome',
        align: 'left',
        field: 'lastName'
      },
      {
        name: 'birthdate',
        required: true,
        label: 'Nascimento',
        align: 'left',
        field: 'birthdate'
      },
      {
        name: 'email',
        required: true,
        label: 'Email',
        align: 'left',
        field: 'email'
      },
      {
        name: 'gender',
        required: true,
        label: 'Gênero',
        align: 'left',
        field: 'gender'
      }
    ]

    const onRowClick = ref(false)

    onMounted(async () => {
      users.value = [{
        id: 1,
        cpf: '123',
        firstName: 'Venilton',
        lastName: 'Santos',
        birthdate: '01/01/2000',
        email: 'k4qJZ@example.com',
        gender: 'Masculino'
      },
      {
        id: 2,
        cpf: '123',
        firstName: 'Venilton',
        lastName: 'Santos',
        birthdate: '01/01/2000',
        email: 'k4qJZ@example.com',
        gender: 'Masculino'
      }
      ]
    })

    return {
      pagination,
      columns,
      users,
      onRowClick,

      pagesNumber: computed(() => Math.ceil(users.value.length / pagination.value.rowsPerPage))
    }
  }
})
</script>

<style scoped>
div {
  width: 90%;
  margin: 0 auto;
  padding: 10px;
  justify-content: center;
}
  .group {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  gap: 30px;
  }

  label {
  min-width: 150px;
  margin-bottom: 10px;
}
</style>
