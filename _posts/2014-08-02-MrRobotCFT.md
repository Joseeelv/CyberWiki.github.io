---
title: Mr Robot CTF
layout: post
post-image: "../assets/images/Labs/MrRobotCTF/mr.png"
description: Esta room se basa en la serie de Mr. Robot. Se realiza un escaneo de puertos, se descubren directorios ocultos, se encuentra una clave en el archivo robots.txt, se obtienen credenciales de acceso a un panel de login de WordPress, se realiza una revershell PHP para obtener acceso remoto, se encuentran y se obtienen claves adicionales, se descifra una contraseña encriptada, se escalan privilegios a root y se encuentra la última clave para completar el ejercicio.
difficulty: Media
enlace: https://tryhackme.com/r/room/mrrobot
tags:
- Enumeración
- Exploit
- Fuerza-bruta
- Hash cracking
- Web
---
# Proceso para conseguir la user.txt:
Vamos a realizar un escaneo de puertos desde la maquina atacante:

  ```bash
sudo nmap -p- -open -sV -sC -sS --min-rate 5000 -n -Pn -vvv <ip-victima>
```

Hemos obtenido:

<div style="text-align: center; ">
    <img src="../assets/images/Labs/MrRobotCTF/Untitled1.png" alt="Foto"/>
  </div>

Tenemos dos protocolos http (80) y https(443), podemos acceder a ella introduciendo la ip en la barra del buscador de nuestro navegador.

Vamos ver si hay directorios ocultos, mediante fuzzing con gobuster:

<div style="text-align: center; ">
    <img src="../assets/images/Labs/MrRobotCTF/Untitled2.png" alt="Foto"/>
  </div>

Y vamos a ver que directorios escondidos tiene la pagina web:

<div style="text-align: center; ">
    <img src="../assets/images/Labs/MrRobotCTF/Untitled3.png" alt="Foto"/>
  </div>

Primero de todo, toda página web contiene el directorio */robots.txt* por tanto vamos a echarle un ojo:

<div style="text-align: center; ">
    <img src="../assets/images/Labs/MrRobotCTF/Untitled 4.png" alt="Foto"/>
</div>  

Encontramos la primera key, que la podemos ver accediendo desde la barra de navegación o haciendo un curl desde la consola:
<div style="text-align: center; ">
    <img src="../assets/images/Labs/MrRobotCTF/Untitled 5.png" alt="Foto"/>
</div>  

Hemos encontrado un directorio */dashboard* que en verdad es el directorio admin de un wordpress */wp-admin* vamos a hacerle un curl a ver que enconrtamos:

<div style="text-align: center; ">
    <img src="../assets/images/Labs/MrRobotCTF/Untitled 6.png" alt="Foto"/>
</div>  

Encontramos un panel de login, para ello necesitamos obtener un user y contraseña.

También hemos encontrado un directorio *license* que si accedemos a el vamos a encontrar al final del todo una contraseña, hacemos un curl a dicho directorio y obtenemos el user y la contraseña:

<div style="text-align: center; ">
    <img src="../assets/images/Labs/MrRobotCTF/Untitled 7.png" alt="Foto"/>
</div>  

Está en base64 , por tanto, vamos a convertirlo y obtenemos la contraseña y el usuario

<div style="text-align: center; ">
    <img src="../assets/images/Labs/MrRobotCTF/Untitled 8.png" alt="Foto"/>
</div>  

Ahí tenemos las credenciales, vamos a iniciar sesión:

<div style="text-align: center; ">
    <img src="../assets/images/Labs/MrRobotCTF/Untitled 8.png" alt="Foto"/>
</div>  

Estamos dentro, ahora vamos a proceder a buscar las demás keys.

Como sabemos wordpress corre bajo php, por tanto, vamos a realizar una revershell php para poder acceder y tener ejecución remota de comandos, mediante un script encontrado en github

