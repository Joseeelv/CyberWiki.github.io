# Servicios de la red II

Etiquetas: Apuntes
Enlace Lab: https://tryhackme.com/r/room/networkservices2
Estado: Done

# Protocolo NFS

*Network File System* o *NFS* es un protocolo de red que permite a los sistemas acceder a los archivos de una red, de una manera similar a como acceden a los archivos que tienen en su propio sistema de archivo.

Mediante NFS, tanto los usuarios como los programas pueden acceder a los archivos remotos como si estos fueran locales. Esto se hace montando todo, o una parte de un sistema de archivos en un servidor.

Hace uso del protocolo **RPC** (Remote Procedural Call) para realizar la comunicación cliente-servidor. 

## Como funciona NFS

El servidor NFS configura qué directorios se van a compartir con los clientes en el archivo de configuración `/etc/exports`.

Luego estos directorios compartidos se montan en los clientes del servidor NFS mediante el comando `mount <ip_servidor>:/<directorio_compartido> /mnt/<montura_local>`.

Una vez montado los directorios compartidos que queremos en nuestro propio equipo podemos ejecutar comandos como → `ls`, `cp`, `mv`, etc.

## Como enumerar el protocolo NFS

1. **Uso del comando showmount:**
Podemos hacer uso del comando `showmount -e <ip_servidor>` para ver los directorios compartidos del servidor.
2. **Uso de la herramienta Nmap:**
Podemos realizar un escaneo de puertos para ver si está abierto un puerto que haga uso de un servicio NFS.
3. **Uso de rcpinfo**
Mediante la herramienta **rcpinfo** podemos obtener información sobre los servicios RPC con el comando `rcpinfo -p <ip-servidor>`.
4. **Escaneo manual de Directorios:**
Como hemos comentado antes, los directorios que un servidor va a compartir se configuran en el fichero `/etc/exports`, por tanto, si realizamos una lectura del mismo encontraremos que recursos comparten y más información.
5. **Uso del comando nfsstat:**
Este comando proporciona estadísticas y detalles sobre el servicio NFS.

## Como explotar el protocolo NFS

1. **Comprobar fichero de configuración /etc/exports:**
    
    Como hemos comentado antes, el fichero de configuración `/etc/exports` puede contener información valiosa a la hora de explotar NFS. Aquí vamos a encontrar si el recurso que se comparte tiene la opción de configuración **root_squash** activada o no.
    
    Esta opción hace que cualquier usuario que tenga privilegios root en el sistema local, sea un usuario sin privilegios en el servidor.
    
    Si no está configurado, es decir, tenemos **no_root_squash** el cliente con privilegios root, tendrá esos permisos en el servidor NFS.
    
    Aquí podemos encontrar información de como escalar privilegios en NFS → [Escalar Privilegios: NFS](Escalar%20Privilegios%20en%20Linux%20a21e20b2d3754f1682ebd291df65bb87.md) 
    

### Ejemplo práctico:

Realizamos un escaneo de puertos de la ip de la máquina víctima:

![Untitled](Servicios%20de%20la%20red%20II%20b86e91a40461446b8bcb501d1e2ee4ac/Untitled.png)

![Untitled](Servicios%20de%20la%20red%20II%20b86e91a40461446b8bcb501d1e2ee4ac/Untitled%201.png)

![Untitled](Servicios%20de%20la%20red%20II%20b86e91a40461446b8bcb501d1e2ee4ac/Untitled%202.png)

![Untitled](Servicios%20de%20la%20red%20II%20b86e91a40461446b8bcb501d1e2ee4ac/Untitled%203.png)

![Untitled](Servicios%20de%20la%20red%20II%20b86e91a40461446b8bcb501d1e2ee4ac/Untitled%204.png)

![Untitled](Servicios%20de%20la%20red%20II%20b86e91a40461446b8bcb501d1e2ee4ac/Untitled%205.png)

Tenemos el usuario *cappucino* y su id_rsa, por tanto, podemos realizar la conexión ssh:

![Untitled](Servicios%20de%20la%20red%20II%20b86e91a40461446b8bcb501d1e2ee4ac/Untitled%206.png)

Buscamos los recursos que se comparten:

![Untitled](Servicios%20de%20la%20red%20II%20b86e91a40461446b8bcb501d1e2ee4ac/Untitled%207.png)

