<template>
  <div>
    <h1>Editar Tarea</h1>
    <form @submit.prevent="submitForm">
      <input type="text" v-model="task.title" placeholder="Título de la tarea" required>
      <button type="submit">Actualizar</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: {
    taskId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      task: {},
    };
  },
  mounted() {
    axios.get(`/tasks/${this.taskId}`)
        .then(response => {
        console.log(response.data);
        this.task = response.data;
        })
        .catch(error => {
        console.error(error);
        });
    },
  methods: {
    submitForm() {
      axios.put(`/tasks/${this.taskId}`, this.task)
        .then(response => {
          // Handle successful update, e.g., redirect back
          this.$router.push('/'); // Assuming you have a router setup
        })
        .catch(error => {
          console.error(error);
        });
    },
  },
};
</script>