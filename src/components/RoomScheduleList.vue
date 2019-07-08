<template>
  <div class="room-shedule">
    <p v-if="isErrorGet">Произошла ошибка при получении расписания на бронь комнаты </p>
    <div v-if="!roomRequests.length">Комнату еще не бронировали</div>

    <template>
      <p>Зарезервированное время:</p>
      <table class="room-shedule__table">
        <tr v-for="roomRequest in roomRequests" :key="roomRequest.id">
          <td>{{ momentDateFormat(roomRequest.startDateTime) }}</td>
          <td>{{ momentTimeFormat(roomRequest.startDateTime) }}-{{ momentTimeFormat(roomRequest.endDateTime) }}</td>
          <td>{{ roomRequest.user.firstName }} {{ roomRequest.user.lastName }}</td>
        </tr>
      </table>
    </template>

  </div>
</template>

<script>
import * as roomService from '../services/room.service'

export default {
  props: {
    roomId: {
      type: [ Number, String ],
    },
    initialMode: {
      type: String,
      default: 'view'
    },
    initialStatus: {
      type: String,
      default: 'created'
    }
  },

  data () {
    return {
        roomRequests: [],
    }
  },

  created () {
    roomService.getRequestsByRoom(this.roomId, 'confirmed')
    .then(response => {
      this.roomRequests = response.data
    })
    .catch( () => {
      this.isErrorGet = true
    })
  }
}
</script>

<style>
.room-shedule__table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}

.room-shedule__table tr:first-child td{
  border-top: 1px solid grey;
}

.room-shedule__table td {
  border-bottom: 1px solid grey;
  padding: 5px;
}
</style>