![Untitled](Servicios%20de%20la%20red%20II%20b86e91a40461446b8bcb501d1e2ee4ac/Untitled%208.png)

```c
int main(){
	setgid(0);
	setuid(0);
	system("/bin/bash -");
retunr 0;
}
```

![Untitled](Servicios%20de%20la%20red%20II%20b86e91a40461446b8bcb501d1e2ee4ac/Untitled%209.png)

![Untitled](Servicios%20de%20la%20red%20II%20b86e91a40461446b8bcb501d1e2ee4ac/Untitled%2010.png)

Finalmente, si hacemos `./exploitNFS` escalaremos privilegios y tendremos acceso a la flag.

# Protocolo SMTP

El protocolo *SMTP* (*Simple Mail Transfer Protocol*) **es el estándar utilizado para el envío de correos electrónicos a través de redes IP.

SMTP no maneja ni la recepción ni el almacenamiento de correos, para ello se utilizan otros protocolos como *POP3* (Post Office Protocol) o *IMAP* (Internet Message Access Protocol).  

Hace uso de un modelo cliente-servidor, donde el cliente envía los correos electrónicos a un servidor SMTP y estos los envía a otros servidores SMTP de destino.

SMTP hace uso del puerto `TCP 25` para la conexión entre servidores, pero también usa los puertos `TCP 587` (correos con autenticación) y `TCP 465` (correo cifrado “smtps”).

Los mensajes en SMTP se envían en texto plano, pero la conexión puede estar cifrada mediante *TLS/SSL*.

## Como funciona el protocolo SMTP

![Untitled](Servicios%20de%20la%20red%20II%20b86e91a40461446b8bcb501d1e2ee4ac/Untitled%2011.png)

1. El cliente establece conexión con el servidor cuando manda un correo electrónico a través del puerto 25 (smtp handshake).
2. Luego SMTP usa un conjunto de comandos (en texto plano) para la comunicación entre el cliente y servidor, donde el servidor responde con códigos de estado que indica el resultado de la solicitud.
3. La transferencia de mensajes se realiza después de enviar el comando `DATA`, si el servidor no puede acceder al cliente destinatario, pone el correo electrónico en **SMTP queue**.
4. La conexión se cierra cuando el cliente hace uso del comando `QUIT`.

## Como enumerar el protocolo SMTP

1. **Conexión Telnet manual:**
    
    Primero realizamos una conexión mediante Telnet:
    
    ```bash
    telnet <ip-servidor> 25
    telnet <ip-servidor> 587 //si es con autenticación
    ```
    
    Luego, podemos enviar comandos SMTP:
    
    ```bash
    EHLO ejemplo.com
    VRFY user@example.com
    EXPN list@example.com
    QUIT
    ```
    
2. **Uso de la herramienta Nmap con scripts SMTP:**
    
    Como hemos hecho en otros protocolos, podemos hacer uso de:
    
    ```bash
    nmap -p 25 --script smtp-enum <ip-servidor>
    ```
    
    **Scripts Útiles de Nmap para SMTP:**
    
    - **smtp-enum**: Enumera los usuarios y dominios disponibles.
    - **smtp-commands**: Enumera los comandos soportados por el servidor SMTP.
    - **smtp-vrfy**: Verifica si el servidor acepta la verificación de usuarios.
    - **smtp-open-relay**: Comprueba si el servidor es un relay abierto.
3. **Uso del comando smtp-user-enum:**
    
    `smtp-user-enum` es una herramienta diseñada para enumerar usuarios en servidores SMTP, para ello podemos hacer uso de:
    
    ```bash
    smtp-user-enum -M VRFY -U listausuario.txt -t <ip-servidor>
    ```
    
    - `-M VRFT`: Usamos el comando `VRFY` para enumerar servicios.
    - `-U listausuario.txt`: Especifica el archivo de texto que contiene la lista de usuarios a probar.
    - `-t <ip-servidor>`: Especifica la ip del servidor SMTP.
4. **Uso de Metasploit framework:**
    
    Metasploit Framework incluye módulos para enumerar y explotar servicios SMTP.
    
5. **Uso de smtp-cli:**
    
    `smtp-cli`: es una herramienta de línea de comandos para probar servidores SMTP y enviar correos electrónicos desde una línea de comando.
    

## Como explotar el protocolo SMTP

