# Startup

Created: December 13, 2023 6:02 PM
Etiquetas: Enumeración, Reverse_shell, Wireshark
Dificultad: Fácil
Enlace:: https://tryhackme.com/room/startup
Hecho : Jose Luis 
Status: Done

En esta room vamos a proceder a obtener las flags *user.txt* y *root.txt* mediante varias técnicas que vamos a ver a continuación.

# User.txt

---

Vamos a realizar un escaneo de puertos con `nmap -p- -v <ip_maquina>`  y vemos que solo tenemos abierto el puerto 21, 22, 80.

![Tenemos una conexión ftp, ssh y una pagina web habilitadas.](Startup%20efcf639a77ec4ddd9752b898b6bbc1bf/Untitled.png)

Tenemos una conexión ftp, ssh y una pagina web habilitadas.

Vamos a realizar una conexión ftp mediante el user Anonymous.

![Untitled](Startup%20efcf639a77ec4ddd9752b898b6bbc1bf/Untitled%201.png)

Estamos dentro y vamos a realizar un listado de archivos.

![Untitled](Startup%20efcf639a77ec4ddd9752b898b6bbc1bf/Untitled%202.png)

Encontramos un directorio y dos archivos (Nada relevante).

Ahora accedemos a la pagina web → `http://<ip_maquina>`

![Resultado al acceder a la pagina web de la maquina (Nada interesante)](Startup%20efcf639a77ec4ddd9752b898b6bbc1bf/Untitled%203.png)

Resultado al acceder a la pagina web de la maquina (Nada interesante)

Si volvemos a la conexión ftp encontramos un directorio ‘/ftp’ donde podemos subir mediante el comando `put` una reverse-shell vía php:

