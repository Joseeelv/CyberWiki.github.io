---
title: RootMe
layout: post
post-image: "../assets/images/Rooms/RootMe/rootme.png"
description: A ctf for beginners, can you root me?
difficulty: Fácil
enlace: https://tryhackme.com/r/room/rrootme
tags:
- Enumeración
- Web
- 
---

# Task 2: Reconnaissance

Lo primero que vamos a hacer va a ser realizar un escaneo de la ip de la máquina dada.

![2 puertos abiertos, vamos a ver que información tenemos](RootMe%203d6b7480c9cd43e199e154c90aca78fe/Untitled.png)

2 puertos abiertos, vamos a ver que información tenemos

Mediante el comando → `nmap -sC -sV -p22,80- --min-rate 3000 <ip_maquina>`

![Hemos encontrado información sobre los puertos 80 y 22.](RootMe%203d6b7480c9cd43e199e154c90aca78fe/Untitled%201.png)

Hemos encontrado información sobre los puertos 80 y 22.

Como tenemos un puerto 80 “http”, sabemos de antemano que debe de haber una página web.

![En efecto, pero no tenemos nada, o si…](RootMe%203d6b7480c9cd43e199e154c90aca78fe/Untitled%202.png)

En efecto, pero no tenemos nada, o si…

Podemos hacer uso de `gobuster` para poder buscar directorios ocultos en la página web.

![Nice, hemos encontrado una gran cantidad de directorios ocultos, vamos a ver en que consiste cada uno](RootMe%203d6b7480c9cd43e199e154c90aca78fe/Untitled%203.png)

Nice, hemos encontrado una gran cantidad de directorios ocultos, vamos a ver en que consiste cada uno

## Directorio /css y /js

![Untitled](RootMe%203d6b7480c9cd43e199e154c90aca78fe/Untitled%204.png)

![Untitled](RootMe%203d6b7480c9cd43e199e154c90aca78fe/Untitled%205.png)

Ambas contienen archivos de configuración de la página web.

## Directorio /panel

![Untitled](RootMe%203d6b7480c9cd43e199e154c90aca78fe/Untitled%206.png)

Desde aquí podemos subir archivos a la página web.

## Directorio /uploads

![Todavía no hay ningun archivo subido](RootMe%203d6b7480c9cd43e199e154c90aca78fe/Untitled%207.png)

Todavía no hay ningun archivo subido

Vemos todos los archivos que hemos subido al sitio web.

# Task 3: Getting a shell

En resumen, hemos encontrado mediante `gobuster`varios directorios ocultos. Los más importantes son /panel (subir archivos) y /uploads(acceder y abrirlos).

Podemos buscar en Google sobre como subir un archivo “web shell” que realize una reverse-shell.

Yo he buscado en Google *reverse-shell php* → [véase aquí](https://pentestmonkey.net/tools/web-shells/php-reverse-shell).

![Descargamos el archivo .tar.gz que contiene un script en php.](RootMe%203d6b7480c9cd43e199e154c90aca78fe/Untitled%208.png)

Descargamos el archivo .tar.gz que contiene un script en php.

Procedemos a editar algunos parámetros, para poder hacer que se realice la reverse-shell

![a.png](RootMe%203d6b7480c9cd43e199e154c90aca78fe/a.png)

Donde en ***$ip*** (ip de nuestra maquina), ***$port*** (puerto de escucha del netcat).

![b.png](RootMe%203d6b7480c9cd43e199e154c90aca78fe/b.png)

![Untitled](RootMe%203d6b7480c9cd43e199e154c90aca78fe/Untitled%209.png)

Vemos que empieza a escuchar, hasta que ejecutemos el script subido.

Pinchamos en él mientras tenemos un netcat escuchando en el mismo puerto que hemos puesto.

Tambien podemos realizar un curl desde la consola de la manera —> `curl http://ip_servidor/uploads/nombre_archivo`

![Wow, demasiados directorios.](RootMe%203d6b7480c9cd43e199e154c90aca78fe/Untitled%2010.png)

Wow, demasiados directorios.

Al hacer el `ls` encontramos muchos directorios, y tenemos que buscar tanto el ‘*user.txt*’ como ‘*root.txt’.*

Para buscar el ‘*user.txt*’, vamos a hacer uso del comando `find ruta -type f -name "nombre_archivo" 2> /dev/null` donde ruta será **“/**” (raíz), “**f**” ( el tipo del archivo y “**2> /dev/null**” (los archivos de errores no aparecen).

Como resultado:

![Hacemos uso de cat y hemos encontrado la flag de user.txt](RootMe%203d6b7480c9cd43e199e154c90aca78fe/c.png)

Hacemos uso de cat y hemos encontrado la flag de user.txt

# Task 4: Privilege escalation

Finalmente, necesitamos obtener la flag perteneciente a *‘root.txt*’, para ello necesitamos escalar privilegio hasta ser roots.

Hay muchas maneras de poder escalar privilegios, por ejemplo, podemos hacer un sudo -l y ver quien tiene permisos (pero esto aqui no funciona ya que estamos en una shell).

Mediante los archivos que tienen permisos de SUID, podemos buscar alguno que nos permita acceder a permisos de root

`find / -type f -user root -perm -u=s 2>/dev/null` . Donde -user (nos especifica el usuario), -perm -u=s(busca los archivos que tengan establecido el bit SUID “Set User ID” en sus permisos, ademas busca desde el directorio raiz y archivos que son ficheros.

![Vaya, python tiene permisos de SUID algo muuuuuy extraño.](RootMe%203d6b7480c9cd43e199e154c90aca78fe/Untitled%2011.png)

Vaya, python tiene permisos de SUID algo muuuuuy extraño.

Como hemos visto, python tiene permisos de SUID, asi que mediante la página web [https://gtfobins.github.io/gtfobins/python/](https://gtfobins.github.io/gtfobins/python/) podemos buscar información de python en SUID:

![Untitled](RootMe%203d6b7480c9cd43e199e154c90aca78fe/Untitled%2012.png)

En la shell vamos a hacer uso del segundo comando, ya que nos permite escalar privilegios de root mediante python.

![Perfecto, somos root.](RootMe%203d6b7480c9cd43e199e154c90aca78fe/Untitled%2013.png)

Perfecto, somos root.

Para acabar, tiramos un `cat /root/root.txt` para ver así la flag.

![d.png](RootMe%203d6b7480c9cd43e199e154c90aca78fe/d.png)

---