1. **Ataque de fuerza bruta:**
    
    Mediante `hydra` podemos realizar una ataque de fuerza bruta si contamos con el *username* de un usuario y un diccionario; por ejemplo *rockyou.txt*.
    
    ```bash
    hydra -t 16 -l <username> -P <ruta_diccionario> -vV <ip-servidor> [protocolo]
    ```
    
    - `-t 16`: número de conexiones paralelas por objetivo, en este caso 16.
    - `-l <username>`: Nombre de usuario a atacar.
    - `-P <ruta_diccionario>`: Ruta del diccionario, por ejemplo /usr/share/wordlists/rockyou.txt.
    - `-vV`: Pone el verbose a *very verbose* mostrando login+pass cada vez que realiza un intento.
    - `<ip-servidor>`: Indica la dirección IP del servidor.
    - `[protocolo]`: Añade el protocolo, por ejemplo ssh.

### Ejemplo práctico:

Realizamos un escaneo de los puertos de la red para ver cuales están abiertos y que servicios están corriendo:

![Untitled](Servicios%20de%20la%20red%20II%20b86e91a40461446b8bcb501d1e2ee4ac/Untitled%2012.png)

![Untitled](Servicios%20de%20la%20red%20II%20b86e91a40461446b8bcb501d1e2ee4ac/Untitled%2013.png)

No encontramos nada, pero sabemos que podemos hacer uso de metasploit, con `msfconsole` activamos la herramienta y vamos a buscar exploits sobre “mstp_version”

![Untitled](Servicios%20de%20la%20red%20II%20b86e91a40461446b8bcb501d1e2ee4ac/Untitled%2014.png)

Mediante `options <modulo>` podemos listar las opciones que tiene el exploit.

![Untitled](Servicios%20de%20la%20red%20II%20b86e91a40461446b8bcb501d1e2ee4ac/Untitled%2015.png)

Vamos a especificar el host, en este caso será la ip de la maquina victima, lo hacemos mediante el comando `set [opcion] <valor>`, en nuestro caso → `set RHOSTS <ip-maquina>` 

Ahora, lo ejecutamos con `run`

![Untitled](Servicios%20de%20la%20red%20II%20b86e91a40461446b8bcb501d1e2ee4ac/Untitled%2016.png)

Vemos que el MTA de *polosmtp.home* es Postfix.

Ahora, con metasploit podemos enumerar los usuarios del servicio smtp

![Untitled](Servicios%20de%20la%20red%20II%20b86e91a40461446b8bcb501d1e2ee4ac/Untitled%2017.png)

Ahora tenemos que especificar tanto el RHOST (igual que antes) como USER_FILE (diccionario con usernames).

Si no tienes el diccionario instalado, haz → `sudo apt install seclists -y` 

Añadimos el diccionario y ejecutamos.

![Untitled](Servicios%20de%20la%20red%20II%20b86e91a40461446b8bcb501d1e2ee4ac/Untitled%2018.png)

Hemos encontrado a los usuarios, en este caso solamente existe el administrador.

Ahora, si vemos el escaneo de puertos, vemos que hay un servicio ssh corriendo, por tanto, vamos a realizar una ataque de fuerza bruta para conseguir la contraseña del usuario *administrator*:

![Untitled](Servicios%20de%20la%20red%20II%20b86e91a40461446b8bcb501d1e2ee4ac/Untitled%2019.png)

Conseguimos la contraseña y realizamos la conexión ssh con las credenciales:

![Untitled](Servicios%20de%20la%20red%20II%20b86e91a40461446b8bcb501d1e2ee4ac/Untitled%2020.png)

Tenemos la flag:

![Untitled](Servicios%20de%20la%20red%20II%20b86e91a40461446b8bcb501d1e2ee4ac/Untitled%2021.png)

# Gestión de bases de datos relacionales MySQL

*MySQL* es un gestor de bases de datos relacionales (RDBMS), basado en un Lenguaje Estructurado mediante Consultas (Structured Query Language) ampliamente utilizado para almacenar, gestionar y recuperar datos en aplicaciones web y sistemas empresariales. 

Un uso muy común de MySQL sería la de una base de datos para back end.

Hace uso del puerto `TCP 3306`.

## Como funciona MySQL

El servidor SQL puede realizar consultas a la base de datos, modificarla, crear nuevas o eliminar bases de datos ya existente.

Aquí podemos encontrar más información sobre SQL → https://dev.mysql.com/doc/dev/mysql-server/latest/PAGE_SQL_EXECUTION.html

## Como enumerar MySQL

