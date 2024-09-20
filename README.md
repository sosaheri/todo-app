[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/) 

# Descripción del Proyecto

Esta construida con Laravel 11 y Vue, diseñada para [breve descripción de la funcionalidad principal de tu app]. La aplicación utiliza Laravel Sail para facilitar el desarrollo y la gestión de contenedores Docker.

## Requisitos

- Docker: Asegúrate de tener Docker instalado y en funcionamiento en tu sistema. Descarga e instala la versión más reciente desde https://docs.docker.com/get-docker/.
- Composer: Necesitarás Composer para gestionar las dependencias de PHP. Instálalo siguiendo las instrucciones en https://getcomposer.org/.
- Node.js y npm: Para manejar las dependencias de frontend (Vue.js), instala Node.js y npm desde https://nodejs.org/.

## Instalación y ejecución

1. Clonar el repositorio:

```bash
  git clone https://github.com/sosaheri/todo-app.git
```

2. Iniciar los contenedores:

Desde la raíz del proyecto, ejecuta:

```bash
cd backend
./vendor/bin/sail up -d
```
Esto iniciará todos los contenedores necesarios para la aplicación.

3. Instalar dependencias:

- Backend

Desde la raiz del proyecto

```bash
cd backend
cp .env.example .env
./vendor/bin/sail key:generate
./vendor/bin/sail artisan migrate --seed
```
Esto ejecutará las migraciones y semilleros para crear la base de datos.


- Frontend

Desde la raiz del proyecto

```bash
cd frontend/todo-front
npm install
npm run dev
```
Instala las dependencias de Node.js para el frontend.

3. Compilar el frontend en caso de publicar a producción

Desde la raiz del proyecto

```bash
cd frontend/todo-front
npm run build
```

4. Acceder a la aplicación:

Abre tu navegador y ve a http://localhost:5173


## Estructura del Proyecto

- BACKEND: Contiene el código de la aplicación Laravel, incluyendo modelos, controladores, rutas, etc.
- FRONTEND: Contiene el código de la aplicación Vue.js, incluyendo componentes, vistas y lógica de la interfaz de usuario.

### Breve Explicación de la Implementación

Se utiliza Laravel para manejar la lógica del servidor, la base de datos y las API. Las rutas se definen en ```routes/web.php``` Los modelos se encuentran en la carpeta ```App/Models```.

Se utiliza Vue.js para crear la interfaz de usuario. Los componentes Vue se encuentran en la carpeta ```src/components```. La comunicación entre el frontend y el backend se realiza mediante llamadas a las API de Laravel.

## Referencia del API

#### Obtener todas las tareas

```http
  GET /api/tasks
```


#### Obtener tarea

```http
  GET /api/tasks/${id}
```

| Parametro | Tipo     | Descripción                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `integer` | **Requerido**. Id de la tarea a buscar |

#### Crear tarea

```http
  POST /api/tasks
```

| Parametro | Tipo     | Descripción                        |
| :-------- | :------- | :-------------------------------- |
| `title`      | `string` | **Requerido**. Titulo de la tarea |
| `is_completed`      | `boolean` | **Requerido**. Estatus de la tarea |

#### Actualizar tarea

```http
  PUT /api/tasks/${id}
```

| Parametro | Tipo     | Descripción                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `integer` | **Requerido**. Id de la tarea a Actualizar |
| `title`      | `string` | **Requerido**. Titulo de la tarea |

#### Borrar tarea

```http
  DELETE /api/tasks/${id}
```

| Parametro | Tipo     | Descripción                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `integer` | **Requerido**. Id de la tarea a Borrar |




 






