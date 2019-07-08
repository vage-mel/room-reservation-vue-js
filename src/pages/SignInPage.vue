<template>
  <div class="signin">
    <form class="signin-form" @submit.prevent="signIn()">
      <p v-if="isErrorGet" class="error-msg">{{ errorMessage }}</p>
      <div class="signin-form__field">
        <label for="username">Логин</label>
        <input class="signin-form__input" type="text" name="username" v-model="username" />
      </div>

      <div class="signin-form__field">
        <label for="username">Пароль</label>
        <input class="signin-form__input" type="password" name="password" v-model="password" />
      </div>
      <button class="signin-form__field btn signin-form__btn" type="submit">Войти</button>
    </form>
  </div>
</template>

<script>

export default {
  data () {
    return {
        username: '',
        password: ''
    }
  },

  methods: {
    signIn () {
      this.$store.dispatch('auth/signIn',{
        username: this.username,
        password: this.password
      })
      .then( () => {
        this.$router.push({ name:'home'})
      })
      .catch( (e) => {
        if (e.response) {
          this.errorMessage = 'Неправильно задан логин или пароль.'
        } else if (e.request) {
          this.errorMessage = 'Ошибка доступа к серверу.'
        }
        this.isErrorGet = true
      })
    }
  }

}
</script>

<style>
.signin {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100wh;
}

.signin-form__field {
  margin: 5px 0 5px 0;
}

.signin-form__input {
  width: 100%;
  height: 100%;
  padding: 10px 20px 10px 25px;
  background-color: #e8f0fe;
  border: #ccd6f6 1px solid;
}

.signin-form__btn {
  padding: 8px 25px;
  background-color: #223ca9;
  color: #fff;
  text-align: center;
  text-decoration: none;
  width: 100%;
  cursor: pointer;
  border: none;
}

</style>
