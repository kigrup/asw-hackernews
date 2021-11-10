# ASW Hacker News - Q1 2021
##Miembros:
- Pere Masip Rispa
- Xavier Garcia Merino
- Pau Martin Galindo
- Raul Plesa

##Taiga
El Taiga ha sido la principal herramienta que hemos usado para organizar nuestro proyecto. En primer lugar, hemos dividido cada una de las historias de usuario para la entrega en Tasks, y les hemos asignado puntos a cada una. Una vez hecho esto las hemos asignado a diferentes miembros del equipo, y después cada uno ha ido actualizando su estado.
Para realizar las tareas anteriores tenemos los siguientes elementos:
  1. Tags: cada tarea tiene una tag asignada que hace referencia a su categoría. Éstas son *Front-end*,*Back-end* y *BD*
  2. Estados: Momento de la implementación de cada tarea. Contamos con 5 estados diferentes: *New*,*In Progress*, *Ready for testing*,*Needs Info* y *Complete*
  3. Sprints: En este caso, todas las historias de usuario que hemos implementado desde la primera revisión de la práctica hasta la primera entrega se encuentran en el *Sprint 2*

Para acabar, este es el enlace al Sprint 2 del proyecto del Taiga correspondiente a este repositorio: https://tree.taiga.io/project/xavo7-asw-hacker-news/taskboard/sprint-2-11149
### Ejecutar proyecto
Una vez clonado el repo ejecutamos el script que crea el container de Docker. Éste se descarga automáticamente todos los módulos necesarios y ejecuta el servidor ahí.
```
./run.sh
```
En cualquier momento podemos parar la ejecución cerrando el terminal que se abre. Para apagar todos los contenedors y borrarlos junto a todas las imágenes que hay en el sistema (cuidado si usas Docker para cualquier otra cosa) hacemos:
```
./kill.sh
```
### Datos
El contenedor monta un volumen para guardar los datos fuera del contenedor. Estos se encuentran en un archivo sqlite, en **./db/data**. Por lo tanto si se quiere reiniciar la base de datos o se le ha hecho algún cambio a la estructura, hay que borrar este archivo.

### Registros
La aplicación redirige todos los logs también a través de un volumen a la carpeta **./logs**.
