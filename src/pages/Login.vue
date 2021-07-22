<template>
<QPage class="flex flex-center">
  <QCard
    bordered
    class="q-pa-md"
    flat
  >
    <QCardSection class="q-py-md flex flex-center text-primary text-h5 text-bold">
      LOGIN
    </QCardSection>
    <QCardSection>
      <QForm
        class="q-gutter-md"
        @submit="onSubmit"
      >
        <QInput
          v-model="form.username"
          filled
          label="Username"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Porfavor ingrese su usuario']"
        />

        <QInput
          v-model="form.password"
          filled
          label="Password"
          lazy-rules
          :rules="[
            val => val !== null && val !== '' || 'Porfavor ingrese su clave',
          ]"
          type="password"
        />

        <div>
          <QBtn
            class="full-width"
            color="primary"
            label="Iniciar Sesión"
            type="submit"
          />
        </div>
      </QForm>
    </QCardSection>
  </QCard>
</QPage>
</template>

<script>
import { api } from 'src/boot/axios'

export default {
  name: 'Login',
  data () {
    return {
      form: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    async onSubmit () {
      try {
        const res = await api.post('/', { ...this.form })
        localStorage.setItem('token_soa', res.data.token)
        localStorage.setItem('user_soa', JSON.stringify(res.data.user))
        if (res.data.token) {
          this.$router.push({ name: 'main' })
        }
      } catch (error) {

      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
