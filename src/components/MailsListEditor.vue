<template>
  <div id="mailsListEditor">
    <MailEditor v-on:created="create" />
    <MailsList v-model="this.mails" />
  </div>
</template>

<script>
import MailEditor from '@/components/MailEditor'
import MailsList from '@/components/MailsList'

var initURL = 'http://localhost/bloob/rest/v1/mail'
var wsURL = 'ws://localhost/bloob/ws/v1/mail/createSend'

export default {
  name: 'MailsListEditor',
  components: { MailEditor, MailsList },
  data () {
    var socket = new WebSocket(wsURL)
    var that = this
    socket.onmessage = function (e) {
      that.append(JSON.parse(event.data))
    }
    return {
      socket: socket,
      mails: []
    }
  },
  created: function () {
    this.initMails()
  },
  beforeDestroy: function () {
    this.mails = null
  },
  destroyed: function () {
    this.socket.close()
  },
  methods: {
    append (mail) {
      this.mails.unshift(mail)
    },
    send (mail) {
      this.socket.send(JSON.stringify(mail))
    },
    initMails: function () {
      var xhr = new XMLHttpRequest()
      var self = this
      xhr.open('GET', initURL)
      xhr.setRequestHeader('Accept', 'application/json; charset=utf-8')
      xhr.onload = function () {
        self.mails = (JSON.parse(xhr.responseText)).sort(function (a, b) { return b.meta.created - a.meta.created })
      }
      xhr.send()
    },
    create (newMail) {
      this.send(newMail)
    }
  }
}
</script>
