# Overpass

Created: October 20, 2023 9:59 PM
Etiquetas: Cron, Owasp, Security
Dificultad: Fácil
Enlace:: https://tryhackme.com/r/room/overpass
Hecho : Jose Luis 
Status: Done

Vamos a realizar la maquina Overpass de THM, donde debemos de entrar en una máquina con el fin de encontrar información (flags).

Primero de todo vamos a realizar un escaneo de los puertos para ver que servicios tiene abiertos para aprovecharnos de eso.

![Untitled](Overpass%20f86ac883414643df996ccff335aa6aa0/Untitled.png)

![Untitled](Overpass%20f86ac883414643df996ccff335aa6aa0/Untitled%201.png)

Tenemos dos puertos abiertos → 22 y 80

Vamos a obtener información sobre ellos

Perfecto, puerto 22 ssh y puerto 80 http (una pagina web no segura), vamos primero con el servicio http

![Untitled](Overpass%20f86ac883414643df996ccff335aa6aa0/Untitled%202.png)

![Untitled](Overpass%20f86ac883414643df996ccff335aa6aa0/Untitled%203.png)

Vale, estamos en la pagina web, ahora podemos comprobar si existen directorios ocultos y también podemos ver su código fuente inspeccionando la pagina web

Primero vamos a comprobar los directorios con gobuster:

En efecto, hay directorios ocultos, por tanto, vamos a acceder a ellos en especial a /admin.

En /admin encontramos un login.

Si leemos el código fuente de la pagina web encontramos un script js correspondiente al login

![Untitled](Overpass%20f86ac883414643df996ccff335aa6aa0/Untitled%204.png)

![Untitled](Overpass%20f86ac883414643df996ccff335aa6aa0/Untitled%205.png)

![Untitled](Overpass%20f86ac883414643df996ccff335aa6aa0/Untitled%206.png)

Vamos a login.js

Esta función es la encargada de obtener el user y la password y llevarla al endpoint para la respuesta de confirmación del login.

Si leemos el script, vemos que la función Cookie.set tiene como parámetros la respuesta de cuando se envían las credenciales al endpoint, si mandamos el comando

`Cookies.set("SessionToken", )` iniciaremos sesión sin tener que esperar la respuesta del endpoint.

(*Es la pista que nos da el reto :OWASP Top 10 Vuln! Do NOT bruteforce).*

[https://owasp.org/Top10/A07_2021-Identification_and_Authentication_Failures/](https://owasp.org/Top10/A07_2021-Identification_and_Authentication_Failures/) hace referencia comentado a lo anterior.

Es decir, que mediante la modificación de las Cookies podemos acceder al área de administración.
Para ello vamos:

![Untitled](Overpass%20f86ac883414643df996ccff335aa6aa0/Untitled%207.png)

Donde creamos una Cookie nueva, con el nombre **SessionToken** y Path 

"

![Untitled](Overpass%20f86ac883414643df996ccff335aa6aa0/Untitled%208.png)

![Untitled](Overpass%20f86ac883414643df996ccff335aa6aa0/Untitled%209.png)

Y bingo, estamos dentro, y hemos obtenido el nombre de usuario **James **** y una contraseña la cual está encriptada, para ello vamos a descargarla para que con las herramientas de JohnTheRipper (ssh2john y john) podamos descomprimirla.

Contraseña obtenida!!!!

Por temas de conexión, tuve que reiniciar la maquina 😟

Procedemos a realizar el login shh con el usuario james:

Estamos dentro, ahora vamos a ver los directorios que contiene y a navegar entre ellos.

![Untitled](Overpass%20f86ac883414643df996ccff335aa6aa0/Untitled%2010.png)

Ahí tenemos el user.txt, además tenemos otro archivo de texto

![Untitled](Overpass%20f86ac883414643df996ccff335aa6aa0/Untitled%2011.png)

De este archivo podemos sacar información como: 

- La contraseña no es lo suficientemente fuerte
- La contraseña se encuentra en un password manager
- Hay un script automatizado → cron

Sabiendo estas tres cosas vamos a proceder a convertirnos en root

![Untitled](Overpass%20f86ac883414643df996ccff335aa6aa0/Untitled%2012.png)

Existe un archivo .overpass donde se encuentran unas credenciales.

![Untitled](Overpass%20f86ac883414643df996ccff335aa6aa0/Untitled%2013.png)

estas están encriptadas asi que vamos a desencriptarlas con el uso de Cyberchef

![Untitled](Overpass%20f86ac883414643df996ccff335aa6aa0/Untitled%2014.png)

Ahí tenemos algunas credenciales

Ahora vamos a ver la tarea que está automatizada, para ello vamos hasta /etc y hacemos un cat de crontab

![Untitled](Overpass%20f86ac883414643df996ccff335aa6aa0/Untitled%2015.png)

Donde la tarea automatizada (cada minuto) es `curl overpass.thm/downloads/src/buildscript.sh | bash`.

![Untitled](Overpass%20f86ac883414643df996ccff335aa6aa0/Untitled%2016.png)

Si le echamos un ojo al archivo de los hosts, vemos que tenemos permisos de lectura y escritura, por tanto, podemos modificar alguno( en esencia overpass.thm) y poner la ip de nuestra vpn.

Hacemos un `ip a`para ver la ip de nuestra maquina.

![Untitled](Overpass%20f86ac883414643df996ccff335aa6aa0/Untitled%2017.png)

Creamos un directorio downloads/src/buildscript.sh:

![Untitled](Overpass%20f86ac883414643df996ccff335aa6aa0/Untitled%2018.png)

A continuación creamos un servidor http con el puerto 80.

![Untitled](Overpass%20f86ac883414643df996ccff335aa6aa0/Untitled%2019.png)

Y ahora situamos un puerto de escucha con netcat, donde nos aparecerá nuestra shell con el root

![Untitled](Overpass%20f86ac883414643df996ccff335aa6aa0/Untitled%2020.png)

Hacemos un ls y por ultimo un cat para obtener nuestra flag del root

![Untitled](Overpass%20f86ac883414643df996ccff335aa6aa0/Untitled%2021.png)

---