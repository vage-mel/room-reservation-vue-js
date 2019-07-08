<template>
  <div v-if="show"
       @click="onClickOverlay"
       class="modal overlay"
       ref="overlay"
  >
    <div class="modal__content">
        <div v-if="head" class="modal__head">
          <div class="modal__head-title">
            <slot name="headTitle"></slot>
          </div>
          <div class="modal__close">
              <div class="modal__close-icon" @click="onClose">
                <slot name="closeIcon">X</slot>
              </div>
          </div>
        </div>
        <div class="modal__body">
          <div class="modal__body-content">
            <slot name="body"></slot>
          </div>
        </div>
        <div class="modal__footer">
          <slot name="footer"></slot>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    isCloseOverlay: {
      type: Boolean,
      default: true
    },
    head: {
      type: Boolean,
      default: true
    }
  },

  methods: {
    onClose(){
      this.$emit('update:show', false);
      this.$emit('modal-close', false);
    },
    onClickOverlay (e) {
      if(this.isCloseOverlay && e && e.target == this.$refs.overlay){
        this.onClose(e)
      }
    }
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

  .modal__head{
    position: relative;
    padding: 12px 11px;
    background-color: #ffffff;
  }

  .modal__head-title{
    margin-right: 25px;
  }

  .modal__close {
    position: absolute;
    top: 50%;
    right: 0px;
    padding: 0 13px;
  }

  .modal__close-icon{
    cursor: pointer;
  }

  .modal__close-icon {
    transform: translate3d(0, -50%, 0);
  }

  .modal__body{
    padding: 10px;
    background-color: #ebedf5;
  }

  .modal__body-content {
    padding: 16px 14px;
    background-color: #fff;
  }

  .modal__footer{
    padding: 8px 11px;
    background-color: #ffffff;
  }
</style>
