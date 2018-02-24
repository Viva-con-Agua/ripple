import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import MarkDownEditor from '@/components/MarkDownEditor'
import MailsList from '@/components/MailsList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/editor',
      name: 'MarkDownEditor',
      component: MarkDownEditor
    },
    {
      path: '/mails',
      name: 'MailsList',
      component: MailsList
    }
  ]
})
