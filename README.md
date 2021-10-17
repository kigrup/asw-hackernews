# ASW Hacker News
Proyecto de ASW Q1 2021

### Instrucciones para ejecutar de forma local
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

> Hay que tener en cuenta que el container se borra pero las imágenes siguen ocupando espacio. Podemos borrar todas las imágenes generadas añadiendo un parámetro al apagar el contenedor tal que así:
> ```
> docker-compose down --rmi 'all'
> ```
