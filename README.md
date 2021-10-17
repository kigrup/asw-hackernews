# ASW Hacker News - Q1 2021
Miembros:
- Pere Masip Rispa
- Xavier Garcia Merino
- Pau Martin Galindo
- Raul Plesa

## Pruebas en local
### Ejecutar proyecto
Una vez clonado el repositorio instalamos las dependencias:
```
npm install
```
Y para ejecutarlo todo:
```
docker-compose up --build
```
En cualquier momento podemos parar la ejecución con CTRL+C. Una vez acabada podemos apagar y borrar el contenedor con:
```
docker-compose down
```

> Hay que tener en cuenta que el container se borra pero las imágenes siguen ocupando espacio (y se van acumulando). Para no acabar con muchas copias de la imágen del servidor (1GB cada una) podemos borrar todas las imágenes generadas añadiendo un parámetro al apagar el contenedor tal que así:
> ```
> docker-compose down --rmi 'all'
> ```
### Base de datos
Para los datos de la base de datos se monta un volumen fuera del contenedor en la carpeta del repo, para ser más exactos en **/mariadb/dbdata**. De esta forma, si queremos reiniciar por completo la base de datos (por ejemplo cuando modificamos el *init.sql*) hay que borrar esta carpeta.
