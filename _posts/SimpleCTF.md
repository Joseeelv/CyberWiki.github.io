# Simple CTF

Created: December 13, 2023 6:00 PM
Etiquetas: Enumeración, Security
Dificultad: Fácil
Enlace:: https://tryhackme.com/room/easyctf
Hecho : Jose Luis 
Status: Done

En esta room vamos a proceder a obtener las flags *user.txt* y *root.txt* mediante varias técnicas que vamos a ver a continuación.

Es una simulación de un CTF para principiantes donde el objetivo es encontrar las flags previamente comentadas.

# User.txt

---

Esta room de Tryhackme, trata sobre un CTF ‘Capture The Flag’ para principiantes.

IP máquina objetivo → 10.10.42.145

Primero de todo vamos a realizar un escaneo de puertos para ver que información podemos encontrar.

Mediante el comando `nmap -p- <ip_maquina`

![Untitled](Simple%20CTF%20485e7b730cca4c8d804eb5e42dbfc2ba/Untitled.png)

Hemos encontrados varios puertos abiertos, vamos a recopilar información de los puertos obtenidos

`nmap -sC -sV -p<puertos_obtenidos>- --min-rate 3000 <ip_maquina>`

![Untitled](Simple%20CTF%20485e7b730cca4c8d804eb5e42dbfc2ba/Untitled%201.png)

Finalmente, encontramos que el puerto 80 ‘http’ es una página web y por tanto vamos a acceder a ella, además encontramos un puerto 21 ‘ftp’ protocolo para enviar archivos y un puerto 2222 que está siendo como servicio ssh.

Si accedemos a la web:

![Untitled](Simple%20CTF%20485e7b730cca4c8d804eb5e42dbfc2ba/Untitled%202.png)

Accedemos a la página de Ubuntu, y no hemos encontrado nada. Vamos a proceder a buscar si hay directorios ocultos

`gobuster dir -url <ip_maquina> -w <wordlist_a_usar>`

![Untitled](Simple%20CTF%20485e7b730cca4c8d804eb5e42dbfc2ba/Untitled%203.png)

hemos encontrado varios directorios como /robots.txt y /simple

## /robots.txt

![Untitled](Simple%20CTF%20485e7b730cca4c8d804eb5e42dbfc2ba/Untitled%204.png)

## /simple

![Untitled](Simple%20CTF%20485e7b730cca4c8d804eb5e42dbfc2ba/Untitled%205.png)

En efecto, esto nos lleva a otra web, a ver si podemos encontrar información válida

![Untitled](Simple%20CTF%20485e7b730cca4c8d804eb5e42dbfc2ba/Untitled%206.png)

En este texto, encontramos un login, vamos a intentar buscar alguna vulnerabilidad en este login

Vamos a hacer uso de la herramienta *searchsploit* para buscar las vulnerabilidades.

![Untitled](Simple%20CTF%20485e7b730cca4c8d804eb5e42dbfc2ba/Untitled%207.png)

Vamos a la web que contiene el script y lo descargamos.

Pero vemos que este script solo funciona en python2.7. Este script, funciona con python3.

[https://github.com/pedrojosenavasperez/CVE-2019-9053-Python3](https://github.com/pedrojosenavasperez/CVE-2019-9053-Python3)

Mediante `python3 exploit.py -u <url> --crack -w <ruta_wordlist>` vamos a comprobar si el script del exploit funciona y tener la password, donde -u (url de la web), —crack(indicamos que vamos a proceder a crackear una password), -w (parámetro para la wordlist).

![Untitled](Simple%20CTF%20485e7b730cca4c8d804eb5e42dbfc2ba/Untitled%208.png)

Desencriptamos la clave y ya podemos realizar una conexión al servidor ssh.

Luego, realizamos una conexión ssh con las credenciales que hemos obtenidos:

![Untitled](Simple%20CTF%20485e7b730cca4c8d804eb5e42dbfc2ba/Untitled%209.png)

Hacemos un cat del user.txt 

![Hemos encontrado la flag.](Simple%20CTF%20485e7b730cca4c8d804eb5e42dbfc2ba/Untitled%2010.png)

Hemos encontrado la flag.

Si hacemos `cd ..` encontramos los directorios *mitch*(se encuentra la user.txt) y *sunbath*.

# Root.txt

---

Vamos a acceder al directorio sunbath con `cd sunbath` , nos salta un error de que no tenemos permisos para acceder al mismo.

Para poder escalar privilegios vamos a buscar alguna vulnerabilidad → `sudo -l`

![Untitled](Simple%20CTF%20485e7b730cca4c8d804eb5e42dbfc2ba/Untitled%2011.png)

Con esto podemos ir a [https://gtfobins.github.io/](https://gtfobins.github.io/) para poder obtener información sobre el exploit.

![Untitled](Simple%20CTF%20485e7b730cca4c8d804eb5e42dbfc2ba/Untitled%2012.png)

Ahora realizamos el exploit y hacemos `bash` para poder poner una consola normal y buscamos la flag.

![Untitled](Simple%20CTF%20485e7b730cca4c8d804eb5e42dbfc2ba/Untitled%2013.png)

---