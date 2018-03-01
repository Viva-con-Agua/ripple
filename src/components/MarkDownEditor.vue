<template>
  <div id="editor">
    <textarea ref="mdRaw" v-bind:value="this.value" v-on:input="update"></textarea>
    <div v-html="compiledMarkdown"></div>
  </div>
</template>

<script>
import marked from 'marked'
import _ from 'lodash'

export default {
  name: 'MarkDownEditor',
  props: ['value'],
  computed: {
    compiledMarkdown: function () {
      var rawMD = ''
      if (this.value) {
        rawMD = this.value
      }
      return marked(rawMD, { sanitize: true })
    }
  },
  methods: {
    update: _.debounce(function (e) {
      // this.input = e.target.value
      var readInput = e.target.value

      // If the value was not already normalized,
      // manually override it to conform
      if (readInput !== this.value) {
        this.$refs.mdRaw.value = readInput
      }
      // Emit the number value through the input event
      this.$emit('input', readInput)
    }, 300)
  }
}
</script>

<style scoped>
  #editor {
    margin: 0;
    font-family: 'Helvetica Neue', Arial, sans-serif;
    color: #333;
    display: flex;
    justify-content: space-evenly;
    align-items: stretch;
    align-content: stretch;
  }

  textarea, #editor div {
    display: inline-block;
    width: 50%;
    /*height: 100%;*/
    vertical-align: top;
    box-sizing: border-box;
    padding: 0 20px;
  }

  textarea {
    border: none;
    border-right: 1px solid #ccc;
    resize: none;
    outline: none;
    background-color: #f6f6f6;
    font-size: 14px;
    font-family: 'Monaco', courier, monospace;
    padding: 20px;
  }

  code {
    color: #f66;
  }
</style>
