# Brooklyn Nine Nine

Created: March 6, 2024 6:48 PM
Etiquetas: Enumeración, Fuerza-bruta, Privilege Escalation
Dificultad: Fácil
Enlace:: https://tryhackme.com/r/room/brooklynninenine
Hecho : Jose Luis 
Status: Done

# User.txt

---

Escaneamos los 1024 primeros puertos

![Untitled](Brooklyn%20Nine%20Nine%207a25ffb7556f4a7fbd9206d0f6769075/Untitled.png)

Escaneamos la pagina web → no hay nada

![Untitled](Brooklyn%20Nine%20Nine%207a25ffb7556f4a7fbd9206d0f6769075/Untitled%201.png)

Descargamos el archivo y lo abrimos

![Untitled](Brooklyn%20Nine%20Nine%207a25ffb7556f4a7fbd9206d0f6769075/Untitled%202.png)

![Untitled](Brooklyn%20Nine%20Nine%207a25ffb7556f4a7fbd9206d0f6769075/Untitled%203.png)

Hacemos un ataque de fuerza bruta con el user jake a la conexion shh y sacamos la contraseña:

![Untitled](Brooklyn%20Nine%20Nine%207a25ffb7556f4a7fbd9206d0f6769075/Untitled%204.png)

Iniciamos sesión en ssh

![Untitled](Brooklyn%20Nine%20Nine%207a25ffb7556f4a7fbd9206d0f6769075/Untitled%205.png)

Estamos dentro y buscamos la user.txt

![Untitled](Brooklyn%20Nine%20Nine%207a25ffb7556f4a7fbd9206d0f6769075/Untitled%206.png)

# Root.txt

---

Vamos a sacar vulnerabilidades de root

![Untitled](Brooklyn%20Nine%20Nine%207a25ffb7556f4a7fbd9206d0f6769075/Untitled%207.png)

Vemos que tiene permiso para ejecutar comando con less, buscamos un exploit

![Untitled](Brooklyn%20Nine%20Nine%207a25ffb7556f4a7fbd9206d0f6769075/Untitled%208.png)

y escribimos `!/bin/sh` y somos root

![Untitled](Brooklyn%20Nine%20Nine%207a25ffb7556f4a7fbd9206d0f6769075/Untitled%209.png)

Listo:

![Untitled](Brooklyn%20Nine%20Nine%207a25ffb7556f4a7fbd9206d0f6769075/Untitled%2010.png)