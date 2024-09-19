<template>
  <div>
    <h1>Lista de Tareas</h1>
    <ul>
      <li v-for="task in tasks" :key="task.id">
        {{ task.title }}
        <button @click="editTask(task)">Editar</button>
        <button @click="deleteTask(task.id)">Eliminar</button>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      tasks: []
    }
  },
  mounted() {
    axios.get('/tasks')
      .then(response => {

        this.tasks = response.data;   

      })
      .catch(error => {
        console.error(error);   

      });
  },
  methods: {
    deleteTask(taskId) {

      console.error(taskId);
      axios.delete(`/tasks/${taskId}`)
        .then(() => {
          this.tasks = this.tasks.filter(task => task.id !== taskId);
        })
        .catch(error => {
          console.error(error);
        });
    },
    editTask(task) {
      this.$router.push({ name: 'EditTaskForm', params: { id: task.id } });
    }
  }
}
</script>