# ASW Hacker News - Q1 2021
Miembros:
- Pere Masip Rispa
- Xavier Garcia Merino
- Pau Martin Galindo
- Raul Plesa

## Pruebas en local
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