[https://github.com/pentestmonkey/php-reverse-shell](https://github.com/pentestmonkey/php-reverse-shell)

Ahora pegamos el script encontrado en github en la seccion Appearance → editor →archive:

<div style="text-align: center; ">
    <img src="../assets/images/Labs/MrRobotCTF/Untitled 10.png" alt="Foto"/>
</div>  

Ahora abrimos un puerto para realizar la escucha mediante netcat y modificamos el script introducido anteriormente con nuestra IP y el puerto seleccionado para realizar la escucha:

<div style="text-align: center; ">
    <img src="../assets/images/Labs/MrRobotCTF/Untitled 11.png" alt="Foto"/>
</div>  


<div style="text-align: center; ">
    <img src="../assets/images/Labs/MrRobotCTF/Untitled 12.png" alt="Foto"/>
</div>  


Realizamos la revershell y estamos dentro.

Ahora vamos a buscar las demás keys, vamos a comprobar que una de ellas sea del tipo .txt, por tanto vamos a buscarla.

<div style="text-align: center; ">
    <img src="../assets/images/Labs/MrRobotCTF/Untitled 13.png" alt="Foto"/>
</div>  


Buscamos todos los archivos que terminen en la extensión .txt, y vemos que en el directorio */home* encontramos la segunda key.

<div style="text-align: center; ">
    <img src="../assets/images/Labs/MrRobotCTF/Untitled 14.png" alt="Foto"/>
</div>  


Hacemos un cat para obtenerla, pero nos dice que no tenemos permisos y en efecto, solamente tiene permiso de lectura el root.

<div style="text-align: center; ">
    <img src="../assets/images/Labs/MrRobotCTF/Untitled 15.png" alt="Foto"/>
</div>  


Además de la key, el home encontramos otro fichero, que es una password:

<div style="text-align: center; ">
    <img src="../assets/images/Labs/MrRobotCTF/Untitled 16.png" alt="Foto"/>
</div>  


Si le hacemos un cat, obtenemos una contraseña para poder escalar privilegios, pero esta está en encriptada, para ello vamos a hacer uso de una web que nos permite desencriptar contraseñas con hashmd5 [https://crackstation.net/](https://crackstation.net/):

<div style="text-align: center; ">
    <img src="../assets/images/Labs/MrRobotCTF/Untitled 17.png" alt="Foto"/>
</div>  


Ahí tenemos nuestra contraseña, para poder escalar de privilegios a root.

Ahora hacemos sudo su y ponemos la password.

<div style="text-align: center; ">
    <img src="../assets/images/Labs/MrRobotCTF/Untitled 18.png" alt="Foto"/>
</div>  


Primero hacemos un tratamiento de la tty, para poder escribir el comando su, para escalar privilegios.

<div style="text-align: center; ">
    <img src="../assets/images/Labs/MrRobotCTF/Untitled 19.png" alt="Foto"/>
</div>  


ahora somos robot y podemos acceder a la segunda key.

<div style="text-align: center; ">
    <img src="../assets/images/Labs/MrRobotCTF/Untitled 20.png" alt="Foto"/>
</div>  


Ahora para encontrar la tercera y ultima key, lo que vamos a hacer es tirar otro find donde el nombre sea key-3-of-3.txt, para ver donde se ubica y nos aparece nada, por tanto vamos a buscar binarios:

<div style="text-align: center; ">
    <img src="../assets/images/Labs/MrRobotCTF/Untitled 21.png" alt="Foto"/>
</div>  


Y encontramos uno que es muy raro que es el de nmap y buscamos una vulnerabilidad en gtfobins de nmap Sudo, para poder hacernos root:

<div style="text-align: center; ">
    <img src="../assets/images/Labs/MrRobotCTF/Untitled22.png" alt="Foto"/>
</div>  


Vamos a hacer uso de la ocpión b:

<div style="text-align: center; ">
    <img src="../assets/images/Labs/MrRobotCTF/Untitled23.png" alt="Foto"/>
</div>  


Y ya tenemos permisos root, para poder acceder a la tercera y última key, que se encuentra en /root/key-3-of-3.txt

<div style="text-align: center; ">
    <img src="../assets/images/Labs/MrRobotCTF/Untitled24.png" alt="Foto"/>
</div>  

Listo, tenemos el ejercicio completado.

---