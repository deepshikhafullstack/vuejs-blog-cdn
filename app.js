Vue.component('Card', {
  data: function () {
    return {
      count: 0
    }
  },
  template: '<button v-on:click="count++">You clicked me {{ count }} times.</button>'
})

const router = new VueRouter({
  mode: 'history',
  routes: []
})

if ($("#app").length != 0) {
  var users = new Vue({
    el: '#app',
    data() {
      return {
        heading: 'Gallery',
        image: 'profile-default-02.png',
        users: null
      }
    },
    mounted() {
      axios
        .get('https://jsonplaceholder.typicode.com/users')
        .then(response => (this.users = response.data))
    },
    filters: {
      capitalize: function (value) {
        if (!value) return ''
        value = value.toString()
        return value.charAt(0).toUpperCase() + value.slice(1)
      },
      trimNameToChar: function (value, length) {
        if (!value) return ''
        value = value.toString()
        if (value.length > length) {
          return value.slice(0, length) + '...'
        }
        return value
      },
    }
  })
}
if ($("#gallery").length != 0) {

  var allery = new Vue({
    el: '#gallery',
    router,
    data() {
      return {
        heading: 'Gallery',
        image: 'album.png',
        galleries: null,
        user_id: 1
      }
    },
    mounted() {
      if (this.$route.query.userId) {
        this.user_id = Number(this.$route.query.userId)
      }
      axios
        .get('https://jsonplaceholder.typicode.com/albums?userId=' + this.user_id)
        .then(response => (this.galleries = response.data))
    },
    filters: {
      capitalize: function (value) {
        if (!value) return ''
        value = value.toString()
        return value.charAt(0).toUpperCase() + value.slice(1)
      },
      trimNameToChar: function (value, length) {
        if (!value) return ''
        value = value.toString()
        if (value.length > length) {
          return value.slice(0, length) + '...'
        }
        return value
      },
    }
  })
}