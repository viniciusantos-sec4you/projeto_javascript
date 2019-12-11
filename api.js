  // lib redline
const readline = require('readline')
  // lib fetch
const fetch = require('node-fetch')
  //lib 
const fs = require('fs')

  //Usando readline para requisitar url do repositório
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})
rl.question('Insira um repositório: ', (repositorioInserido) => {
    // verificando se é um repositório do github
    const ver1 = repositorioInserido.substr(0,18)
    if (ver1 == "https://github.com"){
        const urlApiRepositorio = `https://api.github.com/repos/${(repositorioInserido.substr(19,))}/issues?page=1&per_page=100`; 
        // usando o fetch para buscar os dados do api no github e transformando em JSON
        fetch(urlApiRepositorio)
            .then((res) => res.json())
            .then(function (data) {
               //Declarando uma variável para receber os campos requisitados como String (essa variável ja contem o cabeçalho).
               var camposDaIssueString = "title, body, state, number, assingnee, labels, milestone\n";
               //Extraindo as informações requisitadas da issue e adicionando à variável textodaString como string para cada campo do arquico JSON 
               data.map(function(dado){
                 //Pré-tratamento de extração dos campos assignee e milestone
                 //Extraindo login do campo assignee
                 let assigneeTotal = dado.assignee;
                 let assigneeLogin;
                 if (assigneeTotal != null && "login" in assigneeTotal) assigneeLogin = assigneeTotal.login;
                 //Extraindo title do campo milestone
                 let milestoneTotal = dado.milestone;
                 if (milestoneTotal != null && "title" in milestoneTotal) milestoneTotal = milestoneTotal.title;
                 //Declaração de 7 variáveis para cada requisição da issue
                 //foram substituidas as "," por ";" do title, body e labels
                 let campo1 = (dado.title.replace(/,/g, ";")).replace(/"/g, "'");
                 let campo2 = (dado.body.replace(/(\r\n|\n|\r)/gm,"").replace(/,/g, ";")).replace(/"/g, "'");
                 let campo3 = dado.state;
                 let campo4 = dado.number;
                 let campo5 = assigneeLogin;
                 let campo6 = JSON.stringify(dado.labels).replace(/,/g, ";");
                 let campo7 = milestoneTotal;
                 //Os campos em forma de string foram adicionadas forma adicionados à variável camposDaIssueString 
                 camposDaIssueString += `${campo1}, ${campo2}, ${campo3}, ${campo4}, ${campo5}, ${campo6}, ${campo7}\n`
                })
                //Transformando a variável camposDaIssueString em um arquivo CSV
                fs.writeFile("./arquivo.csv", camposDaIssueString, function(err) {
                      if(err) {
                            return console.log(err);
                          }
                        }) 
                })    
            .catch((error) => {
                console.log('Erro')
            })
    }else {
      console.log("Esse não é um repositório do github")
    }
    rl.close();
})