[https://github.com/pentestmonkey/php-reverse-shell](https://github.com/pentestmonkey/php-reverse-shell)

Modificamos la ip (nuestra_ip) y puerto de escucha con netcat:

![Introducimos la ip de nuestra máquina y el puerto de escucha.](Startup%20efcf639a77ec4ddd9752b898b6bbc1bf/a.png)

Introducimos la ip de nuestra máquina y el puerto de escucha.

Accedemos al script desde la url → ip_maquina/files/ftp y tenemos respuesta de netcat.

![Untitled](Startup%20efcf639a77ec4ddd9752b898b6bbc1bf/Untitled%204.png)

Hacemos un ls -la  para ver los archivos y directorios y a quien pertenecen.

Como queremos encontrar el *user.txt* vamos a tirar un `find / -type f -name 'user.txt'` . Como resultado → Nada. Vamos a buscar otra manera de encontrar la flag.

Investigando un poco en el servidor, he encontrado dos archivo llamado ‘incidents’ y ‘recipe.txt’ los cuales pertenecen al servidor web.

Nos vamos a centrar en el archivo ‘incidents’ el cual contiene un archivo con extensión ‘.pcap’ (una captura de tráfico de red).

![Untitled](Startup%20efcf639a77ec4ddd9752b898b6bbc1bf/Untitled%205.png)

![‘.’ indica el directorio actual → /var/www/html/files/ftp](Startup%20efcf639a77ec4ddd9752b898b6bbc1bf/Untitled%206.png)

‘.’ indica el directorio actual → /var/www/html/files/ftp

Para poder descargarlo, vamos a copiar el archivo ‘suspicuous.pcapng’  en la pagina web (/var/www/html) desde la reverse-shell

![Aquí podemos comprobar que hemos copiado el archivo en dicha ruta y pinchando en él podemos descargarlo.](Startup%20efcf639a77ec4ddd9752b898b6bbc1bf/Untitled%207.png)

Aquí podemos comprobar que hemos copiado el archivo en dicha ruta y pinchando en él podemos descargarlo.

Abrimos Wireshark (una herramienta que nos permite ver las capturas de tráfico de red) para poder analizar los paquetes.

![Hemos accedido a la captura del tráfico de red](Startup%20efcf639a77ec4ddd9752b898b6bbc1bf/Untitled%208.png)

Hemos accedido a la captura del tráfico de red

![Seguimos el flujo de tráfico](Startup%20efcf639a77ec4ddd9752b898b6bbc1bf/Untitled%209.png)

Seguimos el flujo de tráfico

Vamos a seguir el flujo de tráfico TCP para poder encontrar información.

![a1.png](Startup%20efcf639a77ec4ddd9752b898b6bbc1bf/a1.png)

![c4ntg](../../../Startup%20b82f8a7be3d340a58e482c82c4e65441/Untitled.png)

c4ntg

En el reconocimiento de puertos (NMAP) encontramos que permitía una conexión ssh, por tanto, vamos a proceder a realizarla mediante estas credenciales:

![Untitled](../../../Startup%20b82f8a7be3d340a58e482c82c4e65441/Untitled%201.png)

Estamos dentro, vamos a tirar un ‘ls’ para poder ver los directorios de la ruta en la que nos encontramos.

En el reconocimiento de puertos (NMAP) encontramos que permitía una conexión ssh, por tanto, vamos a proceder a realizarla mediante estas credenciales:

![Untitled](../../../Startup%20b82f8a7be3d340a58e482c82c4e65441/Untitled%201.png)

Estamos dentro, vamos a tirar un ‘ls’ para poder ver los directorios de la ruta en la que nos encontramos.

Si tiramos un bash tendremos una consola (mejor que por defecto).

![a3.png](Startup%20efcf639a77ec4ddd9752b898b6bbc1bf/a3.png)

Tenemos la flag (user.txt).

![c4ntg](../../../Startup%20b82f8a7be3d340a58e482c82c4e65441/Untitled.png)

c4ntg

En el reconocimiento de puertos (NMAP) encontramos que permitía una conexión ssh, por tanto, vamos a proceder a realizarla mediante estas credenciales:

![Untitled](../../../Startup%20b82f8a7be3d340a58e482c82c4e65441/Untitled%201.png)

Estamos dentro, vamos a tirar un ‘ls’ para poder ver los directorios de la ruta en la que nos encontramos.

# Root.txt

---

Para poder obtener la flag ‘Root.txt’ tenemos que buscar una manera de poder escalar privilegios ya que solo la podemos abrir con permisos sudo.

![Comprobamos si puede ejecutar comandos sudo.](Startup%20efcf639a77ec4ddd9752b898b6bbc1bf/Untitled%2010.png)

Comprobamos si puede ejecutar comandos sudo.

![En el directorio hemos encontrado un archivo ‘planner.sh’](Startup%20efcf639a77ec4ddd9752b898b6bbc1bf/Untitled%2011.png)

En el directorio hemos encontrado un archivo ‘planner.sh’

Vamos a ver que contiene mediante el comando `cat nombre_archivo`

![Untitled](Startup%20efcf639a77ec4ddd9752b898b6bbc1bf/Untitled%2012.png)

Vemos que llama a un archivo ‘print.sh’ el cual si puede ejecutarlo por tanto, una de las maneras de poder entrar es realizando una reverse_shell para tener acceso a la maquina.

Si accedemos a la web [https://www.revshells.com/](https://www.revshells.com/) podemos crear reverse-shells.

![Paso 1 (modificamos archivo con la reverse_shell).](Startup%20efcf639a77ec4ddd9752b898b6bbc1bf/Untitled%2013.png)

Paso 1 (modificamos archivo con la reverse_shell).

Lo guardamos en el archivo ‘/etc/print.sh’

![Paso 3 (ejecutamos la reverse_shell).](Startup%20efcf639a77ec4ddd9752b898b6bbc1bf/Untitled%2014.png)

Paso 3 (ejecutamos la reverse_shell).

![Paso 2 (creamos con netcat la escucha)
Paso 4.(obtenemos la flag).](Startup%20efcf639a77ec4ddd9752b898b6bbc1bf/b.png)

Paso 2 (creamos con netcat la escucha)
Paso 4.(obtenemos la flag).

Reverse_shell realizada y hemos obtenido la flag.

---