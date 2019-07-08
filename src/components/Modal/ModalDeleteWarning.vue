<template>
  <Modal :show="show"
         :head="false"
         :isCloseOverlay="isCloseOverlay"
         @update:show="$emit('update:show', $event)"
         @modal-close="$emit('modal-close', $event)"
  >
    <template v-slot:body>
      {{ warningText }}
    </template>

    <template v-slot:footer>
      <div class="btn-group">
        <button class="btn btn_hot btn-group__btn" type="button" @click="onYes">Да</button>
        <button class="btn btn-group__btn" type="button" @click="onNo">Нет</button>
      </div>
    </template>
  </Modal>
</template>

<script>
import Modal from './Modal'

export default {
  components: {
    Modal
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
    roomId: {
      type: [String, Number]
    },
    warningText: {
      type: String,
      default: 'Вы действительно хотите удалить?'
    }
  },

  data () {
    return {

    }
  },

  methods: {
    onYes(e){
      this.onClose(e)
      this.$emit('click-yes', e);
    },
    onNo(e){
      this.onClose(e)
      this.$emit('click-no', e);
    },
    onClose(e){
      this.$emit('update:show', false);
      this.$emit('modal-close', e);
    },
  }

}
</script>

<style>
  .modal.overlay{
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .modal__content {
    border: 1px solid #dddddd;
  }
</style>
