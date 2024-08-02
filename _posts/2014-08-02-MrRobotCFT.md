---
title: Mr Robot CTF
layout: post
post-image: "../assets/images/Labs/MrRobotCTF/mr.png"
description: En este documento se detalla el proceso de un CTF (Capture The Flag) de Mr. Robot. Se realiza un escaneo de puertos, se descubren directorios ocultos, se encuentra una clave en el archivo robots.txt, se obtienen credenciales de acceso a un panel de login de WordPress, se realiza una revershell PHP para obtener acceso remoto, se encuentran y se obtienen claves adicionales, se descifra una contraseña encriptada, se escalan privilegios a root y se encuentra la última clave para completar el ejercicio.
difficulty: Media
enlace: https://tryhackme.com/r/room/mrrobot
tags:
- Enumeración
- Exploit
- Fuerza-bruta
- Hash cracking
- Web
---

Vamos a realizar un escaneo de puertos desde la maquina atacante:

![Untitled](Mr%20Robot%20CTF%207a258c36a903403f97c0f024c98bfbbe/Untitled.png)

Hemos obtenido:

![Untitled](Mr%20Robot%20CTF%207a258c36a903403f97c0f024c98bfbbe/Untitled%201.png)

Tenemos dos protocolos http (80) y https(443), podemos acceder a ella introduciendo la ip en la barra del buscador de nuestro navegador.

Vamos ver si hay directorios ocultos, mediante fuzzing con gobuster:

![Untitled](Mr%20Robot%20CTF%207a258c36a903403f97c0f024c98bfbbe/Untitled%202.png)

Y vamos a ver que directorios escondidos tiene la pagina web:

![Untitled](Mr%20Robot%20CTF%207a258c36a903403f97c0f024c98bfbbe/Untitled%203.png)

Primero de todo, toda página web contiene el directorio */robots.txt* por tanto vamos a echarle un ojo:

![Untitled](Mr%20Robot%20CTF%207a258c36a903403f97c0f024c98bfbbe/Untitled%204.png)

Encontramos la primera key, que la podemos ver accediendo desde la barra de navegación o haciendo un curl desde la consola:

![Untitled](Mr%20Robot%20CTF%207a258c36a903403f97c0f024c98bfbbe/Untitled%205.png)

Hemos encontrado un directorio */dashboard* que en verdad es el directorio admin de un wordpress */wp-admin* vamos a hacerle un curl a ver que enconrtamos:

![Untitled](Mr%20Robot%20CTF%207a258c36a903403f97c0f024c98bfbbe/Untitled%206.png)

Encontramos un panel de login, para ello necesitamos obtener un user y contraseña.

También hemos encontrado un directorio *license* que si accedemos a el vamos a encontrar al final del todo una contraseña, hacemos un curl a dicho directorio y obtenemos el user y la contraseña:

![Untitled](Mr%20Robot%20CTF%207a258c36a903403f97c0f024c98bfbbe/Untitled%207.png)

Está en base64 , por tanto, vamos a convertirlo y obtenemos la contraseña y el usuario

![Untitled](Mr%20Robot%20CTF%207a258c36a903403f97c0f024c98bfbbe/Untitled%208.png)

Ahí tenemos las credenciales, vamos a iniciar sesión:

![Untitled](Mr%20Robot%20CTF%207a258c36a903403f97c0f024c98bfbbe/Untitled%209.png)

Estamos dentro, ahora vamos a proceder a buscar las demás keys.

Como sabemos wordpress corre bajo php, por tanto, vamos a realizar una revershell php para poder acceder y tener ejecución remota de comandos, mediante un script encontrado en github

[https://github.com/pentestmonkey/php-reverse-shell](https://github.com/pentestmonkey/php-reverse-shell)

Ahora pegamos el script encontrado en github en la seccion Appearance → editor →archive:

![Untitled](Mr%20Robot%20CTF%207a258c36a903403f97c0f024c98bfbbe/Untitled%2010.png)

Ahora abrimos un puerto para realizar la escucha mediante netcat y modificamos el script introducido anteriormente con nuestra IP y el puerto seleccionado para realizar la escucha:

![Untitled](Mr%20Robot%20CTF%207a258c36a903403f97c0f024c98bfbbe/Untitled%2011.png)

![Untitled](Mr%20Robot%20CTF%207a258c36a903403f97c0f024c98bfbbe/Untitled%2012.png)

Realizamos la revershell y estamos dentro.

Ahora vamos a buscar las demás keys, vamos a comprobar que una de ellas sea del tipo .txt, por tanto vamos a buscarla.

![Untitled](Mr%20Robot%20CTF%207a258c36a903403f97c0f024c98bfbbe/Untitled%2013.png)

Buscamos todos los archivos que terminen en la extensión .txt, y vemos que en el directorio */home* encontramos la segunda key.

![Untitled](Mr%20Robot%20CTF%207a258c36a903403f97c0f024c98bfbbe/Untitled%2014.png)

Hacemos un cat para obtenerla, pero nos dice que no tenemos permisos y en efecto, solamente tiene permiso de lectura el root.

![Untitled](Mr%20Robot%20CTF%207a258c36a903403f97c0f024c98bfbbe/Untitled%2015.png)

Además de la key, el home encontramos otro fichero, que es una password:

![Untitled](Mr%20Robot%20CTF%207a258c36a903403f97c0f024c98bfbbe/Untitled%2016.png)

Si le hacemos un cat, obtenemos una contraseña para poder escalar privilegios, pero esta está en encriptada, para ello vamos a hacer uso de una web que nos permite desencriptar contraseñas con hashmd5 [https://crackstation.net/](https://crackstation.net/):

![Untitled](Mr%20Robot%20CTF%207a258c36a903403f97c0f024c98bfbbe/Untitled%2017.png)

Ahí tenemos nuestra contraseña, para poder escalar de privilegios a root.

Ahora hacemos sudo su y ponemos la password.

![Untitled](Mr%20Robot%20CTF%207a258c36a903403f97c0f024c98bfbbe/Untitled%2018.png)

Primero hacemos un tratamiento de la tty, para poder escribir el comando su, para escalar privilegios.

![Untitled](Mr%20Robot%20CTF%207a258c36a903403f97c0f024c98bfbbe/Untitled%2019.png)

ahora somos robot y podemos acceder a la segunda key.

![Untitled](Mr%20Robot%20CTF%207a258c36a903403f97c0f024c98bfbbe/Untitled%2020.png)

Ahora para encontrar la tercera y ultima key, lo que vamos a hacer es tirar otro find donde el nombre sea key-3-of-3.txt, para ver donde se ubica y nos aparece nada, por tanto vamos a buscar binarios:

![Untitled](Mr%20Robot%20CTF%207a258c36a903403f97c0f024c98bfbbe/Untitled%2021.png)

Y encontramos uno que es muy raro que es el de nmap y buscamos una vulnerabilidad en gtfobins de nmap Sudo, para poder hacernos root:

![Untitled](Mr%20Robot%20CTF%207a258c36a903403f97c0f024c98bfbbe/Untitled%2022.png)

Vamos a hacer uso de la ocpión b:

![Untitled](Mr%20Robot%20CTF%207a258c36a903403f97c0f024c98bfbbe/Untitled%2023.png)

Y ya tenemos permisos root, para poder acceder a la tercera y última key, que se encuentra en /root/key-3-of-3.txt

![Untitled](Mr%20Robot%20CTF%207a258c36a903403f97c0f024c98bfbbe/Untitled%2024.png)

Listo, tenemos el ejercicio completado.

---