// (async function (){
//     const result =
//         await fetch("https://cdn.apicep.com/file/apicep/06233-030.json");
//     console.log(result);
// })()

(function() {
    let botao = document.getElementById("botao");
    let cep = document.getElementById("cep");
    let retorno = document.getElementById("retorno");

    botao.onclick = function() {
        fetch(`https://cdn.apicep.com/file/apicep/${cep.value}.json`).then(function(response) {
            response.json().then(function(json){
                if (json.status === 200) {
                    retorno.innerHTML += json.status;
                    retorno.innerHTML += json.city;
                    console.log(json.status);
                    console.log(json.city);
                } else {
                    retorno.innerHTML = "Não funcionou";
                    console.log("Não funcionou");
                }
            });
        }); 
    };
})();
