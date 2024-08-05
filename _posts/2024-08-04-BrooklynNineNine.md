---
title: Brooklyn Nine Nine
layout: post
post-image: "../assets/images/Rooms/BNN/bnn.png"
description: En esta room se realiza una enumeración de puertos, se realiza un ataque de fuerza bruta para obtener la contraseña de la conexión SSH y se inicia sesión. Luego, se busca y se encuentra el archivo "user.txt". También se muestra cómo obtener acceso de root utilizando una vulnerabilidad en el comando "less".
difficulty: Fácil
enlace: https://tryhackme.com/r/room/brooklynninenine
tags:
- Enumeración
- FTP
- Privilege Escalation
- Fuerza-Bruta
- Exploit
---

# User.txt

Vamosa proceder a escanear los primeros 1024 puertos para enumerarlos:

<div style="text-align: center; ">
    <img src="../assets/images/Rooms/BNN/Untitled.png" alt="Untitled" />
</div>

Escaneamos la pagina web → no hay nada

<div style="text-align: center; ">
    <img src="../assets/images/Rooms/BNN/Untitled 1.png" alt="Untitled" />
</div>

Descargamos el archivo y lo abrimos

<div style="text-align: center; ">
    <img src="../assets/images/Rooms/BNN/Untitled 2.png" alt="Untitled" />
</div>

<div style="text-align: center; ">
    <img src="../assets/images/Rooms/BNN/Untitled 3.png" alt="Untitled" />
</div>
Hacemos un ataque de fuerza bruta con el user jake a la conexion shh y sacamos la contraseña:

<div style="text-align: center; ">
    <img src="../assets/images/Rooms/BNN/Untitled 4.png" alt="Untitled" />
</div>

Iniciamos sesión en ssh

<div style="text-align: center; ">
    <img src="../assets/images/Rooms/BNN/Untitled 5.png" alt="Untitled" />
</div>

Estamos dentro y buscamos la user.txt

<div style="text-align: center; ">
    <img src="../assets/images/Rooms/BNN/Untitled 6.png" alt="Untitled" />
</div>

# Root.txt

Vamos a sacar vulnerabilidades de root

<div style="text-align: center; ">
    <img src="../assets/images/Rooms/BNN/Untitled 7.png" alt="Untitled" />
</div>

Vemos que tiene permiso para ejecutar comando con less, buscamos un exploit

<div style="text-align: center; ">
    <img src="../assets/images/Rooms/BNN/Untitled 8.png" alt="Untitled" />
</div>

y escribimos `!/bin/sh` y somos root

<div style="text-align: center; ">
    <img src="../assets/images/Rooms/BNN/Untitled 9.png" alt="Untitled" />
</div>

Listo:

<div style="text-align: center; ">
    <img src="../assets/images/Rooms/BNN/Untitled 10.png" alt="Untitled" />
</div>

---
