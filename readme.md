# Introdução

Esse projeto tem como objetivo demonstrar os conhecimentos de Javascript que foram aprendidos nos cursos da pluralsight durante o estágio. Foi requisitado o desenvolvimento de um utilitário em command-lin para ser executado via terminal. Esse utilitário acessa o GITHUB via API para um repositório selecionado, e gera um arquivo CSV com todas a issues, com as seguintes informações: 

- title
- body
- state
- number
- assignee ["login"]
- label 
- mistone name ["title"]

# Como Utilizar:

Para utilizar esse script é necessário executar os seguintes comandos de instalação:

Para windows  

https://nodejs.org/en/download/  

Para linux  

apt install nodejs 
apt instal npm 
npm install node-fetch  

## Executando o código:

node api.js  
Insira um repositório: //Digite ou cole o link do repositório

## Abrindo o arquivo CSV

Quando abrir o arquivo CSV, configurar o separador de campos para "," e o delimitador de string """.