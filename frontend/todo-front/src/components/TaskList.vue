<template>
  <div class="task-list-container" id="todolist">
    <h1>Lista de Tareas</h1>
    <ul class="task-list">
      <li v-for="task in tareasFiltradas" :key="task.id" class="task-item">

        <input type="checkbox" v-model="task.is_completed" @change="updateTaskStatus(task)">
        
        <span :class="{ completed: task.is_completed }">{{ task.title }}</span>

        <div @click="editTask(task)">
          <i class="fa-solid fa-pen-to-square" style="font-size: 24px; cursor: pointer;"></i>
        </div>

        <div @click="deleteTask(task.id)">
          <i class="fa-solid fa-trash" style="font-size: 24px; cursor: pointer;"></i>
        </div>
      </li>
    </ul>

    <div class="new-task-form">
        <input type="text" v-model="newTaskTitle" placeholder="Nueva Tarea">
        <button @click="addTask">Agregar</button>
    </div>


    <div class="task-filters">
      <div>
          <div> {{ totalTareasPendientes }} Pendientes</div>
      </div>

      <div class="delete-button" @click="eliminarCompletadas"><a href="#">Eliminar completadas</a></div>

      <div>
        <select v-model="filtro">
          <option value="filtro">Filtra las tareas</option>
          <option value="todas">Todas</option>
          <option value="pendientes">Pendientes</option>
          <option value="completadas">Completadas</option>
        </select>
      </div>
    </div>

    <!-- <div class="order-button" @click="ordenarPorFecha"><a href="#">Ordenar por fecha</a></div> -->
  </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
  data() {
    return {
      tasks: [],
      newTaskTitle: '',
      filtro: 'filtro',
    };
  },
  computed: {
    totalTareasPendientes() {
      return this.tasks.filter(task => !task.is_completed).length;
    },
    tareasFiltradas() {
      switch (this.filtro) {
        case 'pendientes':
          return this.tasks.filter(task => !task.is_completed);
        case 'completadas':
          return this.tasks.filter(task => task.is_completed);
        default:
          return this.tasks;
      }
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
      Swal.fire({
        title: '¿Estás seguro?',
        text: 'Esta acción no se puede deshacer',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar'
      }).then((result) => {
        if (result.isConfirmed) {
          axios.delete(`/tasks/${taskId}`)
            .then(() => {
              this.tasks = this.tasks.filter(task => task.id !== taskId);
              Swal.fire('¡Éxito!', 'La tarea se eliminó correctamente.', 'success');
            })
            .catch(error => {
              console.error(error);
              Swal.fire('Error', 'Ocurrió un error al eliminar la tarea.', 'error');
            });
        }
      });
    },
    editTask(task) {
      this.$router.push({ name: 'EditTaskForm', params: { id: task.id } });
    },
    addTask() {
      if (!this.newTaskTitle.trim()) {
        return; ks
      }
      const newTask = {
        title: this.newTaskTitle,
      };

      axios.post('/tasks', newTask)
        .then(response => {
          this.tasks.push(response.data);
          this.newTaskTitle = '';
          Swal.fire('¡Éxito!', 'La tarea se creó correctamente.', 'success');
        })
        .catch(error => {
          console.error(error);
        });
    },
    updateTaskStatus(task) {
      axios.put(`/tasks/${task.id}`, { is_completed: task.is_completed })
        .then(() => {
          console.log('Tarea actualizada correctamente');
        })
        .catch(error => {
          console.error(error);
          alert('Error al actualizar la tarea');
        });
    },
    eliminarCompletadas() {
      Swal.fire({
        title: '¿Estás seguro?',
        text: '¿Quieres eliminar todas las tareas completadas?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar'
      }).then((result) => {
        if (result.isConfirmed)
      {
          const completedTasks = this.tasks.filter(task => task.is_completed);
          if (completedTasks.length > 0) {
            Swal.fire({
              title: 'Confirmación final',
              text: `¿Estás seguro de eliminar ${completedTasks.length} tareas completadas?`,
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Eliminar'
            }).then((confirmed) => {
              if (confirmed.isConfirmed) {
                completedTasks.forEach(task => {
                  axios.delete(`/tasks/${task.id}`)
                    .then(() => {
                      console.log('Tarea eliminada:', task.id);
                      this.tasks = this.tasks.filter(remainingTask => remainingTask.id !== task.id);
                    })
                    .catch(error => {
                      console.error(error);
                      Swal.fire('Error', 'Ocurrió un error al eliminar tareas.', 'error');
                    });
                });
              }
            });
          } else {
            Swal.fire('No hay tareas completadas para eliminar.', '', 'info');
          }
        }
      });
    },
    ordenarPorFecha() {
      this.tasks.sort((a, b) => {
        return new Date(a.created_at) - new Date(b.created_at);
      });
    }
  }
}
</script>

<style>
select {
  appearance: none; 
  -webkit-appearance: none;
  -moz-appearance: none;
  border: 0px solid #ccc;
  border-radius: 4px;
  padding: 10px;
  font-size: 15px;
  color: #fff;
  background-color: #8298cf;
  background-repeat: no-repeat;
  background-position: right center;
}

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
