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

      <q-banner v-if="msg !== ''" class="bg-positive text-black">
        {{msg}}
      </q-banner>

  </div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'
import { Data } from './data'

export default defineComponent({
  name: 'UserForm',
  setup () {
    const cpf = ref('')
    const firstName = ref('')
    const lastName = ref('')
    const birthdate = ref('')
    const email = ref('')
    const gender = ref('')
    const msg = ref<string>('')

    return {
      cpf,
      firstName,
      lastName,
      birthdate,
      email,
      gender,
      msg,
      options: ['Masculino', 'Feminino', 'Transexual', 'Cisgênero', 'Gênero fluído', 'Não-binário', 'Agênero', 'Dois-espíritos', 'Andrógino', 'Bígênero', 'Demigênero', 'Gênero não conforming', 'Neutrois', 'Pangênero', 'Terceiro gênero'],

      onSubmit () {
        if (cpf.value.length <= 0 || firstName.value.length <= 0 || lastName.value.length <= 0 || birthdate.value.length <= 0 || email.value.length <= 0 || gender.value.length <= 0) {
          alert('Por favor, preencha todos os campos')
        }

        const entity = {
          id: 1,
          cpf: cpf.value,
          first_name: firstName.value,
          last_name: lastName.value,
          birthdate: birthdate.value,
          email: email.value,
          gender: gender.value
        }

        Data.create(entity)

        msg.value = 'Inserido com sucesso'
        setTimeout(() => {
          msg.value = ''
          return msg
        }, 2000)
      },
      onReset () {
        cpf.value = ''
        firstName.value = ''
        lastName.value = ''
        birthdate.value = ''
        email.value = ''
        gender.value = ''
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
