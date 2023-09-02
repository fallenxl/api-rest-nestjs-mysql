# Gestor de tareas Kanban 🚀

[![NestJS](https://img.shields.io/badge/NestJS-7.0.0+-red.svg)](https://nestjs.com/)
[![TypeORM](https://img.shields.io/badge/TypeORM-5.0.0+-green.svg)](https://typeorm.io/)
[![JWT](https://img.shields.io/badge/JWT-8.0.0+-blue.svg)](https://jwt.io/)

Gestiona tus tareas de estilo Kanban desarrollado con NestJS, TypeORM y autenticación JWT.

**Deploy:** https://api-rest-nestjs-mysql-production.up.railway.app/

## Características

- Interfaz de usuario intuitiva y atractiva para gestionar tus tareas.
- Tres estados de tareas predefinidos: 'To Do', 'In Progress' y 'Done'.
- Autenticación segura con JWT para proteger tus datos.
- Almacenamiento de tareas en una base de datos compatible con TypeORM.
- Desplegado en Railway.

## Requisitos

- Node.js (v14+)
- TypeScript (v4+)
- Mysql u otra base de datos compatible con TypeORM

## Instalación

1. Clona este repositorio:

   ```bash
   git clone https://github.com/tu-usuario/tu-proyecto.git
   ```

Navega al directorio del proyecto:

```bash
cd tu-proyecto

```

Instala las dependencias:

```bash

npm install
```

Configura tus variables de entorno en un archivo .env:
dotenv

# Configuración del archivo .env

En el proyecto hay un .env.example el cual te guiara las variables que se utilizan.

# Inicia la aplicación:

```bash

npm start

```

# Uso

Accede a la aplicación desde tu navegador en http://localhost:3000.
Regístrate o inicia sesión para empezar a utilizar el gestor de tareas Kanban.
Crea nuevas tareas y organízalas en los estados 'To Do', 'In Progress' y 'Done'.

# Endpoints

## Auntenticacion

### Iniciar Sesion
**Metodo:** POST<br/>
**Ruta:** '/auth/login'<br/>
**Parametros JSON:**

```json
{
  "username": "nombre_de_usuario",
  "password": "password"
}
```

**Codigo de Respuesta:** 201<br/>
**Ejemplo de Respuesta:**

```json
{ "access_token": "token_de_acceso" }
```
### Registrarse
**Metodo:** POST<br/>
**Ruta:** '/auth/signup'<br/>
**Parametros JSON:**

```json
{
  "username": "nombre_de_usuario",
  "password": "password"
}
```
**Ejemplo de Respuesta:**

```json
{ "access_token": "token_de_acceso" }
```

## Tableros

### Crear tablero
**Metodo:** POST<br/>
**Ruta:** '/boards'<br/>
**Authorization:** 'Bearer <token_del_usuario>'<br/>
**Parametros JSON:**

```json
{
  "title" : "title_board"
}
```


### Obtener todos los tableros
**Metodo:** GET<br/>
**Ruta:** '/boards'<br/>
**Authorization:** 'Bearer <token_del_usuario>'


### Obtener tablero por id
**Metodo:** GET<br/>
**Ruta:** '/boards/:id'<br/>
**Authorization:** 'Bearer <token_del_usuario>'

### Actualizar tablero por id
**Metodo:** PUT<br/>
**Ruta:** '/boards/:id'<br/>
**Authorization:** 'Bearer <token_del_usuario>'<br/>
**Parametros JSON:**
```json
{
  "title" : "title_board",
}
```

### Eliminar tablero por id
**Metodo:** DELETE<br/>
**Ruta:** '/boards/:id'<br/>
**Authorization:** 'Bearer <token_del_usuario>'


## Tareas

### Crear tarea
**Metodo:** POST<br/>
**Ruta:** '/boards/:boardId/tasks'<br/>
**Authorization:** 'Bearer <token_del_usuario>'<br/>
**Parametros JSON:**

```json
{
  "title" : "title_task"
}
```
**Codigo de Respuesta:** 201


### Obtener todas las tareas
**Metodo:** GET<br/>
**Ruta:** '/boards/:boardId/tasks'<br/>
**Authorization:** 'Bearer <token_del_usuario>'


### Obtener tarea por id
**Metodo:** GET<br/>
**Ruta:** '/boards/:boardId/tasks/:id'<br/>
**Authorization:** 'Bearer <token_del_usuario>'

### Actualizar tablero por id
**Metodo:** PUT<br/>
**Ruta:** '/boards/:boardId/tasks/:id'<br/>
**Authorization:** 'Bearer <token_del_usuario>'<br/>
**Parametros JSON:**
```json
{
  "title" : "title_board",
  "status": ["To Do", "In Progress", "Done"]
}
```

### Eliminar tarea por id
**Metodo:** DELETE<br/>
**Ruta:** '/boards/:boardId/tasks/:id' <br/>
**Authorization:** 'Bearer <token_del_usuario>'


# Contribuciones


¡Las contribuciones son bienvenidas! Si tienes ideas para mejoras o encuentras errores, por favor crea un issue o envía una solicitud de pull.

Hecho con ❤️ por Axl Santos.
