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
      @row-click="onRowClick"
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
    <q-dialog v-model="onRow" persistent>
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
          <q-btn flat label="Cancelar" type="button" color="primary" v-close-popup />
          <q-btn flat label="Deletar" type="button" color="primary" @click="onDelete" v-close-popup />
          <q-btn flat label="Atualizar" type="button" color="primary" @click="onUpdate" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-banner v-if="msg !== ''" class="bg-positive text-black">
        {{msg}}
      </q-banner>
  </div>

  </q-page>
</template>

<script lang="ts">
import { defineComponent, computed, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { User, UserData } from '../components/models'
import { Data } from './data'

export default defineComponent({
  name: 'UserTable',
  setup () {
    const id = ref<number>()
    const cpf = ref('')
    const firstName = ref('')
    const lastName = ref('')
    const birthdate = ref('')
    const email = ref('')
    const gender = ref('')
    const msg = ref<string>('')

    const pagination = ref({
      sortBy: 'desc',
      descending: false,
      page: 1,
      rowsPerPage: 10
    })

    const users = ref<UserData[]>([])

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
        field: 'first_name'
      },
      {
        name: 'lastName',
        required: true,
        label: 'Sobrenome',
        align: 'left',
        field: 'last_name'
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

    const onRowClick = (event: MouseEvent, row: User) => {
      console.log(row)
      id.value = row.id
      onRow.value = true

      console.log(id.value)
    }

    const onRow = ref(false)
    const getData = () => {
      Data.get().then(response => {
        users.value = response.data
      })
    }

    const clearFilds = () => {
      cpf.value = ''
      firstName.value = ''
      lastName.value = ''
      birthdate.value = ''
      email.value = ''
      gender.value = ''
    }

    const router = useRouter()

    onMounted(async () => {
      getData()
    })

    const onUpdate = () => {
      const entity = {
        id: id.value,
        cpf: cpf.value !== '' ? cpf.value : undefined,
        first_name: firstName.value !== '' ? firstName.value : undefined,
        last_name: lastName.value !== '' ? lastName.value : undefined,
        birthdate: birthdate.value !== '' ? birthdate.value : undefined,
        email: email.value !== '' ? email.value : undefined,
        gender: gender.value !== '' ? gender.value : undefined
      }

      Data.update(entity)

      clearFilds()

      msg.value = 'Atualizado com sucesso'
      setTimeout(() => {
        msg.value = ''
        return msg
      }, 1000)

      setTimeout(() => {
        window.location.reload()
      }, 1500)
    }

    const onDelete = () => {
      const userId = id.value

      if (!userId) {
        return
      }

      Data.delete(userId)
      msg.value = 'Removido com sucesso'
      setTimeout(() => {
        msg.value = ''
        return msg
      }, 1000)

      setTimeout(() => {
        window.location.reload()
      }, 1500)
    }

    return {
      id,
      pagination,
      columns,
      users,
      onRowClick,
      onRow,
      cpf,
      firstName,
      lastName,
      birthdate,
      email,
      gender,
      msg,
      options: ['Masculino', 'Feminino', 'Transexual', 'Cisgênero', 'Gênero fluído', 'Não-binário', 'Agênero', 'Dois-espíritos', 'Andrógino', 'Bígênero', 'Demigênero', 'Gênero não conforming', 'Neutrois', 'Pangênero', 'Terceiro gênero'],
      onUpdate,
      onDelete,

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
