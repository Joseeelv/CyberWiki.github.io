# Pickle Rick

Created: October 23, 2023 5:31 PM
Etiquetas: Enumeración, Web
Dificultad: Fácil
Enlace:: https://tryhackme.com/room/picklerick
Hecho : Jose Luis 
Status: Done

> *Pickle Rick es una máquina de Tryhackme, con ambientación en la serie animada Rick  and Morty. En esta máquina debemos obtener los tres ingredientes para que Rick pueda realizar su poción.
Haremos uso de una máquina con Linux, conocimientos sobre comandos de Linux y uso de herramientas  y conocimientos sobre páginas web.*
> 

# Task 1: Ingrediente 1

Como hemos leido en la introducción, esta máquina consiste en obtener los tres ingredientes de la poción de Rick.

Primero, vamos a iniciar la máquina y gracias a eso vamos a obtener la IP de la máquina.

Para empezar con este laboratorio vamos a hacer uso de la herramienta → ***Nmap.***

Gracias a ella vamos a obtener los puertos que la máquina tiene abiertos para ver si podemos aprovecharnos de eso.

Con `nmap -p- -v <ip_maquina>` obtenemos:

![Tenemos los puertos 22 y 80 abiertos.](Pickle%20Rick%20bd2865beab524d39acb845a9b7e353d9/Untitled.png)

Tenemos los puertos 22 y 80 abiertos.

Ahora vamos a hacer uso del comando:

`nmap -sC -sV -p22,80- -min-rate 3000 <ip_maquina>` para obtener información más detallada.

![Perfecto, puerto 80 ‘http’ (pagina web) y puerto 22 un servicio ssh.](Pickle%20Rick%20bd2865beab524d39acb845a9b7e353d9/Untitled%201.png)

Perfecto, puerto 80 ‘http’ (pagina web) y puerto 22 un servicio ssh.

Como sabemos que hay un servicio http por el puerto 80, vamos a acceder a la página web:

![Untitled](Pickle%20Rick%20bd2865beab524d39acb845a9b7e353d9/Untitled%202.png)

De momento no encontramos información relevante sobre la página web, pero podemos ver el código fuente de la misma para poder encontrar información.

![Bingo, tenemos un Username en un comentario.](Pickle%20Rick%20bd2865beab524d39acb845a9b7e353d9/a.png)

Bingo, tenemos un Username en un comentario.

Perfecto, ahora podemos proceder a realizar un escaneo de directorios de la página web.

Mediante **gobuster** podemos realizar una búsqueda de directorios, donde podemos encontrar información.

![Untitled](Pickle%20Rick%20bd2865beab524d39acb845a9b7e353d9/Untitled%203.png)

Hemos encontrado el directorio ‘/assets’ y ‘/robots.txt’. Vamos a acceder a ambos:

![Untitled](Pickle%20Rick%20bd2865beab524d39acb845a9b7e353d9/Untitled%204.png)

![b.png](Pickle%20Rick%20bd2865beab524d39acb845a9b7e353d9/b.png)

En robots.txt hemos encontrado una cadena de caracteres, no sabemos si puede ser un nuevo usuario o una contraseña.

Si tenemos un username y una supuesta contraseña, podemos escribir *ip_maquina/login.php* para verificar si hay un login y podemos iniciar sesión con las credenciales obtenidas.

![En efecto, hemos podido iniciar sesión con las credeciales.](Pickle%20Rick%20bd2865beab524d39acb845a9b7e353d9/Untitled%205.png)

En efecto, hemos podido iniciar sesión con las credeciales.

Ahora encontramos como una consola donde podemos introducir comandos:

Si accedemos al archivo.txt encontramos el primer ingrediente.

![¿Qué pasa si listamos el directorio? → Encontramos el primer ingrediente. NICE!!!](Pickle%20Rick%20bd2865beab524d39acb845a9b7e353d9/Untitled%206.png)

¿Qué pasa si listamos el directorio? → Encontramos el primer ingrediente. NICE!!!

![c.png](Pickle%20Rick%20bd2865beab524d39acb845a9b7e353d9/c.png)

Obtenemos la primera flag.

Si abrimos el clue.txt, nos dice que sigamos buscando por el sistema (navegar entre directorios)

# Task 2: Ingrediente 2

Como vemos, el segundo ingrediente no está en este directorio, por tanto, debemos de navegar por los demás directorios.

Para ello vamos a cambiarnos de directorio:

![Hemos encontrado el directorio /home, /root entre otros, pero estos dos son los más importantes.](Pickle%20Rick%20bd2865beab524d39acb845a9b7e353d9/Untitled%207.png)

Hemos encontrado el directorio /home, /root entre otros, pero estos dos son los más importantes.

Vamos a acceder primeramente al directorio ‘/home’ en busca del siguiente ingrediente.

![WOW, hemos encontrado otros dos directorios, ‘/rick’ y ‘/ubuntu’.](Pickle%20Rick%20bd2865beab524d39acb845a9b7e353d9/Untitled%208.png)

WOW, hemos encontrado otros dos directorios, ‘/rick’ y ‘/ubuntu’.

Si accedemos al directorio rick, vemos que hay un archivo que se llama *second ingredients*

![Perfecto, hemos obtenido el segundo ingrediente de la poción de Rick.](Pickle%20Rick%20bd2865beab524d39acb845a9b7e353d9/Untitled%209.png)

Perfecto, hemos obtenido el segundo ingrediente de la poción de Rick.

# Task 3: Ingrediente 3

Por último, para poder buscar el tercer ingrediente, debemos de buscar en la carpeta ‘root’ que se encuentra en el directorio donde también se encuentra ‘home’, como he comentado antes.

Pero hay un problema, solo puede acceder a ella usuario que tengan permisos de root.

Para ello si ejecutamos el comando → `sudo -l` podemos ver si tenemos permisos de root.

![OMG, todos tienen permisos de root, pero no sabemos como acceder a ellos.](Pickle%20Rick%20bd2865beab524d39acb845a9b7e353d9/Untitled%2010.png)

OMG, todos tienen permisos de root, pero no sabemos como acceder a ellos.

Una cosa interesante es que haciendo `sudo su`no hacemos nada, si no que tenemos que realizar una lectura del archivo en ‘modo’ root.

![Untitled](Pickle%20Rick%20bd2865beab524d39acb845a9b7e353d9/Untitled%2011.png)

Finalmente encontramos el archivo que contiene el tercer ingrediente, donde ejecutamos el comando → `sudo less /root/"3rd.txt"`.

---