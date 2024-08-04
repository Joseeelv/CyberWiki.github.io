# Aspectos Básicos de Windows II

Created: September 18, 2023 9:32 PM
Enlace Lab: https://tryhackme.com/room/windowsfundamentals2x0x

> En esta parte vamos a ver sobre las Configuración del sistema, Configuración de UAC, supervisar recursos, el registro de Windows, etc.
> 

# Configuración del sistema

`MSConfig`se usa para la solución avanzada de problemas y su objetivo principal es ayudar a diagnosticar problemas de inicio.

Para acceder a la configuración del sistema primero pulsamos las teclas `Windows + R` y tecleamos `msconfig`, así accederemos a la pestaña de configuración del sistema.

![image-20230919002044114.png](Aspectos%20Ba%CC%81sicos%20de%20Windows%20II%207ffc15fabb5749ba8260b5cc692b1f6c/image-20230919002044114.png)

Después de realizar esto nos aparecerá una ventana que contiene 5 pestañas: 

- General: Podemos seleccionar el tipo de inicio que tendrá la computadora, seleccionando si queremos que cargar servicios del sistema o elementos de inicio.
    
    ![image-20230919002324995.png](Aspectos%20Ba%CC%81sicos%20de%20Windows%20II%207ffc15fabb5749ba8260b5cc692b1f6c/image-20230919002324995.png)
    
- Arranque: Podemos definir varias opciones de arranque para el propio sistema operativo como por ejemplo, que se inicie sin la interfaz de arranque.
    
    ![image-20230919002621422.png](Aspectos%20Ba%CC%81sicos%20de%20Windows%20II%207ffc15fabb5749ba8260b5cc692b1f6c/image-20230919002621422.png)
    
- Servicios: Encontramos todos los servicios del sistema ya sean de Windows o de programas de terceros.
    
    ![image-20230919002642237.png](Aspectos%20Ba%CC%81sicos%20de%20Windows%20II%207ffc15fabb5749ba8260b5cc692b1f6c/image-20230919002642237.png)
    
- Inicio de Windows: Solo nos muestra una pantalla del administrador de tareas donde se encuentran que procesos se iniciarán cuando se arranque el sistema operativo, pudiendo así seleccionar si queremos que se ejecuten o no.
- Herramientas: Encontramos todas las herramientas que podemos ejecutar para seguir configurando aun más el sistema operativo.

# Cambiar configuración de UAC

Es una de las herramientas que se encuentran en el apartado de 'Herramientas' de la **Configuración del sistema**.

El Control de cuentas de usuario (UAC) se puede cambiar o desactivar por completo (algo no recomendable).
Para acceder a la configuración del control de cuentas solo basta con escribir UAC en la barra de búsqueda.

Encontramos una barra deslizante que nos permite configurar varios grados de notificaciones.

# Administración de equipos

Es otra herramienta pertenecientes a la **Configuración del sistema**.

`Compmgmt` ó Administración de equipos contiene tres secciones principales:

1. Herramientas del sistema.
2. Almacenamiento.
3. Servicios y aplicaciones.

![image-20230919004854284.png](Aspectos%20Ba%CC%81sicos%20de%20Windows%20II%207ffc15fabb5749ba8260b5cc692b1f6c/image-20230919004854284.png)

## **Herramientas del sistema**

Encontramos el **Programador de tareas** con el cual podemos crear y gestionar tareas (ejecutar una aplicación, un script, ..) comunes que nuestro ordenador llevará a cabo automáticamente en los momentos que se especifique (al inicio o fin de sesión, en un horario determinado,..) muy parecido a `cron` de Linux.

Para crear una tarea cualquiera vamos a **Acciones** que se encuentra en el panel derecho y clicamos en 'Crear tarea'.

![image-20230919004623102.png](Aspectos%20Ba%CC%81sicos%20de%20Windows%20II%207ffc15fabb5749ba8260b5cc692b1f6c/image-20230919004623102.png)

Ahora el **Visor de eventos** nos permite visualizar los eventos que se han producido en el equipo, estos registros pueden servir para comprender la actividad del sistema.
El visor contiene tres paneles:

- El de la izquierda muestra un árbol jerárquico de los proveedores de los registros de evento.
- En del centro muestra una descripción general y un resumen de los eventos.
- El de la derecha es el panel de acciones.

En **Carpetas compartidas** encontraremos una lista completa de los recursos y carpetas compartidas donde otros pueden conectarse, en **Sesiones** encontramos una lista de usuarios que están conectados a los recursos compartidos y en **Archivos abiertos** están las carpetas/archivos a los que acceden los usuarios.

En **Usuario y grupos locales** encontramos los usuarios y los grupos del equipo, véase en [Aspectos Básicos de Windows I](Aspectos%20Ba%CC%81sicos%20de%20Windows%20I%20d0f6ee16069c41349091e33f52e2c980.md)

En **Rendimiento** encontramos el Monitor de rendimiento `perfom`, este se utiliza para ver los datos de rendimiento en tiempo real o desde un archivo de registro, es una buena manera de solucionar problemas orientados al rendimiento ya sea en equipos locales o remotos.

