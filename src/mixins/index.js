export let acessMixin = {
  methods: {
    isViewMode (mode) {
      return mode == 'view'
    },
    isEditMode (mode) {
      return mode == 'edit'
    },
    isAddMode (mode) {
      return mode == 'add'
    }
  },
  computed: {
    isUserStaff () {
      return this.$store.getters['auth/isUserStaff'];
    },
    currUser (){
      return this.$store.getters['auth/user'];
    }
  }
}

import moment from 'moment';
moment.locale('ru');

export let momentMixin = {
  methods: {
    moment (date) {
      return moment(date)
    },
    momentDateFormatWord(date){
      return (moment(date).calendar(null, { sameElse:'DD.MM.YYYY' }).split(","))[0].toLowerCase() 
    },
    momentDateFormat(date){
      return moment(date).format('DD.MM.YYYY')
    },
    momentTimeFormat(dateTime){
      return moment(dateTime).format('LT')
    }
  }
}

export let responseErrorMixin = {
  data () {
    return {
      loading: true,
      isErrorGet: false,
      isErrorPost: false,
      isErrorPut: false,
      errorMessage: ''
    }
  }
}
