<template>
  <div id="list">
    <h2>Vergangene Mails</h2>
    <ul id="mailsList">
      <li v-for="mail in value"
          class="mail"
          :key="mail.id"
          >
        <div class="indicator">
          <img v-if="mail.meta.hasOwnProperty('sent') && mail.meta.sent <= (new Date()).getTime()" src="/img/sent.png" alt="Mail sent" />
          <img v-if="!mail.meta.hasOwnProperty('sent') || mail.meta.sent > (new Date()).getTime()" src="/img/not-sent.png" alt="Mail not sent" />
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
  </div>
</template>

<script>
import df from 'dateformat'

export default {
  name: 'MailsList',
  props: ['value'],
  methods: {
    dateToString: function (long) {
      return df(new Date(long), 'dd.mm.yyyy, HH:MM "Uhr"')
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
  /*padding: 0 10em;*/
  padding: 0;
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
  height: 6.5em;
  border-radius: 5px;
  margin: 0 0 1em 0;
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
