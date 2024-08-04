# New York Flankees

Created: July 26, 2024 2:06 PM
Etiquetas: Docker, Enumeración, Exploit, Privilege Escalation, Reverse_shell
Dificultad: Medio
Enlace:: https://tryhackme.com/r/room/thenewyorkflankees
Hecho : Jose Luis 
Status: Done

> Can you, the rogue adventurer, break through Stefan's defences to take control of his blog
> 

Primero de todo vamos a realizar un escaneo de la dirección ip de la máquina:

![Untitled](New%20York%20Flankees%2066349876bcb942b98d62217fb7b89181/Untitled.png)

![Untitled](New%20York%20Flankees%2066349876bcb942b98d62217fb7b89181/Untitled%201.png)

Vemos que tenemos abierto los puertos 22 y 8080. Vamos a centrarnos en este último, el cual es una página web de un blog.

![Screenshot 2024-07-26 at 18.16.42 (2).png](New%20York%20Flankees%2066349876bcb942b98d62217fb7b89181/Screenshot_2024-07-26_at_18.16.42_(2).png)

No hay gran cosa en la página principal pero si vamos a la sección que pone *Stefan* vamos a encontrar un par de errores:

![Untitled](New%20York%20Flankees%2066349876bcb942b98d62217fb7b89181/Untitled%202.png)

Estos errores están relacionados con el padding de la web y de autenticación, si miramos el código fuente de la página encontramos un script de autenticación:

![Untitled](New%20York%20Flankees%2066349876bcb942b98d62217fb7b89181/Untitled%203.png)

Vemos que en la línea 69 del script encontramos varios tipos de payloads (AES, CBC, PKCS), por tanto ya sabemos que tenemos que realizar un ataque *AES-CBC padding oracle* 

 En la línea 71 vemos que se realiza una petición GET (url + datos en hexadecimal), si realizamos dicha consulta con la ip de la maquina y los datos hexadecimales, tenemos:

![Untitled](New%20York%20Flankees%2066349876bcb942b98d62217fb7b89181/Untitled%204.png)

<aside>
⚠️ Si modificamos dicha consulta mediante la herramienta BurpSuite, vemos que nos salta un error → *Decryption error*

</aside>

![Untitled](New%20York%20Flankees%2066349876bcb942b98d62217fb7b89181/Untitled%205.png)

![Untitled](New%20York%20Flankees%2066349876bcb942b98d62217fb7b89181/Untitled%206.png)

Vemos que la ruta del script de autenticación es `ip_maquina/api/debug/<codigo_hex>`, por tanto, en dicha ruta se autentica el usuario y si desciframos dicho trozo de dato, podremos saber las credenciales del usuario:

- **Información sobre los *ataques de padding a oracle***
    
    AES (Advanced Encryption Standard) is a symmetric encryption algorithm widely used for securing data.
    
    CBC (Cipher Block Chaining) is a mode of operation for block ciphers. In CBC mode, each block of plaintext is XORed with the previous ciphertext block before being encrypted. This mode ensures that identical plaintext blocks will produce different ciphertext blocks.
    
    PKCS (Public Key Cryptography Standards) #7 padding is a scheme used to ensure that the plaintext's length is a multiple of the block size required by the cipher. If the plaintext is not a multiple of the block size, it is padded with bytes, all of which are the same value as the number of padding bytes added.
    
    A Padding Oracle Attack is an attack that uses information from the padding validation process to decrypt ciphertext. In this context, a Padding Oracle is a system that leaks information about the correctness of the padding of decrypted ciphertexts.
    
    Steps of a Padding Oracle Attack
    
    1. Craft a Ciphertext: The attacker intercepts a ciphertext and crafts a new ciphertext by manipulating it.
    2. Send to Oracle: The manipulated ciphertext is sent to the padding oracle.
    3. Analyze Response: The oracle will respond indicating whether the padding is correct or incorrect.
    4. Iterate: Based on the oracle's response, the attacker iterates over the possible byte values to guess the original plaintext.
    
    Chosen Ciphertext Attack (CCA)
    
    In a CCA, the attacker can choose arbitrary ciphertexts and submit them to the decryption oracle (which in practice might be some server or application) to get the corresponding plaintexts. The attacker's goal is to use this ability to decrypt other ciphertexts or to gain information that would otherwise be unattainable.
    

Yo he hecho uso de la herramienta `padbuster` para poder descifrar el código hexadecimal, pero hay que tener en cuenta que es un proceso lento:

![Untitled](New%20York%20Flankees%2066349876bcb942b98d62217fb7b89181/Untitled%207.png)

Como resultado, obtenemos los datos descifrados:

![Screenshot 2024-07-26 at 19.42.04.png](New%20York%20Flankees%2066349876bcb942b98d62217fb7b89181/Screenshot_2024-07-26_at_19.42.04.png)

