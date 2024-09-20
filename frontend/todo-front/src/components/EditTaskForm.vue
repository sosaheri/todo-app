<template>
  <div class="task-list-container" id="todolist">
    <h1>Editar Tarea</h1>
    <form class="new-task-form" @submit.prevent="submitForm">
      <input type="text" v-model="task.title" placeholder="Título de la tarea" required>
      <button type="submit">Actualizar</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';

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
    axios.get(`/tasks/${this.$route.params.id}`)
        .then(response => {        
        this.task = response.data;
        })
        .catch(error => {
        console.error(error);
        });
    },
  methods: {
    submitForm() {
      
      axios.put(`/tasks/${this.$route.params.id}`, this.task)
        .then(response => {
          Swal.fire('¡Éxito!', 'La tarea se actualizo correctamente.', 'success');
          this.$router.push('/');
        })
        .catch(error => {
          console.error(error);
        });
    },
  },
};
</script>

<style>

#todolist {
	margin:4rem auto;
	padding:2rem 3rem 3rem;
	max-width:500px;
	background:#8298cf;
	color:#FFF;
	box-shadow:-20px -20px 0px 0px rgba(100,100,100,.1);
}

#todolist h1 {
    font-weight:normal;
    font-size:2.6rem;
    letter-spacing:0.05em;
    border-bottom:1px solid rgba(255,255,255,.3); 
}

#todolist li {
	display:flex;
	margin:0 -3rem 4px;
	padding:1.1rem 3rem;
	justify-content:space-between;
	align-items:center;
	background:rgba(255,255,255,0.1);
}

.new-task-form {
	margin-top:3rem;
	display:flex;
	flex-wrap:wrap;
}
.new-task-form label {
	min-width:100%;
	margin-bottom:.5rem;
	font-size:1.3rem;
}
.new-task-form input {
	flex-grow:1;
	border:none;
	background:#f7f1f1;
	padding:0 1.5em;
	font-size:initial;
}
.new-task-form button {
	padding:0 1.3rem;
	border:none;
	background:#8298cf;
	color:white;
	text-transform:uppercase;
	font-weight:bold;
	border:1px solid rgba(255,255,255,.3);
	margin-left:5px;
	cursor:pointer;
	transition:background .2s ease-out;
}

.new-task-form button:hover {
	background:#8298cf;
}
.new-task-form input, 
.new-task-form button {
	font-family:'Quicksand', sans-serif;
	height:3rem;
}



.task-list-container {
  margin: 0 auto;
  width: fit-content;
  padding: 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #fff;
}

.task-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.task-item {
  padding: 10px;
  border-bottom: 1px solid #ddd;
  cursor: pointer;
}

.completed {
  text-decoration: line-through;
  color: #ccc;
}


.task-filters {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
}


.order-button {
  margin-top: 20px;
  text-align: center;
}

.order-button a {
  color:#fff;
}

.delete-button {
  text-align: center;
}

.delete-button a {
  color:#fff;
}

.completed {
  text-decoration: line-through;
}

.container {
  display: flex;
  justify-content: space-between;
}
</style>