# ESCENARIO 3

## Nombres de los integrantes

- Ricardo Nuñez Valencia-A00030132
- Alejandro Ramos Vélez-A00310480
- Felipe Jurado Murillo-A00328420

## Desarrollo del Escenario

Dentro del procedimiento que se hace para realizar este escenario, se tiene lo siguiente:

- Configuración del archivo VagrantFile
- Configuración del archivo hosts
- Configuración del archivo servers.yml
- Prueba del sistema configurado y aprovisionado
  
 ### Configuración del archivo VagrantFile
 
 
 <img src="https://github.com/RicNuva18/DistribuitedWebApp/blob/master/VagrantConfiguracion1.png">
 <br>
 
En esta configuración inicial se observa que se va a hacer la gestión para la creación de dos maquinas virtuales con Ubuntu 18.04. Cada máquina va a tener 1 CPU, un puerto para ssh y 1024 de RAM. Luego, se ejecuta el código en ansible para aprovisionarlas.
 
Al ejecutar Vagrant, se lanza un error debido a que se intenta crear las maquinas virtuales simultáneamente con sus aprovisionamientos. Por ende se elimina la linea de "ansible.limit=all", resultando en la siguiente configuración que parcialmente resuelve este error:

<br>
 <img src="https://github.com/RicNuva18/DistribuitedWebApp/blob/master/VagrantConfiguracion2.png">
 <br>

 ### Configuración del archivo hosts
 
 <img src="https://github.com/RicNuva18/DistribuitedWebApp/blob/master/Hosts2.png">
 <br>
 
 En la configuración del hosts se tiene que agregar el comando "ServerX ansible_host=DirecciónIP" para que ejecute el aprovisionamiento en orden de cada máquina virtual. Esto logra solucionar completamente el error descrito en la anterior sección. 
 
 ### Configuración del archivo servers.yml
 
 
 <img src="https://github.com/RicNuva18/DistribuitedWebApp/blob/master/AnsibleWebServer.png">
 <br>
 
 En cuanto a la configuración para el aprovisionamiento del servidor Web, se tienen las siguientes tareas:
 
 - Actualizar las dependencias de la máquina con el comando apt update.
 - Instalar el módulo de apache2.
 - Borrar cualquier archivo que haya en la carpeta /var/www/html. Esto con el fin de evitar errores en tiempo de ejecución de Vagrant al copiar archivos ya existentes.
 - Instalar las dependencias que se necesitan de PHP para funcionar en el servidor Web y poderse comunicar con el servidor de base de datos.
 - Permitir la dependencia que PHP utiliza para interactuar con bases de datos MySQL.
 - Instalar GIT.
 - Clonar un repositorio remoto que contiene los archivos para ser usados por el servidor Web.
 - Restaurar el servidor apache2.
 
 
 <br>
  <img src="https://github.com/RicNuva18/DistribuitedWebApp/blob/master/AnsibleDatabaseServer.png">
 <br>
 
 Luego se ejecuta la configuración del servidor de base de datos, para la cual se tienen las siguientes tareas:
 
 - Instalar dependencias de Python y de Mysql para la base de datos.
 - Instalar la dependencia MySQL Server.
 - Crear un directorio para guardar archivos que va a necesitar el servidor.
 - Cambiarse al directorio creado.
 - Clonar un repositorio remoto que contiene los archivos para ser usados por el servidor de base de datos.
 - Dar permisos de ejecución al script de configuración de la base de datos
 - Ejecutar el script de configuración de la base de datos
 
### Prueba del sistema configurado y aprovisionado 
 
 Al conectarse al servidor Web se muestra una lista de valores ya predefinidos en la base de datos y un formulario para agregar otro nuevo usuario a la base de datos. En cuanto al usuario a agregarse se digitan los valores "Usuario" como Id y "950" como nombre.
 
<br>
  <img src="https://github.com/RicNuva18/DistribuitedWebApp/blob/master/PruebaFinalWeb.png">
 <br>
 
Luego de haberse ejecutado el botón de Submit, aparece el siguiente mensaje que dice que se ha agregado exitosamente el usuario a la base de datos.
 
  <br>
  <img src="https://github.com/RicNuva18/DistribuitedWebApp/blob/master/PruebaFinalAgregar.png">
 <br>
 
 Al retornar otra vez a la página principal del servidor Web, se observa que se visualiza el usuario que se ha agregado recientemente.
 
  <br>
  <img src="https://github.com/RicNuva18/DistribuitedWebApp/blob/master/PruebaFinalAgregado.png">
 <br>
 
## Dificultades encontradas
 
Dentro de las dificultades encontradas a lo largo del desarrollo del sistema están:

- Comunicación nula del Backend con la base de datos. Para solucionar esta dificultad se busca la dependencia "phpx.x-mysql", ya que esta permite que PHP puede usar el API de mysqli.

- Ejecución errónea del archivo VagrantFile y hosts debida a la realización del aprovisionamiento simultáneamente con la creación de las máquinas. Para solucionar esta dificultad fue necesario eliminar la línea de "ansible.limit=all" del archivo VagrantFile y adicionar la línea "ServerX ansible_host=dirIP" en cada host del archivo hosts.

- Errores en el archivo servers.yml con respecto a:
  - Copiar archivos de un repositorio remoto a una carpeta inexistente. Para solucionarlo se crea la carpeta antes de copiar los archivos.
  - Instalación incompleta de dependencias para el funcionamiento de los servidores. Para solucionarlo se utiliza el gestor de paquetes APT para que instale las dependencias necesarias
  - Permisos para acceder a la base de datos. Para solucionarlo se requiere modificar el archivo de configuración de mysql para que la base de datos pueda escuchar cualquier dirección IP cliente. Adicionalmente se tiene que dar permiso al usuario en el motor MySQL.

## Conclusiones

- Vagrant es una herramienta que permite automatizar el proceso de creación de máquinas virtuales. Esto logra que se evite hacer tareas repetitivas y manuales, como el asignamiento de partición de disco, seleccionar la cantidad de RAM, instalar la ISO, etc.

- Ansible es una herramienta de aprovisionamiento que se basa en el orden de las tareas asignadas a cada host de la red. Esto logra que se automatiza la creación de servicios en una infraestructura ya existente.