1. **Uso de la herramienta Nmap:**
    
    ```bash
    nmap -p 3306 --script=mysql-info <target>
    ```
    
    Este comando escanea el puerto 3306 (puerto predeterminado para MySQL) e intenta identificar información sobre el servicio MySQL.
    

## Como explotar MySQL

1. **Realizar una inyección SQL (SQLi):**
    
    Podemos buscar puntos de entrada donde se ingresan datos que se utilizan directamente en consultas SQL. Por ejemplo, formularios web, parámetros de URL, etc.
    
    Podemos ver más información sobre este tipo de ataque en → [**Introducción a las SQL injection**](Introduccio%CC%81n%20a%20las%20SQL%20injection%20508e8e21deab4505b36c926f0c1b8447.md).
    
2. **Explotación de Configuración Incorrecta:**
    
    Podemos comprobar si el servidor MySQL está configurado sin una contraseña para el usuario root:
    
    ```bash
    mysql -u root
    ```
    
    También podemos comprobar si un usuario tiene privilegios elevados sin necesidad, si este puede realizar consultas privilegiadas:
    
    ```sql
    GRANT ALL PRIVILEGES ON *.* TO 'usuario'@'localhost' WITH GRANT OPTION;
    ```
    
3. **Explotación de Vulnerabilidades Conocidas**
    
    Podemos hacer uso de vulnerabilidades conocidas **CVEs** si el servidor no ha sido actualizado.
    
    También algunos plugins de MySQL pueden contener vulnerabilidades que pueden ser explotadas si el servidor MySQL está mal configurado.
    

### Ejemplo práctico:

Realizamos un escaneo de la red: 

![Untitled](Servicios%20de%20la%20red%20II%20b86e91a40461446b8bcb501d1e2ee4ac/Untitled%2022.png)

![Untitled](Servicios%20de%20la%20red%20II%20b86e91a40461446b8bcb501d1e2ee4ac/Untitled%2023.png)

vemos que en el puerto 3306 tenemos un servicio corriendo, para poder explotarlo podemos hacer uso de metasploit.

![Untitled](Servicios%20de%20la%20red%20II%20b86e91a40461446b8bcb501d1e2ee4ac/Untitled%2024.png)

![Untitled](Servicios%20de%20la%20red%20II%20b86e91a40461446b8bcb501d1e2ee4ac/Untitled%2025.png)

Ponemos:

- `set userane root`
- `set password password`
- `set rhosts <ip-victima>`

Ejecutamos con `run` y obtenemos 

![Untitled](Servicios%20de%20la%20red%20II%20b86e91a40461446b8bcb501d1e2ee4ac/Untitled%2026.png)

Ahora, vamos a mostrar las bases de datos → `set sql "show databases"` 

![Untitled](Servicios%20de%20la%20red%20II%20b86e91a40461446b8bcb501d1e2ee4ac/Untitled%2027.png)

Encontramos 4 bases de datos.

Ahora que tenemos enumerado el servicio SQL, vamos a explotarlo:

Para ello, vamos a dumpear las bases de datos con el módulo → /mysql/msql_schemadump

![Untitled](Servicios%20de%20la%20red%20II%20b86e91a40461446b8bcb501d1e2ee4ac/Untitled%2028.png)

Especificamos las opciones para poder correr el exploit (como arriba) y lo ejecutamos y nos muestra todas las tablas que hay en la base de datos.

Ahora vamos a obtener los usuarios de la base de datos con su password hasheadas:

![Untitled](Servicios%20de%20la%20red%20II%20b86e91a40461446b8bcb501d1e2ee4ac/Untitled%2029.png)

![Untitled](Servicios%20de%20la%20red%20II%20b86e91a40461446b8bcb501d1e2ee4ac/Untitled%2030.png)

Vemos que hay un usuario ‘*carl*’ que no es un usuario por defecto y tenemos su password hasheada, por tanto la vamos a guardar en un fichero para descifrarla:

![Untitled](Servicios%20de%20la%20red%20II%20b86e91a40461446b8bcb501d1e2ee4ac/Untitled%2031.png)

- **Password descifrada con JohnTheRipper**
    
    doggie
    

Ahora vamos a acceder a la base de datos:

![Untitled](Servicios%20de%20la%20red%20II%20b86e91a40461446b8bcb501d1e2ee4ac/Untitled%2032.png)

Tenemos la flag.

---