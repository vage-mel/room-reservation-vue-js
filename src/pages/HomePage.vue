<template>
  <div class="home">
    <div class="home__content">
      <div class="home__column1">
        <RoomList @click-room="onRoomClick"></RoomList>
      </div>
      <template v-if="isUserStaff">
        <div class="home__column1">
          <RoomRequestList />
        </div>
        <div class="home__column3">
          <UserList />
        </div>
        <div class="home__column4 home__column4-hide"></div>
      </template>
    </div>
  </div>
</template>

<script>
import RoomList from '../components/RoomList'
import RoomRequestList from '../components/RoomRequestList'
import UserList from '../components/UserList'

export default {
  components: {
    RoomList,
    RoomRequestList,
    UserList
  },

  data () {
    return {
      isShowModal: false,
      roomId: ''
    }
  },

  methods: {
    onRoomClick: function(roomId){
        this.$router.push({ name: 'roomDescription', params: { roomId: roomId } })
    }
  }


}
</script>

<style>

.home__content {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
}

.home__column1, .home__column2, .home__column3, .home__column4{
  background-color: white;
  float: left;
  margin: 10px;
  padding: 10px;
  width: 320px;
  min-width: 280px;
}

.home__column4-hide{
  visibility: hidden;
}

.home__column1:only-child{
  width: 700px;
}


</style>
