<template>
  <div>
    <h1>Crear Tarea</h1>
    <form @submit.prevent="submitForm">
      <input type="text" v-model="task.title" placeholder="Título de la tarea" required>
      <button type="submit">Crear</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      task: {
        title: '',
      },
    };
  },
  methods: {
    submitForm() {
      axios.post('/tasks', this.task)
        .then(response => {
          // Handle successful creation, e.g., clear form, redirect
          this.task.title = '';
          this.$router.push('/'); // Assuming you have a router setup
        })
        .catch(error => {
          console.error(error);
        });
    },
  },
};
</script>