# Aspectos Básicos de Windows III

Created: September 18, 2023 9:33 PM
Enlace Lab: https://tryhackme.com/room/windowsfundamentals3xzx

> En la última parte veremos herramientas integradas en Windows para mantener los equipos seguros como Windows Update, Seguridad de Windows, BitLocker y más.
> 

# Windows Update

Windows Update es un servicio proporcionado por Microsoft que nos permite instalar actualizaciones de seguridad, nuevas características en los equipos con Windows instalado.

Podemos acceder a Windows Update de dos formas:

1. En Configuración en la sección *Actualización y seguridad*.
2. Haciendo uso del uso del comando: `control /name Microsoft.WindowsUpdate` ya sea en el 'cmd' ([Símbolo del sistema](Aspectos%20Ba%CC%81sicos%20de%20Windows%20II%207ffc15fabb5749ba8260b5cc692b1f6c.md)) o haciendo uso de la combinación de teclas de Ejecutar `Windows + R` que nos llevará a la Configuración de Windows (arriba).
    
    ![Untitled](Aspectos%20Ba%CC%81sicos%20de%20Windows%20III%2069f5cf48be454594ac69f68c4417b020/Untitled.png)
    

![image-20230922102018818.png](Aspectos%20Ba%CC%81sicos%20de%20Windows%20III%2069f5cf48be454594ac69f68c4417b020/image-20230922102018818.png)

# Seguridad de Windows

La Seguridad de Windows nos ayuda a administrar las herramientas que protegen el equipo y sus datos.
También está disponible en *Configuración > Actualización y seguridad*.

![image-20230922102616439.png](Aspectos%20Ba%CC%81sicos%20de%20Windows%20III%2069f5cf48be454594ac69f68c4417b020/image-20230922102616439.png)

Se usa para realizar escaneos de archivos en la computadora a la hora de comprobar si nuestro equipo contiene malware y más.

Encontramos varias áreas de protección:

- Protección contra virus y amenazas.
- Firewall y protección de red.
- Control de aplicaciones y navegadores.
- Seguridad del dispositivo.

Además encontraremos varios colores indicadores dependiendo del estado en que se encuentre el equipo, ***verde*** (equipo protegido), **amarillo** *(*se sugiere revisar la seguridad del equipo*)* y ***rojo*** (equipo necesita atención inmediata).

En esta sección de *Seguridad de Windows* podemos realizar escaneos/análisis de los archivos que contiene el sistema para comprobar que el equipo está seguro y ningún archivo es malicioso.

## **Tipos de análisis**

- **Análisis / escaneo rápido**: comprueba las carpetas donde se pueden encontrar comúnmente las amenazas.
- **Análisis / escaneo completo**: se comprueba todas las carpetas, archivos y programas en ejecución que se encuentran en el equipo, este es un análisis mucho más lento pero más seguro.
- **Análisis / escaneo personalizado**: el usuario es libre de personalizar el análisis (los archivos o carpetas que se desean verificar).

## **Historial de protección**

Contiene todas las acciones que *Windows Defender* ha tomado a la hora de haberse realizado un análisis.

Si el antivirus encuentra / detecta un fragmento de malware, este los registrará en el historial de protección.

**Amenazas en cuarentena**: estas amenazas se han aislado del sistema y se ha impedido la ejecución en el equipo. Serán eliminadas periódicamente.
También podemos realizar las acciones de ***quitar*** (elimina la amenaza del dispositivo) ó ***restaurar*** (vuelve a colocar el archivo en la carpeta donde se encontraba y el antivirus lo volverá a detectar como una amenaza).

**Amenazas permitidas**: son elementos identificados como amenazas pero se les permite la ejecución en el equipo.

## **Configuración de protección contra virus y amenazas**

Aquí podemos administrar la configuración de la protección del equipo:

- **Protección en tiempo real**: localiza y evita que se ejecute malware en el equipo.
- **Protección entregada en la nube**: ofrece una mayor protección y más rápida debido a que el equipo tiene acceso a las definiciones (contenida en la nube) más actualizadas de las amenazas. El equipo no obstante debe de tener conexión a internet para poder acceder a dicha nube.
- **Envío automático de muestras**: si el equipo está conectado a la nube, podemos hacer que 'Defender' envíe automáticamente archivos sospechosos a Windows para comprobar si hay amenazas potenciales.
- **Acceso controlado a carpetas**: podemos proteger archivos, carpetas, espacios de memoria del equipo de cambios no autorizados provocado por aplicaciones de terceros.
- **Exclusiones**: podemos indicarle a 'Defender' una serie de carpetas de confianza las cuales no analizará.
- **Notificaciones**: 'Defender' nos enviará notificaciones cuando encuentre alguna amenaza en el sistema para que se realice una acción frente a ella y del estado del equipo.

![Untitled](Aspectos%20Ba%CC%81sicos%20de%20Windows%20III%2069f5cf48be454594ac69f68c4417b020/Untitled%201.png)

## **Protección frente a ransomware**

> *Un ransomware es un tipo de malware dedicado a la encriptación de carpetas, archivos o equipos al completo con el fin de obtener los datos del usuario infectado.*
> 

