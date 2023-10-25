<template>
  <div>
    <div class="q-pa-md" style="max-width: 400px">

    <q-form
      @submit="onSubmit"
      @reset="onReset"
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
            const regex = /\d{11}/
            if(val && val.length <= 0) return 'Por favor, insira o dado'
            if(!regex.test(val)) return 'Por favor, insira um CPF válido'
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
            if(val && val.length <= 0) return 'Por favor, insira o dado'
            if(!regex.test(val)) return 'Por favor, insira um Nome válido'
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
            if(val && val.length <= 0) return 'Por favor, insira o dado'
            if(!regex.test(val)) return 'Por favor, insira um Sobrenome válido'
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
        :rules="[ val => val && val.length > 0 || 'Por favor, insira o dado']"
      />

      <q-input
        outlined
        v-model="email"
        label="Email *"
        hint="email"
        lazy-rules
        :rules="[ val => {
            const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
            if(val && val.length <= 0) return 'Por favor, insira o dado'
            if(!regex.test(val)) return 'Por favor, insira um Email válido'
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

      <div class="btnGroup">
        <q-btn label="Inserir" type="submit" color="info"/>
        <q-btn label="Recomeçar" type="reset" color="info" flat class="q-ml-sm" />
      </div>

    </q-form>

  </div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'
import { useQuasar } from 'quasar'

export default defineComponent({
  name: 'UserForm',
  setup () {
    const $q = useQuasar()

    const cpf = ref(null)
    const firstName = ref(null)
    const lastName = ref(null)
    const birthdate = ref(null)
    const email = ref(null)
    const gender = ref(null)

    return {
      cpf,
      firstName,
      lastName,
      birthdate,
      email,
      gender,
      options: ['Masculino', 'Feminino', 'Transexual', 'Cisgênero', 'Gênero fluído', 'Gênero fluido', 'Não-binário', 'Agênero', 'Dois-espíritos', 'Andrógino', 'Bígênero', 'Demigênero', 'Gênero não conforming', 'Neutrois', 'Pangênero', 'Terceiro gênero'],

      onSubmit () {
        $q.notify({
          color: 'green-4',
          textColor: 'white',
          icon: 'cloud_done',
          message: 'Submitted'
        })
      },

      onReset () {
        cpf.value = null
        firstName.value = null
        lastName.value = null
        birthdate.value = null
        email.value = null
        gender.value = null
      }
    }
  }
})
</script>

<style scoped>
  .group {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  gap: 30px;
  }
  label {
  min-width: 250px;
  margin-bottom: 10px;
}
.btnGroup{
  margin-top: 30px;
  display: flex;
  justify-content: center;
}
</style>
