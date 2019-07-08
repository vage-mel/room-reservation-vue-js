<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
*,
*:before,
*:after {
  box-sizing: inherit;
  margin: 0;
  padding: 0;
}

html,
body{
  box-sizing: border-box;

  font-family: PT Sans;
  background-color: #f8f9fb;
  color: #333333;
}

.error-msg{
  font-size: 12px;
  color: red;
}
/*
  Btn start
*/
.btn-group__btn{
  margin-left: 3px;
}
.btn-group__btn:first-child {
  margin-left: 0px;
}
.btn {
  color: #000000;
  padding: 6px 10px;
  border: none;
  cursor: pointer;
  outline: none;
  background-color: white;
}
.btn_block{
  width: 100%;
}
.btn_hot {
  color: #ffffff;
  background-color: blue;
}
.btn:disabled {
  background-color: gray;
}
/*
  Btn end
*/
.input {
  width: 100%;
  height: 26px;
  padding: 0px 9px 0px 9px;
  background-color: #ebedf5;
  border: #ebedf5 1px solid;
  height: 26px;
}

.textarea {
  resize: none;
  height: 80px;
}


</style>
