<template>
  <ul id="mailsList">
    <li v-for="mail in mails"
        class="mail"
        :key="mail.id"
        >
      <div class="indicator">
        <img v-if="mail.meta.hasOwnProperty('send') && mail.meta.send <= (new Date()).getTime()" src="/img/send.png" alt="Mail sent" />
        <img v-if="!mail.meta.hasOwnProperty('send') || mail.meta.send > (new Date()).getTime()" src="/img/not-send.png" alt="Mail not sent" />
      </div>
      <div class="author">
        <span class="name">{{ mail.author }}</span><br />
        <span class="meta">Created: {{ dateToString(mail.meta.created) }}</span><br />
        <span class="meta" v-if="mail.meta.hasOwnProperty('sendingAddress')">Senders email: {{ mail.meta.sendingAddress }}</span>
      </div>
      <div class="subject">{{ mail.subject }}</div>
      <div class="receiver">{{ mail.receiver.join(', ') }}</div>
    </li>
  </ul>
</template>

<script>
import df from 'dateformat'

var apiURL = 'http://localhost:9000/rest/v1/mail'

export default {
  name: 'MailsList',
  data () {
    return {
      mails: [
        {
          'author': 'Johann Sell',
          'subject': 'Testmail',
          'receiver': ['Dennis Kleber', 'Jens Ottmann', 'Sofia die Erste', 'Pocahontas'],
          'meta': {
            'sendingAddress': 'no-reply@vivaconagua.org',
            'created': 1365799066000,
            'send': 1365887493000
          }
        },
        {
          'author': 'Dennis Kleber',
          'subject': 'Testmail - so ein Quatsch',
          'receiver': ['Jens Ottmann', 'Sofia die Erste', 'Pocahontas'],
          'meta': {
            'created': 1365897493000,
            'send': 1365987493000
          }
        },
        {
          'author': 'Johann Sell',
          'subject': 'Das hätte ich nicht geschrieben!',
          'receiver': ['Dennis Kleber'],
          'meta': {
            'created': 1365997493000
          }
        }
      ]
    }
  },

  created: function () {
    this.fetchData()
  },
  methods: {
    dateToString: function (long) {
      return df(new Date(long), 'dd.mm.yyyy, HH:MM "Uhr"')
    },
    fetchData: function () {
      var xhr = new XMLHttpRequest()
      var self = this
      xhr.open('GET', apiURL)
      xhr.onload = function () {
        self.mails = JSON.parse(xhr.responseText)
      }
      xhr.send()
    }
  }
}
</script>

<style scoped>
#mailsList {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  align-content: stretch;
  list-style-type: none;
  height: 100%;
  text-align: left;
  padding: 0 10em;
}

.mail {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: stretch;
  align-content: flex-start;
  padding: 1.5em;
  background-color: #2196f3;
  color: #FFFFFF;
  height: 2.5em;
}
.mail:hover {
  background-color: #e7e7e7;
  color: #22262b;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19);
  -moz-box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19);
  -webkit-box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19);
}

.mail .indicator {
  width: 3em;
  /*flex-grow: 1;*/
}
.mail .author {
  width: 20em;
  font-weight: bold;
  /*flex-grow: 2;*/
}
.mail .author .name {
  font-weight: bold;
}
.mail .subject {
  width: 40em;
  /*flex-grow: 4;*/
}
.mail .receiver {
  min-width: 20em;
  /*flex-grow: 2;*/
}

.mail span.meta, .mail .receiver {
  font-style: italic;
  font-size: smaller;
}
</style>
