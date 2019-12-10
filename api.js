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
        const dadosAPI = `https://api.github.com/repos/${(repositorioInserido.substr(19,))}/issues?page=1&per_page=100`; 
        //https://github.com/microsoft/calculator
        // usando o fetch para buscar os dados do api no github e transformando em JSON
        //.replace(/(\r\n|\n|\r)/gm,"");
        fetch(dadosAPI)
            .then((res) => res.json())
            .then(function (data) {
               var textoDaString  = "title| body| state| number| assingnee| labels| milestone\n"
               data.map(function(dado){
                 let assigneeTotal = dado.assignee;
                 let assigneeLogin;
                 if (assigneeTotal != null && "login" in assigneeTotal) assigneeLogin = assigneeTotal.login;
                 let milestoneTotal = dado.milestone
                 if (milestoneTotal != null && "title" in milestoneTotal) milestoneTotal = milestoneTotal.title;
                 textoDaString += dado.title.replace(/"/g, "'")+'|"'+ dado.body.replace(/(\r\n|\n|\r)/gm,"").replace(/"/g, "'")+'"'+'|'+ dado.state+'|'+ dado.number+'|'+ assigneeLogin+'|'+ JSON.stringify(dado.labels)+'|'+ milestoneTotal+'\n';
              })
                   fs.writeFile("./arquivo.csv", textoDaString, function(err) {
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