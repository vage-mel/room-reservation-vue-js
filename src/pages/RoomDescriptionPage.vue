<template>
  <div class="room-description">
    <div class="room-description__content">
      <div class="room-description__row">
        <RoomDetail :roomId="roomId"
                    @get-room="onGetRoom"
        ></RoomDetail>
      </div>

        <template v-if="!isUserStaff">
          <div class="room-description__row">
            <RoomScheduleList :roomId="roomId"></RoomScheduleList>

            <ModalMakeReservation v-if="isShowModal"
                                  :show.sync="isShowModal"
                                  :roomId="roomId"

            ></ModalMakeReservation>
          </div>
          <div class="room-description__row">
            <button class="btn btn_hot btn_block" @click="onClickReservateBtn" type="button">Забронировать</button>
          </div>
        </template>
      </div>
    </div>
</template>

<script>
import RoomDetail from '../components/RoomDetail'
import RoomScheduleList from '../components/RoomScheduleList'
import ModalMakeReservation from '../components/Modal/ModalMakeReservation'

export default {
  components: {
    RoomDetail,
    RoomScheduleList,
    ModalMakeReservation
  },

  props: ['roomId'],

  data () {
    return {
        room: {},
        isShowModal: false,
    }
  },

  methods: {
    onClickReservateBtn: function (){
      this.isShowModal = true;
    },
    onGetRoom: function (room){
      this.room = room
    }
  }

}
</script>

<style>

.room-description__content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
}

.room-description__row{
  background-color: white;
  margin: 10px;
  padding: 20px;
  min-width: 280px;
  width: 100%;
  max-width: 500px;
}

.room-description__column1:only-child{

}

</style>
