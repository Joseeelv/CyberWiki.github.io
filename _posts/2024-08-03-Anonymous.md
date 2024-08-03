# Anonymous

Created: July 31, 2024 3:40 PM
Etiquetas: Enumeración, Exploit, FTP, Reverse_shell
Dificultad: Medio
Enlace:: https://tryhackme.com/r/room/anonymous
Hecho : Jose Luis 
Status: Done

![Anonymous_emblem.svg.png](Anonymous%204ba02ce5bad9467e9802dfb18c933b94/Anonymous_emblem.svg.png)

> Try to get the two flags! Root the machine and prove your understanding of the fundamentals! This is a virtual machine meant for beginners. Acquiring both flags will require some basic knowledge of Linux and privilege escalation methods.
> 

---

```bash
sudo nmap -p- -open -sS -sV -sC -n -Pn -vvv --min-rate 5000 10.10.188.84 -oN escaneo
```

![1.png](Anonymous%204ba02ce5bad9467e9802dfb18c933b94/1.png)

![Untitled](Anonymous%204ba02ce5bad9467e9802dfb18c933b94/Untitled.png)

Encontramos que tenemos los puertos **21** (ftp), **22** (ssh), **139** y **445** (smb) ambos.

Primero, vamos a ver que comparte ese protocolo smb, para ello, mediante el comando `smbclient` 

podemos ver que recursos comparte:

Primero vamos a incluir la ip en el directorio **/etc/hosts** → `sudo echo '<ip-objetivo anonymous.thm>' >> /etc/hosts` y luego hacemos:

![Untitled](Anonymous%204ba02ce5bad9467e9802dfb18c933b94/Untitled%201.png)

Hemos realizado una consulta de los recursos que comparte el servidor (” necesario para responder algunas preguntas de la room“).

![Untitled](Anonymous%204ba02ce5bad9467e9802dfb18c933b94/Untitled%202.png)

También podemos realizar una conexión smb a los directorios que hemos encontrado anteriormente, pero no servirá de nada, ya que por aquí no van los tiros.

A continuación vamos a iniciar la búsqueda de información del servidor ftp, mediante una conexión anónima:

![2.png](Anonymous%204ba02ce5bad9467e9802dfb18c933b94/2.png)

Encontramos un directorio llamado `/scripts` el cual contiene un binario llamado `clean.sh`.

Por eso, descargamos los ficheros y en el anteriormente comentado vamos a realizar una modificación del mismo.

Vemos que podemos descargar los ficheros que se encuentran en el servidor y como sabemos que es FTP pues podemos tanto descargar como cargar archivos.

Por tanto, le podemos meter una reverse shell al servidor mediante la ejecución de uno de los scripts anteriormente descargados, y el elegido será `clean.sh`.   

![3.png](Anonymous%204ba02ce5bad9467e9802dfb18c933b94/3.png)

Vemos que mediante el comando `echo` estamos incluyendo en el fichero `clean.sh` una reverse shell para poder acceder al servidor y buscar información.

Con **netcat** vamos a poner nuestra máquina en escucha para acceder al servidor cuando se active la reverse shell:

![4.1.png](Anonymous%204ba02ce5bad9467e9802dfb18c933b94/4.1.png)

Subimos el fichero modificado mediante el comando `put` en el servidor FTP:

![Untitled](Anonymous%204ba02ce5bad9467e9802dfb18c933b94/Untitled%203.png)

Y si esperamos un poco se habrá ejecutado la reverse shell y podemos obtener la ***user_flag***.

![4.2.png](Anonymous%204ba02ce5bad9467e9802dfb18c933b94/4.2.png)

Ahora, tenemos que buscar la otra flag, por tanto, vamos a buscar una manera de escalar privilegios en el servidor para poder hacer lo que queramos en el mismo:

Primero, vamos a intentar saber si el usuario puede ejecutar algún comando como root → `sudo -l` pero no hay suerte, así que vamos a buscar si hay algún binario extraño que tiene el bit SUID activad

```bash
find / -perm -4000 -type f -ls 2>/dev/null
```

Vamos a obtener una lista enorme de binarios, pero el que destaca por su extraña aparición es:

![5.png](Anonymous%204ba02ce5bad9467e9802dfb18c933b94/5.png)

Hemos encontrado que el binario `/usr/bin/env` tiene el bit SUID activado, por ello, vamos a buscar como ejecutar el exploit ⤵️:

[env
            
            |
            
            GTFOBins](https://gtfobins.github.io/gtfobins/env/#suid)

Ahora lo ejecutamos y, voila! tenemos privilegios root y buscamos la ***root_flag***.

![6.png](Anonymous%204ba02ce5bad9467e9802dfb18c933b94/6.png)

---