__#Introdução__

Esse projeto tem como objetivo demonstrar os conhecimentos de Javascript que foram aprendidos nos cursos da pluralsight durante o estágio. Foi requisitado o desenvolvimento de um utilitário em command-lin para ser executado via terminal. Esse utilitário acessa o GITHUB via API para um repositório selecionado, e gera um arquivo CSV com todas a issues, com as seguintes informações: 

- title
- body
- state
- number
- assignee ["login"]
- label 
- mistone name ["title"]

__#Como Utilizar:__

Para utilizar esse script é necessário executar os seguintes comandos de instalação:

apt install node
apt install npm
npm install node-fetch