# ESCENARIO 3

Dentro del procedimiento que se hace para realizar este escenario, se tiene lo siguiente:

- Configuración del archivo VagrantFile
- Configuración del archivo hosts
- Configuración del archivo servers.yml
  
 ## Configuración del archivo VagrantFile
 
 
 <img src="https://github.com/RicNuva18/DistribuitedWebApp/blob/master/VagrantConfiguracion1.png">
 <br>
 
En esta configuración inicial se observa que se va a hacer la gestión para la creación de dos maquinas virtuales con Ubuntu 18.04. Cada máquina va a tener 1 CPU, un puerto para ssh y 1024 de RAM. Luego, se ejecuta el código en ansible para aprovisionarlas.
 
Al ejecutar Vagrant, se lanza un error debido a que se intenta crear las maquinas virtuales simultáneamente con sus aprovisionamientos. Por ende se elimina la linea de "ansible.limit=all", resultando en la siguiente configuración que parcialmente resuelve este error:

<br>
 <img src="https://github.com/RicNuva18/DistribuitedWebApp/blob/master/VagrantConfiguracion2.png">
 <br>

 ## Configuración del archivo hosts
 
 <img src="https://github.com/RicNuva18/DistribuitedWebApp/blob/master/Hosts2.png">
 <br>
 
 En la configuración del hosts se tiene que agregar el comando "ServerX ansible_host=DirecciónIP" para que ejecute el aprovisionamiento en orden de cada máquina virtual. Esto logra solucionar completamente el error descrito en la anterior sección. 
 
 ## Configuración del archivo servers.yml
 
 
 
 
