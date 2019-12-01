# ULE-BC4Authentication

INSTALACIÓN Y EJECUCIÓN DE ULE-BC4AUTHENTICATION
Intalación eosio y ejecución de un Smart contract.
1º descargamos el software de eosio

Git clone https://github.com/EOSIO/eos --recursive

Accedemos a la carpeta eos : cd eos/scripts y ejecutamos el comando

./eosio_build.sh

Una vez se haya instalado iremos a la carpeta: cd ../build que se nos habra generado durante la instalación, ahi debemos ejecutar el comando:
sudo make install
De esta manera ya habremos instalado el software necesario, el siguiente paso que debemos realizar es incluir la direccíon en la variable del sistema:

export PATH=$PATH:/usr/local/eosio/bin

Ahora ya podemos comenzar a ejecutar nnuestro nodo local, para esto debemos ejecutar el siguiente comando, al ser la primera vez que ejecutaremos este comando necesitaremos hacerlo de distinta forma que las veces futuras, cuando la red tenga datos y necesitamos que estos persistan.
El comando que nos permitira iniciar este componente es el siguiente:

nodeos -e -p eosio -d  --http-validate-host=false 
--plugin eosio::producer_plugin 
--plugin eosio::history_plugin 
--plugin eosio::chain_api_plugin 
--plugin eosio::history_api_plugin 
--plugin eosio::http_plugin 
--http-server-address=0.0.0.0:8888 
--access-control-allow-origin=* 
--contracts-console 
--verbose-http-errors &

El siguiente paso que hay que seguir es iniciar nuestro gesstor de cuentas esto lo haremos con el siguiente comando:

keosd

Ahora ya podremos interactuar con los comandos de cleos para poder crear los usuarios y de esta manera desplagar el contrato y ejecutar sus funciones.
Antes de comenzar este apartado vamos a instalar el software que nos va a permitir compilar nuestros smart contracts:

git clone https://github.com/eosio/eosio.cdt --recursive
./build.sh
sudo ./install.sh

De esta manera ya podriamos compilar nuestro Smart contract esto lo haremos con el comando:



Eosio-cpp -abigen PATH_SMARTCONTRACT/src/jrodrg.cpp -o directorio_salida_de_compilación/jrodrg.wasm -contract “jrodrg”



Una vez tenemos el archivo abi y el archivo .wasm podremos comenzar a crear los usuarios para poder desplegar nuestros archivos compilados.
El primero en que nos vamos a fijar va a ser en el usuario por defecto a este le vamos a añadir las claves de administrador otorgadas por eosio: 5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3
Lo primero que debemos hacer es obtener una contraseña para esta cuenta, es importante almacenar todos los datos , como las contraseñas o las claves publicas asociadas a las claves privadas:

cleos wallet create --to-console

Ahora importamos la clave de admin

cleos wallet import --private-key 5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3

El siguiente usuario que tendremos que crear es la autoridad que pueda desplegar el contrato y ejecutar sus funciones

cleos wallet create -jrodrg --to-console
cleos wallet import -n jrodrg --private-key 5KFyaxQW8L6uXFB6wSgC44EsAbzC7ideyhhQ68tiYfdKQp69xKo

Una vez hemos hecho esto ejecutamos el siguiente comando:

cleos wallet set contract jrodrg directorio_ule-bc4authentication/jrodrg/ -p jordrg.

Ya tenemos nuestro Smart contract desplegado en un nodo local de Eosio, ahora comenzaremos a desplegar el frontend de la aplicación.

cd directorio_ule-bc4authentication/front/
npm install --save
node index.js

Ya podemos accedes a localhost:3000
