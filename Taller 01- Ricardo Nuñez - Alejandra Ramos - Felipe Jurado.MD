## Taller 01 Sistemas Distribuidos
### Nombres de los integrantes

- Ricardo Nuñez Valencia-A00030132
- Alejandro Ramos Vélez-A00310480
- Felipe Jurado Murillo-A00328420
    ___
## Escenario 1

-  **Lo primero que se realizó fue la descarga de la imagen ISO de Centos**

Primeramente se intentó realizar la descarga de Centos 8, pero al momento de realizar la creación de la respectiva máquina virtual en VirtualBox, generaba ciertos errores cuando estaba en proceso de instalación.

Por lo tanto, se decidió utilizar la imagen ISO suministrada por los equipos del laboratorio, la cual corresponde a Centos 7.

-  **Se continuó con la creación de la máquina virtual en VmWare, utilizando la imagen ISO previamente mencionada.**

Previamente a que comience la instalación de Centos, se deben configurar ciertos parámetros como lo son:


-- **El origen de la instalación,** en dónde automáticamente selecciona la imagen ISO previamente cargada.

-- **Selección de software**, en dónde elegimos que tanto queremos instalar, sí una instalación básica, o con interfaz gráfica, entre otras.

-- **Destino de la instalación**, en donde seleccionamos el disco dónde queremos que sea instalado.

-- **Red y Nombre de equipo**, en dónde le habilitamos la interfaz de red, que nos daría la conexión de red.

Y ahora continuamos con la instalación

-  **Cuando ya tenemos instalado Centos 7, procedemos con la instalación de NGINX.**

Primero ingresamos el siguiente comando para buscar los paquetes NGINX:

  `sudo yum search nginx`

Luego actualizamos los paquetes con el comando:

`sudo yum update`

En CentOS al parecer no hay paquete en los repositorios oficiales por defecto, así que hay que añadir primero el repositorio a nuestra lista de repositorios y luego instalarlo.

Podemos descargar el paquete RPM que instala la configuración del repositorio y posteriormente instalarlo con la utilidad rpm, o instalarlo directamente con la utilidad yum pasando la URL completa hacia el fichero RPM de la siguiente forma:

