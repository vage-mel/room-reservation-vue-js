<template>
  <Modal :show="show"
         :isCloseOverlay="isCloseOverlay"
         @update:show="$emit('update:show', $event)"
         @modal-close="$emit('modal-close', $event)"
  >
    <template v-slot:headTitle>
      Бронирование комнаты
    </template>
    <template v-slot:body>
      <p v-if="isDatesTimesFull && !isValidDatesTimes">Введите дату и время начала меньше чем дату и время окончания.</p>
      <div class="datetime__field">
        <label>Дата</label>
        <datetime type="date"
                  input-class="input"
                  v-model="dateTime"
                  :phrases="{ok: 'Выбрать', cancel: 'Отмена'}"
                  :min-datetime="currDateTime">
        </datetime>
      </div>

      <template v-if="dateTime">
        <div class="datetime__field">
          <label>Время начала</label>
          <datetime type="time"
                    v-model="startDateTime"
                    input-class="input"
                    :phrases="{ok: 'Выбрать', cancel: 'Отмена'}"
                    :min-datetime="dateTime <= currDateTime ? currDateTime : null"
                    :max-datetime="endDateTime"
                    :disabled="!dateTime"
          >
          </datetime>
        </div>

        <div class="datetime__field">
          <label>Время окончания</label>
          <datetime type="time"
                    v-model="endDateTime"
                    input-class="input"
                    :phrases="{ok: 'Выбрать', cancel: 'Отмена'}"
                    :min-datetime="startDateTime"
                    :disabled="!dateTime"
          >
          </datetime>
        </div>
      </template>
    </template>

    <template v-slot:footer>
      <div class="btn-group">
        <button type="button" class="btn btn_hot btn-group__btn" :disabled="!isValidDatesTimes" @click="onMakeReservation">Забронировать</button>
        <button type="button" class="btn btn-group__btn" @click="onClose">Отмена</button>
      </div>
    </template>
  </Modal>
</template>

<script>
import Modal from './Modal'
import * as roomService from '../../services/room.service'
import { Datetime } from 'vue-datetime';
import 'vue-datetime/dist/vue-datetime.css';
import { Settings } from 'luxon'

Settings.defaultLocale = 'ru'

export default {
  components: {
    Modal,
    Datetime
  },

  props: {
    show: {
      type: Boolean,
      default: false
    },
    isCloseOverlay: {
      type: Boolean,
      default: true
    },
    roomId:{
      type: [String, Number]
    }
  },

  data () {
    return {
      dateTime: '',
      startDateTime: '',
      endDateTime: '',
      currDateTime: new Date().toISOString()
    }
  },

  computed: {
    isDatesTimesFull () {
      if(this.startDateTime && this.endDateTime){
        return true
      }
      else{
        return false
      }
    },
    isValidDatesTimes () {
      if(this.isDatesTimesFull && this.isValidPeriodDatesTimes(this.startDateTime, this.endDateTime)){
        return true
      }else{
        return false
      }
    }
  },

  methods: {
    onClose(e){
      this.$emit('update:show', false);
      this.$emit('modal-close', e);
    },
    onMakeReservation (e) {
      roomService.makeReservation(this.roomId, this.startDateTime, this.endDateTime)
      .then( () => {
        alert('Заявка на бронирование комнаты отправлена')
        this.onClose(e);
      })
      .catch( () => {
        alert('Произошла ошибка при бронировании комнаты')
      });

    },
    isValidPeriodDatesTimes (startDateTime, endDateTime) {
      return new Date(startDateTime).getTime() <= new Date(endDateTime).getTime();
    }
  }

}
</script>

<style>
.datetime__field {
  margin-top: 12px;
}

.datetime__field:first-child {
  margin-top: 0px;
}
</style>
