<template>
  <div class="room-list">
    <p v-if="isErrorGet">Произошла ошибка при получении списка комнат</p>
    <template v-else-if="!rooms.length">Комнат пока нет</template>
    <template v-else>
      <div class="room-list__item" v-for="room in rooms" :key="room.id"  @click="onClick(room.id)">

        <div class="room-list__item-name">
          <div class="room-list__item-name-left">Комната {{ room.name }}</div>
          <div class="room-list__item-name-right">
            <font-awesome-icon v-if="room.isProjector" title="есть проектор" icon="photo-video" :style="{color:'blue'}"/>
            <font-awesome-icon v-if="room.isBoard" title="есть доска" icon="chalkboard" :style="{color:'blue'}"/>
          </div>
        </div>

        <div class="room-list__item-chair">
           {{ room.chairCount }}
           {{ getNounDeclensionFromNumber(room.chairCount, "место") }}
        </div>

        <div class="room-list__item-date-time">
          <font-awesome-icon icon="clock" :style="{color:'blue'}"/>
          <template v-if="room.earlyReservationTime.startDateTime">
            {{ momentDateFormatWord(room.earlyReservationTime.startDateTime) }} <span class="room-list__item-time">{{ momentTimeFormat(room.earlyReservationTime.startDateTime) }}-{{ momentTimeFormat(room.earlyReservationTime.endDateTime) }}</span>
          </template>
          <template v-else> свободно</template>
        </div>

      </div>
    </template>
  </div>
</template>

<script>
import * as roomService from '../services/room.service'
import getNounDeclensionFromNumber from '../utils/plural-form'

export default {
  data () {
    return {
      rooms: [],
    }
  },

  created () {
    roomService.getRooms()
    .then(response => {
      this.rooms = response.data
    })
    .catch( () => {
      this.isErrorGet = true
    })
  },

  methods: {
    onClick (roomId){
       this.$emit('click-room', roomId);
    },
    getNounDeclensionFromNumber(num, word){
      return getNounDeclensionFromNumber(num, word)
    }
  }
}
</script>

<style>
.room-list__item {
  border-bottom: 1px solid #dddddd;
  padding: 5px;
  cursor: pointer;
}

.room-list__item:last-child {
  border-bottom: none;
}

.room-list__item > div {
  margin-top: 5px;
}

.room-list__item-name-left{
  float: left;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  width: calc(100% - 50px);;
}

.room-list__item-name-right{
  text-align: right;
}

.room-list__item-chair{
  clear: both;
}

.fa-photo-video ~ .fa-chalkboard{
  margin-left: 10px;
}

</style>