Para ello, *Windows Defender* nos permite configurar el acceso a carpetas de forma controlada:

**Acceso controlado a carpetas**: para que el equipo esté protegido contra ransomware se requiere que esta función esté habilitada, además de la protección a tiempo real.

# Firewall y protección de red

> *Un firewall controla el tráfico de red que fluye dentro y fuera de los dispositivos a través de los puertos.*
> 

Podemos acceder mediante el comando `WF.msc` en Ejecutar.

Nos ofrece una vista de las redes a las que está conectado el equipo, se puede activar / desactivar y podemos acceder a las opciones avanzadas para los siguientes tipos de red:

- **Redes de dominio**: redes donde el sistema host puede autenticarse en un controlador de dominio.
- **Redes privadas**: son las redes reconocibles, el usuario asigna esta red y se utiliza para redes domésticas.
- **Redes públicas**: son las redes no reconocibles, es el predeterminado que se utiliza para designar redes públicas como puntos de acceso Wi-Fi en ubicaciones públicas.

## Permitir una aplicación a través del firewall

Podemos agregar una excepción para la aplicación que está siendo bloqueada por el firewall o también podemos asignar un puerto específico.

Podemos ver la configuración actual de cualquier perfil de firewall, si es privado y/o público y en la opción ‘Detalles’ podemos ver el nombre y una breve descripción sobre el perfil.

![Untitled](Aspectos%20Ba%CC%81sicos%20de%20Windows%20III%2069f5cf48be454594ac69f68c4417b020/Untitled%202.png)

![Untitled](Aspectos%20Ba%CC%81sicos%20de%20Windows%20III%2069f5cf48be454594ac69f68c4417b020/Untitled%203.png)

## Configuración avanzada

Está orientado a usuarios avanzados de Windows.

Podemos crear reglas de entradas / salidas, reglas de seguridad de conexión y ver registros de supervisión para el firewall, si no se tiene un buen conocimiento sobre estas opciones podemos hacer que el equipo sea más vulnerable o que algunas aplicaciones dejen de funcionar.

# Control de explorador y aplicaciones

> *Microsoft Defender SmartScreen nos protege de phishing o aplicaciones de malware y de la descarga de archivos maliciosos.*
> 

Gracias al control del explorador y de las aplicaciones podemos bloquear o realizar advertencias sobre aplicaciones, archivos, descargas y contenido de webs maliciosas, también podemos desactivar tanto el bloqueo como las advertencias, algo **NO** recomendable.

## Protección contra vulnerabilidades

Esta protección viene integrada en Windows lo que hace que proteja al equipo desde el momento en que se inicia el sistema operativo. Esta configuración se puede personalizar (tanto el equipo como aplicaciones), pero **NO** es recomendable si no se está seguro de lo que se hace.

Se puede compartir la configuración en los dispositivos que estén interconectados (por ejemplo una organización).

# Seguridad del dispositivo

Ofrece opciones de seguridad integradas que ayudan a proteger de malware.

## Aislamiento del núcleo

Nos aporta protección adicional contra malware y otros ataques al aislar los procesos del equipo del sistema operativo y del dispositivo. 

En la sección de ‘*Detalles de aislamiento del núcleo*’ podemos habilitar / deshabilitar y cambiar la configuración del mismo.

### Integridad de la memoria

Es una característica del aislamiento del núcleo, donde al activarlo evita que el malware tenga acceso a los procesos de alta seguridad en caso de un ataque.

## Procesador de seguridad

Ofrece un cifrado adicional para el dispositivo.

Si accedemos a la sección `*Detalles del procesador de seguridad*' encontramos información sobre el fabricante, la versión, el TPM y más.

> *Trusted Plataform Module (TPM) es una tecnología diseñada por Microsoft para ofrecer funciones basadas en hardware y relacionadas con la seguridad.
Un chip TPM es un criptoprocesador seguro diseñado para realizar operaciones de criptografía. Este chip incluye múltiples mecanismos físicos de seguridad para hacerlo resistente frente a la manipulación y para que el malware no pueda manipular las funciones de seguridad del TPM.*
> 

# BitLocker

> *BitLocker Drive Encryption es una función de protección de datos que se integra con el sistema operativo y que hace frente a las amenazas de robo y exposición de datos.*
> 

Los equipos que tienen instalado TPM, BitLocker ofrece una mejor protección.

Según Microsoft, BitLocker ofrece la mejor protección cuando se utiliza con un TPM cuya versión es la 1.2 o superior.

Los equipos más nuevos ya contienen un TPM instalado por el fabricante del equipo.

# Servicio de copia de seguridad de discos

> *El servicio de copias de seguridad de discos (VSS) coordina las acciones necesarias para la creación de snapshots (instantáneas) coherentes de los datos que se va a realizar la copia de seguridad*.
> 

Estas snapshots se almacenan en la carpeta de información de cada disco que tiene habilitada dicha protección.

Si VSS está habilitado podemos realizar varias tareas como **Crear un punto de restauración**, **Restaurar el sistema**, **Configurar las opciones de restauración**, **Eliminar puntos de restauración.**

---