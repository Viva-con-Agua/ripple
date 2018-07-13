<template>
  <form id="mailsEditor" class="form-vertical" role="form">
    <fieldset>
      <legend>Email schreiben</legend>
      <input type="hidden" name="author"  v-model="author" />
      <div class="form-group" id="sendingAddress_field">
        <div class="checkbox">
          <label for="no-reply">
            <input type="checkbox" id="no-reply" name="sendingAddress[]" value="no-reply@vivaconagua.org" v-model="sendingAddress" />
            no-reply@vivaconagua.org
          </label>
        </div>
      </div>
      <div class="form-group" id="receiver_field">
        <label class="control-label" for="receiver">Receiver</label>
        <input type="text" id="receiver" name="receiver" v-model="receiver" class="form-control" autofocus="true" />
      </div>
      <div class="form-group" id="subject_field">
        <label class="control-label" for="subject">Subject</label>
        <input type="text" id="subject" name="subject" v-model="subject" class="form-control" autofocus="true" />
      </div>
      <!--<MarkDownEditor v-model="mailBody" />-->
      <quill-editor ref="bodyEditor"
        v-model="mailBody"
        :config="editorOption">
      </quill-editor>
      <div class="form-group ">
        <button type="submit" @click="send" class="btn btn-primary">Send</button>
      </div>
    </fieldset>
  </form>
</template>

<script>
// import MarkDownEditor from '@/components/MarkDownEditor'
import { quillEditor } from 'vue-quill-editor'
import sanitizeHtml from 'sanitize-html'

import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import axios from 'axios'

// Todo: has to be configured for our purpose and should be in config file
var defaultBody = '<h1>Deine Mail ans Netzwerk...</h1>'
var allowedHTMLTags = ['span', 'img']
var allowedHTMLAttr = {
  '*': ['style'],
  'img': ['src']
}

var initAuthorURL = 'http://localhost/bloob/identity'
var loginPage = 'http://localhost/'

export default {
  name: 'MailsEditor',
  data () {
    return {
      author: '',
      subject: '',
      mailBody: defaultBody,
      receiver: '',
      sendingAddress: [],
      editorOption: {}
    }
  },
  components: { quillEditor },
  created: function () {
    this.init()
  },
  beforeDestroy: function () {
    this.author = ''
  },
  methods: {
    bloobify: function () {
      var bloobModel = {
        author: this.author,
        subject: this.subject,
        body: sanitizeHtml(this.mailBody, {
          allowedTags: sanitizeHtml.defaults.allowedTags.concat(allowedHTMLTags),
          allowedAttributes: allowedHTMLAttr
        }),
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
      this.mailBody = defaultBody
      this.receiver = ''
      this.sendingAddress = []
    },
    send: function (e) {
      e.preventDefault()
      var bloobModel = this.bloobify()
      this.cleanUp()
      this.$emit('created', bloobModel)
    },
    init: function () {
      axios.get(initAuthorURL)
        .then(response => {
          // JSON responses are automatically parsed.
          this.author = response.data.uuid
        })
        .catch(e => {
          // this.errors.push(e)
          window.location.href = loginPage
        })
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
    /*background-color: #2196f3;*/
    /*padding: 1.5em;*/
    /*border-radius: 25px;*/
  }
  .quill-editor {
    margin-bottom:1em;
    background-color: white;
  }
</style>
