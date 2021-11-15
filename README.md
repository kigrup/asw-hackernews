# ASW Hacker News - Q1 2021
## Miembros
- Pere Masip Rispa (username: **peremasip**)
- Xavier Garcia Merino (username: **xavo7**)
- Pau Martin Galindo (username: **pirata99**)
- Raul Plesa (username: **kigrup**)

## Taiga
El Taiga ha sido la principal herramienta que hemos usado para organizar nuestro proyecto. En primer lugar, hemos dividido cada una de las historias de usuario para la entrega en Tasks, y les hemos asignado puntos a cada una. Una vez hecho esto las hemos asignado a diferentes miembros del equipo, y después cada uno ha ido actualizando su estado.
Para realizar las tareas anteriores tenemos los siguientes elementos:
  1. Tags: cada tarea tiene una tag asignada que hace referencia a su categoría. Éstas son *Front-end*,*Back-end* y *BD*
  2. Estados: Momento de la implementación de cada tarea. Contamos con 5 estados diferentes: *New*,*In Progress*, *Ready for testing*,*Needs Info* y *Complete*
  3. Sprints: En este caso, todas las historias de usuario que hemos implementado desde la primera revisión de la práctica hasta la primera entrega se encuentran en el *Sprint 2*
Para acabar, este es el enlace al Sprint 2 del proyecto del Taiga correspondiente a este repositorio: https://tree.taiga.io/project/xavo7-asw-hacker-news/taskboard/sprint-2-11149
## La app
### Enlace
http://hackers.hopto.org:13001
## Tecnología
### Node.js
Es un entorno en tiempo de ejecución multiplataforma y de código abierto para la capa de servidor. Está basado en JavaScript, y funciona de forma asíncrona.
Más información: https://nodejs.org/es/
### Express.js
Es un framework para Node.js diseñado especificamente para el diseño de aplicaciones web y APIs. Nos servirá de base de nuestro sistema, y se encargará de comunicarse con la base de datos que veremos a continuación.
Más información: https://expressjs.com/es/
### Sequelize y SQLite
Mientras que SQLite es el sistema con el que gestionaremos nuestra base de datos, Sequelize nos ayudará con la comunicación entre la base de datos y la aplicación gestionando nuestras peticiones.
Más información: https://www.sqlite.org/index.html y https://sequelize.org
## Arquitectura
Para el diseño de nuestra arquitectura hemos seguido el patrón MVC + middlewares para verificar la sesión del usuario
### Patrón Model-View-Controller (MVC)
Este patrón separa la capa de datos y su lógica de una aplicación de su presentación y del módulo encargado de gestionar los eventos y comunicaciones. Si lo vemos desde el punto de vista del usuario, éste interactúa con un controlador, que manipulará el modelo para modificar las vistas que verá ese mismo usuario.
