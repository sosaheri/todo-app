import { createRouter, createWebHistory } from 'vue-router'
import TaskList from '../components/TaskList.vue'
import CreateTaskForm from '../components/CreateTaskForm.vue' 
import EditTaskForm from '../components/EditTaskForm.vue' 

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'TaskList',
      component: TaskList
    },
    {
      path: '/tasks/create',
      name: 'CreateTaskForm',
      component: CreateTaskForm
    },
    {
      path: '/tasks/:id/edit',
      name: 'EditTaskForm',
      component: EditTaskForm,
      props: true
    }
  ]
})

export default router