Ahora que tenemos las credenciales del admin, iniciamos sesión y obtenemos la *admin_flag*:

![Untitled](New%20York%20Flankees%2066349876bcb942b98d62217fb7b89181/Untitled%208.png)

Debajo de la flag encontramos que podemos ejecutar comandos de forma remota, vamos a probar esto con el comando `whoami` y vemos que nos indica que todo salió bien mediante el mensaje *OK*.

![Untitled](New%20York%20Flankees%2066349876bcb942b98d62217fb7b89181/Untitled%209.png)

Esto es una vulnerabilidad que podemos explotar, una manera sencilla es realizar una reverse_shell mediante un script para poder ganar acceso al servidor:

Creamos un archivo llamado [shell.sh](http://shell.sh) en nuestro directorio `/tmp`, donde incluimos lo siguiente:

![Untitled](New%20York%20Flankees%2066349876bcb942b98d62217fb7b89181/Untitled%2010.png)

Ahora vamos a abrir un servidor para poder subir dicho archivo y recuperarlo mediante la ejecución de comandos de la web

![Untitled](New%20York%20Flankees%2066349876bcb942b98d62217fb7b89181/Untitled%2011.png)

Ahora hacemos uso del comando `curl` para obtener dicho archivo que contiene la reverse_shell:

![Untitled](New%20York%20Flankees%2066349876bcb942b98d62217fb7b89181/Untitled%2012.png)

Y le cambiamos los permisos para poder ejecutarlo:

![Screenshot 2024-07-26 at 20.23.40.png](New%20York%20Flankees%2066349876bcb942b98d62217fb7b89181/Screenshot_2024-07-26_at_20.23.40.png)

y finalmente lo ejecutamos:

![Screenshot 2024-07-26 at 20.24.01.png](New%20York%20Flankees%2066349876bcb942b98d62217fb7b89181/Screenshot_2024-07-26_at_20.24.01.png)

y como vemos, hemos ganado acceso mediante la reverse_shell que hemos creado.

![Screenshot 2024-07-26 at 20.24.16.png](New%20York%20Flankees%2066349876bcb942b98d62217fb7b89181/Screenshot_2024-07-26_at_20.24.16.png)

Ahora vamos  a buscar las flags que nos quedan, para ello siempre es bueno hacer un listado de los archivos ocultos, pero primero vamos a tratar la tty:

![Screenshot 2024-07-26 at 20.27.57.png](New%20York%20Flankees%2066349876bcb942b98d62217fb7b89181/Screenshot_2024-07-26_at_20.27.57.png)

![Screenshot 2024-07-26 at 20.29.36.png](New%20York%20Flankees%2066349876bcb942b98d62217fb7b89181/Screenshot_2024-07-26_at_20.29.36.png)

Vemos que tenemos un archivo *.dockerenv*, esto nos dice que estamos dentro de un contenedor Docker. Si vamos al directorio */app* vamos a encontrar algunos ficheros del Docker, el que nos interesa es *docker-compose.yml* así que le hacemos un `cat` 

![Screenshot 2024-07-26 at 20.29.53.png](New%20York%20Flankees%2066349876bcb942b98d62217fb7b89181/Screenshot_2024-07-26_at_20.29.53.png)

![Screenshot 2024-07-26 at 20.34.12.png](New%20York%20Flankees%2066349876bcb942b98d62217fb7b89181/Screenshot_2024-07-26_at_20.34.12.png)

Como resultado, tenemos la segunda flag, ahora nos queda solamente encontrar la última flag.

Como hemos comentado anteriormente nos encontramos dentro de un contenedor Docker, por tanto, podemos ver los sockets que pueden ser explotados:

![Untitled](New%20York%20Flankees%2066349876bcb942b98d62217fb7b89181/Untitled%2013.png)

Nos dice que sí, entonces vamos a buscarlo y lo haremos mediante el comando `find` y además vamos a ver que imágenes tiene montado el Docker.

Mediante esta web https://book.hacktricks.xyz/linux-hardening/privilege-escalation/docker-security/docker-breakout-privilege-escalation#mounted-docker-socket-escape vamos a encontrar información de como escalar privilegios en un contenedor Docker:

![Screenshot 2024-07-26 at 20.43.40.png](New%20York%20Flankees%2066349876bcb942b98d62217fb7b89181/Screenshot_2024-07-26_at_20.43.40.png)

 Finalmente, hacemos uso de algunos de los comandos encontrados en la web anteriormente mencionada y escalamos privilegios, y si listamos encontramos un fichero llamado *flag.txt*, estamos ante la última flag del ejercicio:

![Untitled](New%20York%20Flankees%2066349876bcb942b98d62217fb7b89181/Untitled%2014.png)

---