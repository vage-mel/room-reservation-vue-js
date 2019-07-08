<template>
  <div class="request-list">
    <p v-if="isErrorGet">Произошла ошибка при получении заявок на комнаты</p>

    <template v-else-if="isUserStaff">
      <div v-if="!roomsRequests.length" class="request-list__item">
        Заявок пока нет
      </div>
      <div v-else
           v-for="(roomRequest, index) in roomsRequests"
           :key="roomRequest.id"
           class="request-list__item"
       >
        <div class="request-list__item-name">
          <div class="request-list__item-name-left">Комната {{ roomRequest.room.name }}</div>
          <div class="request-list__item-name-right">
            <font-awesome-icon @click="onAccept(roomRequest.id, index)" title="Принять" icon="check" :style="{ color: 'green', cursor: 'pointer' }" />
            <font-awesome-icon @click="onCanReject(roomRequest.id, index)" title="Отклонить" icon="times" :style="{ color: 'red', cursor: 'pointer'}"/>
          </div>
        </div>
        <div class="request-list__item-user">
           {{ roomRequest.user.firstName }}  {{ roomRequest.user.lastName }}
        </div>
        <div>
           <font-awesome-icon icon="clock"  :style="{color:'blue'}"/>
           {{ momentDateFormat(roomRequest.startDateTime) }} {{ momentTimeFormat(roomRequest.startDateTime) }}-{{ momentTimeFormat(roomRequest.endDateTime) }}
        </div>
        <ModalDeleteWarning v-if="isShowModal"
                            warningText="Вы действительно хотите отклонить заявку?"
                            :show.sync="isShowModal"
                            @click-yes="onReject"
        ></ModalDeleteWarning>
      </div>

    </template>

  </div>
</template>

<script>
import * as roomService from '../services/room.service'
import ModalDeleteWarning from './Modal/ModalDeleteWarning'

export default {
  components: {
    ModalDeleteWarning
  },

  data () {
    return {
      roomsRequests: [],
      polling: null,
      isShowModal: false,
      rejectRoomRequest: {}
    }
  },

  beforeDestroy () {
    clearInterval(this.polling)
  },

  created () {
    this.pollData()
  },

  methods: {
    onReject () {
      this.roomsRequests.splice(this.rejectRoomRequest.index, 1)
      roomService.rejectRoomRequest(this.rejectRoomRequest.id)
      .catch( () => {
        alert('Произошла ошибка при отмене заявки на комнату')
      });
      this.rejectRoomRequest = {};
    },

    onAccept (roomRequestId, index) {
      this.roomsRequests.splice(index, 1)
      roomService.acceptRoomRequest(roomRequestId)
      .catch( () => {
        alert('Произошла ошибка при одобрении заявки на комнату')
      });
    },

    onCanReject (roomRequestId, index) {
      this.isShowModal = true;
      this.rejectRoomRequest.id = roomRequestId
      this.rejectRoomRequest.index = index
    },

    getRoomsRequests () {
      roomService.getRoomsRequests('created')
      .then(response => {
        this.roomsRequests = response.data
      })
      .catch( () => {
        this.isErrorGet = false
        clearInterval(this.polling)
      })
    },

    pollData () {
      this.getRoomsRequests()

      if (!this.roomsRequests.length){
        this.polling = setInterval(() => {
          this.getRoomsRequests()
        }, 10000)
      }

    }
  },

}
</script>

<style>
.request-list__item {
  border-bottom: 1px solid #dddddd;
  padding: 5px;
}

.request-list__item:last-child {
  border-bottom: none;
}

.request-list__item > div {
  margin-top: 5px;
}

.request-list__item-name-left{
  float: left;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  width: calc(100% - 50px);
}

.request-list__item-name-right{
  text-align: right;
}

.request-list__item-chair{
  clear: both;
}

 .fa-check ~ .fa-times {
  margin-left: 6px;
}

</style>