yum install http://nginx.org/packages/centos/7/noarch/RPMS/nginx-release-centos-7-0.el7.ngx.noarch.rpm `

 Ahora sí podemos proceder a instalar NGINX:

	sudo yum install nginx`

    
Después habilitamos el servicio nginx con el siguiente comando:

 `sudo systemctl enable nginx `

 A continuación los comandos para iniciar, detener, reiniciar, y observar el status del servidor NGINX:

	 `sudo systemctl start nginx ## Para iniciar el servidor`

	 `sudo systemctl stop nginx ## Para detener el servidor`

	  `sudo systemctl restart nginx ## Para reiniciar el servidor`
	  
	  `sudo systemctl reload nginx ## Para recargar el servidor`
	sudo systemctl status nginx ## Para obtener el status del servidor`

 Primero ejecutamos el comando para iniciar y posteriormente podemos comprobar con el comando para observar el status que efectivamente se encuentran corriendo.  

  Finalmente debemos actualizar algunas configuraciones del firewall y abrir los puertos TCP 80 y 443 con el siguiente comando:

  `sudo firewall-cmd --permanent --zone=public --add-service=https --add-service=http`

  `sudo firewall-cmd --reload`

 Por último comprobamos la dirección IP que tiene el equipo, la cual en nuestro caso es : 192.168.231.132

 Y para verificar que nuestro servidor NGINX esta funcionando correctamente, ingresamos desde el navegador desde nuestra maquina real, y efectivamente observamos la pagina principal de NGINX.

   #### ¿Por qué esta forma de crear ambiente de pruebas puede ser apropiado (o inapropiado) para desplegar réplicas de este ambiente?

   Esta forma de crear nuevos ambientes virtuales se puede considerar inapropiada cuando se requiere desplegar una gran cantidad de los mismos, ya que seria un proceso bastante complejo, en donde se debe descargar el archivo iso de cada uno de los sistemas operativos, y posteriormente realizar el proceso de creación de la maquina virtual para finalmente conectarnos a ssh para realizar la instalación de las aplicaciones lo que se requiere en cada maquina.

   Esta seria la manera tradicional de crear entorno virtuales, pero debido a la necesidad de realizar estos procesos con mayor rapidez, nos damos cuenta que se volveria un trabajo tedioso al momento de descargar y realizar el despliegue de maquinas virtuales y es por eso que haciendo uso de Vagrant y Ansible, nos permite realizar a creación y aprovisionamiento de maquinas virtuales respectivamente.

   ---
   ## Escenario 2

   ### Documentación y evidencias

   - *Creación y provisionamiento de la máquina virtual para la Base de Datos*

   Haciendo uso de Vagrant se creo la máquina virtual *Centos 7* asignandole la dirección IP expresada  en la línea 4 de la siguiente imagen.

   ![image](https://drive.google.com/uc?export=view&id=1e9AyGLQZtS1MfMHS2uqrDzg8EWReSFdO)

  Para la parte de provisionamiento, se hizo uso de Ansible como se evidencia en las lineas #21 a #25. En esta parte, se apunta al archivo *servers.yml* que se encuentra en playbooks, Este archivo está compuesto por:

   - *Host:* Donde se anuncia el servicio que se instalará será una base de datos
    - *Task:* Donde se expresa que es lo que se va a realizar al correr el comando vagrant up

    ![image](https://drive.go0gle.com/uc?export=view&id=1qb3V8brF0a6zW-w7py7Kl3sqmFgjfjsd)

   En el archivo *host* se configuró el servicio se iba a instalar de la siguente forma:

   ![image](https://drive.google.com/uc?export=view&id=1QEoLKWsyRMSiyXnBMnsaG-FbWqpeXPVn)

   Después, se pasó a correr el comando vagrant up para iniciar la creación de la máquina virtual y el provisionamiento 

   ![image](https://drive.google.com/uc?export=view&id=1M_baVfUapiLvJujBDv_3Z2uUQ3kQxBdH)

   - *Conexión SSH a la máquina virtual*

   Se hizo uso del comando vagrant ssh para establecer la conexión a la máquina virtual

   ![image](https://drive.google.com/uc?export=view&id=1xbwtdp1Y-gt1xmgD3dSPizPxiEtKVaAP)

   En la anterior imagen se puede evidenciar que podemos ver la dirección IP que se le fue asignada a la máquina en el momento de la creación haciendo uso del comando ip a estando dentro de la máquina virtual.

   - *Destrucción y reconstrucción de la Base de Datos*

   Haciendo uso del comando vagrant destroy se destruyó la máquina virtual. La forma de comprobarlo es haciendo uso del comando vagrant status para verificar que no está creada como aparece en la siguiente imagen.

   ![image](https://drive.google.com/uc?export=view&id=11iHsbCQxZ-7fQJBG0lrw2d54PnazgadJ)

   Para reconstruirla, se hizó uso del comando vagrant up para crear la máquina nuevamente. La forma de verificar es haciendo uso del comando vagrant status y ver que nuevamente está corriendo.

   ![image](https://drive.google.com/uc?export=view&id=15V-qj8IMdnIf4C6YAUGaWvnsYRFTKJb5)

   - *Creación y provisionamiento de una máquina virtual para un servidor Web*

   Para la creación y provisionamiento de la máquina virtual se hizo uso de Vagrant y Ansible respectivamente como se puede evidenciar en la siguiente imagen.

   ![image](https://drive.google.com/uc?export=view&id=1NI4a-g1ZEV_D9GWAhrdQS9JPOSHXgGot)

   En la parte de provisionamiento, especificamente en las lineas #21 a #24, se apunta al archivo *servers.yml* que se encuentra en playbooks y tiene la siguente configuración:

   ![image](https://drive.google.com/uc?export=view&id=1c6g7RtQPCQLb09jFPycRBtV02fbwGsU_)

   Esta archivo esta compuesto por:

   - Host: Donde se anuncia el servicio que se instalará será un Servidor Web
    - Task: Donde se expresa que es lo que se va a realizar al correr el comando vagrant up, que en este caso es la instalación de apache y correr el servicio automaticamente, después de ser instalado.

   En el archivo *host* se configuró el servicio se iba a instalar de la siguente forma:

   ![image](https://drive.google.com/uc?export=view&id=1sS2Sl3vmTScMTTlEGfjTbgdHl-ZdSl0v)

   Después, se pasó a correr el comando vagrant up para crear, instalar y correr el servidor Web. Se puede verificar que el servicio está corriendo de forma correcta haciendo uso del comando vagrant status como se evidencia en la siguiente imagen.

   ![image](https://drive.google.com/uc?export=view&id=1JQb9ZahOIbDbVt2TW09avmFQu2rPTfqS)

   Por ultimo, se accedió al servidor Web desde la máquina local como se ve en la siguiente imagen.

   ![image](https://drive.google.com/uc?export=view&id=15ms6q19Hue4hhc7z94mmijXZUG_NX9n8)

   ### Dificultades encontradas

   La mayor dificultad encontrada fue a la hora de ejecutar el código proporcionado por el profesor y encontrar que no provisionaba. En ese momento se pasó a buscar ejemplos de provisionamiento, haciendo uso de Ansible y de esta forma nnos dimos cuenta de que el porblema estaba en la creación de una máquinas; ya que trataba de:

   1. Crear la máquina PostgreSQL
    2. Provisionar PostgreSQL
    3. Provisionar el Servidor Web

   El problema estaba en que trataba de provisionar una máquina que no existía.


   ### Ambiente de pruebas

   - Esta forma de crear ambientes de pruebas es apropiado para desplegar réplicas de este, porque permite ahorrar tiempo de configuración de los entornos, ya que se automatizan tareas que son indispensables para el correcto funcionamiento de los servicios a ofrecer.

   ----
  ## ESCENARIO 3

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

   Y por esta razon, es que vemos la gran utilidad del uso tanto de Vagrant como de Ansible, para realizar la creación y aprovisionamiento de maquinas virtuales de una manera mas rapida.