El **Administrador de dispositivos** nos permite ver y configurar el hardware del equipo, también podemos deshabilitar, buscar actualizaciones de drivers..

## **Almacenamiento**

Aquí están las **Copias de seguridad de Windows Server** y **Administración de discos**.

En la Administración de discos podemos realizar tareas avanzadas de almacenamiento:

- Configurar una nueva unidad de almacenamiento.
- Extender o reducir una partición.
- Asignar o cambiar un letra de unidad.

![image-20230919010733469.png](Aspectos%20Ba%CC%81sicos%20de%20Windows%20II%207ffc15fabb5749ba8260b5cc692b1f6c/image-20230919010733469.png)

## **Servicio y aplicaciones**

Encontramos todos los **servicios** del sistema (aplicación que se ejecuta en segundo plano).
Podemos ver las propiedades, habilitar o deshabilitar un servicio.

Por otro lado, se encuentra el **Control WMI** (Instrumental de administración de Windows),actualmente en desuso debido a que la **Powershell** reemplaza esta herramienta.

# Información del sistema

`Msinfo32` recopila información sobre la computadora y muestra una vista completa del hardware, software y componentes del sistema de la misma.

Esta información la podemos dividir en varias secciones:

- Recursos de hardware.
- Componentes.
- Entorno de software.

![Untitled](Aspectos%20Ba%CC%81sicos%20de%20Windows%20II%207ffc15fabb5749ba8260b5cc692b1f6c/Untitled.png)

En la pestaña por defecto *Resumen del sistema* 
encontramos información sobre el equipo.

## **Recursos de hardware**

Contiene información sobre el hardware del equipo, esta información no es para un usuario casual. 

![Untitled](Aspectos%20Ba%CC%81sicos%20de%20Windows%20II%207ffc15fabb5749ba8260b5cc692b1f6c/Untitled%201.png)

## **Entorno de software**

En esta sección, podemos ver información relacionada con el sistema operativo, además del software instalado.
También encontramos las *variables de entorno* (situada en la carpeta Windows\System32 vista en **enlace a pagina**) y *conexiones de red*.

![Untitled](Aspectos%20Ba%CC%81sicos%20de%20Windows%20II%207ffc15fabb5749ba8260b5cc692b1f6c/Untitled%202.png)

### **Variables de entorno**

Almacenan datos que utilizan tanto el sistema operativo como las aplicaciones instaladas en el sistema.

Por ejemplo, la variable `PATH` contiene la dirección/ruta del archivo ejecutable.

Otra manera de acceder a las Variables de entorno mediante el panel de control
*Panel de control --> Sistema y seguridad --> Sistema --> Configuración avanzada del sistema --> Variables de entorno.*

## **Componentes**

Aquí podemos ver la información específica de los componentes hardware del sistema.

![Untitled](Aspectos%20Ba%CC%81sicos%20de%20Windows%20II%207ffc15fabb5749ba8260b5cc692b1f6c/Untitled%203.png)

# Monitor de recursos

`Resmon` muestra información sobre la CPU, memoria, discos y red, además proporciona información sobre procesos.

Podemos iniciar, detener, pausar y reanudar servicios y cerrar aplicaciones cuando no respondan en la interfaz de usuario (GUI).
También podemos ver información sobre procesos estancados y conflictos de bloqueos de archivos.

# Símbolo del sistema

El `cmd` es la consola de Windows, **NO** hace uso de los mismos comandos de Linux a diferencia de la *Powershell*, hay algunos comandos que son iguales pero en líneas generales no.

Esta línea de comandos es muy potente a la hora de interactuar con el sistema operativo, ya que podemos obtener información sobre el equipo, de la red y más.

El comando `hostname` nos devuelve el nombre del equipo, `whoami` nos devuelve el nombre del usuario, el comando `ipconfig` muestra la configuración de la dirección de red del equipo.

El manual de ayuda de cualquier comando se realiza: `nombre_comando /?`, esto nos mostrará información sobre el comando `ipconfig`.

Para borrar lo mostrado por pantalla escribimos el comando `cls`.
El comando `netstat` muestra estadísticas del protocolo TCP/IP, `net` se utiliza para administrar los recursos de la red (permite subcomandos).

# Editor de registro

`Regedit`, según Microsoft, es una base de datos jerárquica central que se utiliza para almacenar información para configurar el sistema para uno o varios usuarios, aplicaciones y dispositivos hardware.

Este registro contiene información sobre perfiles de usuario, aplicaciones instaladas en el sistema, hardware del sistema, puertos que se están utilizando. Windows hace referencia de esta información continuamente.

Realizar cambios en el registro puede afectar a las operaciones normales de la computadora, es decir, el registro está orientado a usuarios avanzados del sistema.

![Untitled](Aspectos%20Ba%CC%81sicos%20de%20Windows%20II%207ffc15fabb5749ba8260b5cc692b1f6c/Untitled%204.png)

---