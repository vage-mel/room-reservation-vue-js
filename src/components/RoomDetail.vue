<template>
  <div class="room-detail">
    <template v-if="isViewMode(mode)">
      <div class="room-detail__name">Комната {{ room.name }}</div>
      <div class="room-detail__chair">В комнате {{ room.chairCount }} {{ getNounDeclensionFromNumber(room.chairCount, "место") }}</div>
      <table class="room-detail__projector-board-table">
        <tr>
          <td>
            <span v-if="room.isProjector" class="plus">+</span><span v-else class="minus">-</span>
          </td>
          <td>
            проектор
          </td>
        </tr>
        <tr>
          <td>
            <span v-if="room.isBoard" class="plus">+</span><span v-else class="minus">-</span>
          </td>
          <td>
            доска
          </td>
        </tr>
      </table>

      <div class="room-detail__description" v-if="room.description ">{{ room.description }}</div>
    </template>

    <template v-if="isUserStaff && isEditMode(mode)">
      <div class="field">
        <label>Название комнаты:</label>
        <input class="input" type="text" v-model="room.name">
      </div>
      <div class="field">
        <label>Свободных мест в комнате:</label>
        <input class="input" type="number" v-model="room.chairCount">
      </div>
      <div class="field">
        <label>Описание комнаты:</label>
        <textarea class="input textarea" rows="20" v-model="room.description"></textarea>
      </div>
      <div class="field">Проектор: <input type="checkbox" v-model="room.isProjector"/></div>
      <div class="field">Доска: <input type="checkbox" v-model="room.isBoard"/></div>
    </template>
    <br />
    <button v-if="isUserStaff && isViewMode(mode)" class="btn btn_hot btn_block" @click="onEdit">Редактировать</button>
    <button v-if="isUserStaff && isEditMode(mode)" class="btn btn_hot btn_block" @click="onSave">Сохранить</button>

  </div>
</template>

<script>
import * as roomService from '../services/room.service'
import getNounDeclensionFromNumber from '../utils/plural-form'

export default {
  props: {
    roomId: {
      type: [String, Number]
    },

    initialMode: {
      type: String,
      default: 'view'
    }
  },

  data(){
    return {
      room: {},
      mode: this.initialMode
    }
  },

  created(){
      roomService.getRoomById(this.roomId)
      .then(response => {
        this.room = response.data
        return this.room
      })
      .then(room => {
        this.$emit('get-room', Object.assign({}, room))
      })
  },

  methods: {
    onEdit () {
      this.mode = 'edit';
    },
    onSave () {
      this.mode = 'view';

      roomService.updateRoom(this.room)
      .then( () => {
        return this.room
      })
      .then(room => {
        this.$emit('get-room', Object.assign({}, room))
      })
    },
    getNounDeclensionFromNumber(num, word){
      return getNounDeclensionFromNumber(num, word)
    }
  }

}
</script>

<style>
.room-detail__name {
  text-align: center;
}

.room-detail__chair {
  margin-top: 10px;
}

.plus {
  color: green;
}

.minus {
  color: red;
}

.room-detail__projector-board-table {
  margin-top: 10px;
  margin-bottom: 10px;
  width: 100%;
  border-collapse: collapse;
}

.room-detail__projector-board-table td {
  padding: 3px;
  border-top: 1px solid;
  border-bottom: 1px solid;
}
.room-detail__projector-board-table tr > td:first-child {
  text-align: center;
  border-right: 1px solid;
}
</style>
