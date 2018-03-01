<template>
  <form id="mailsEditor">
    <input type="hidden" name="author"  v-model="author" />
    <input type="text" placeholder="Subject" name="subject" v-model="subject" />
    <MarkDownEditor v-model="mailBody" />
    <input type="text" placeholder="Receiver" name="receiver" v-model="receiver" />
    <label>
      <input type="checkbox" name="sendingAddress[]" value="no-reply@vivaconagua.org" v-model="sendingAddress" />
      no-reply@vivaconagua.org
    </label>
    <button @click="send">Send</button>
  </form>
</template>

<script>
import MarkDownEditor from '@/components/MarkDownEditor'

export default {
  name: 'MailsEditor',
  data () {
    return {
      author: 'Johann',
      subject: '',
      mailBody: '# hello',
      receiver: '',
      sendingAddress: []
    }
  },
  components: { MarkDownEditor },
  methods: {
    bloobify: function () {
      var bloobModel = {
        author: this.author,
        subject: this.subject,
        body: this.mailBody,
        receiver: this.receiver.replace(/ /g, '').split(','),
        meta: {
          created: (new Date()).getTime()
        }
      }
      if (typeof this.sendingAddress !== 'undefined' && this.sendingAddress.length > 0) {
        bloobModel.meta.sendingAddress = this.sendingAddress[0]
      }
      return bloobModel
    },
    cleanUp: function () {
      this.subject = ''
      this.mailBody = '# hello'
      this.receiver = ''
      this.sendingAddress = []
    },
    send: function (e) {
      e.preventDefault()
      var bloobModel = this.bloobify()
      this.cleanUp()
      this.$emit('created', bloobModel)
    }
  }
}
</script>

<style scoped>
  #mailsEditor {
    display: flex;
    justify-content: space-evenly;
    align-items: stretch;
    align-content: stretch;
    flex-direction: column;
  }
</style>
