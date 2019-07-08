<template>
  <div class="user-list">
    <p v-if="isErrorGet">Произошла ошибка при получении пользователей</p>

    <template v-else-if="isUserStaff">
      <div v-for="user in users" :key="user.id" class="user-list__item">
        <div class="user-list__item-name">
          <div class="user-list__item-name-left">
            {{ user.firstName }} {{ user.lastName }} ({{ user.username }})
          </div>
          <div class="user-list__item-name-right">
            <input :disabled="user.id == currUser.id" title="Сделать менеджером?" type="checkbox" @change="onCheck(user)" v-model="user.isStaff">
          </div>
        </div>
      </div>
    </template>

  </div>
</template>

<script>
import * as authService from '../services/auth.service'

export default {
  data () {
    return {
      users: []
    }
  },

  created () {
    authService.getUsers()
    .then(response => {
      this.users = response.data
    })
    .catch( () => {
      this.isErrorGet = true
    })
  },

  methods: {
    onCheck(user){
      authService.updateUser(user)
      .then( () => {
        this.isErrorPost = false
      })
      .catch( () => {
        this.isErrorPost = true
      })
    }
  }

}


</script>

<style>

.user-list__item {
  border-bottom: 1px solid #dddddd;
  padding: 5px;
}

.user-list__item:last-child{
  border-bottom: none;
}

.user-list__item > div {
  margin-top: 5px;
}

.user-list__item-name-left{
  float: left;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  width: calc(100% - 50px);;
}

.user-list__item-name-right{
  text-align: right;
}

.user-list__item-chair{
  clear: both;
}
</style>
