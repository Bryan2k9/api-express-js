// Função para calcular o F
function convercao(celsius) {

    const convercao_f = (celsius * 9 / 5) + 32 
    
    let unidade_original = req.body.unidade_original;
    let unidade_convertida = "";

    if(unidade_original == "°C") {
    unidade_convertida = "°F"
    }

    let classificacao = "";
    if (celsius < 80 ) {
        classificacao = "Temperatura ideal";
    } else if (celsius >= 95 && celsius <= 105) {
        classificacao = "Acima da temperatura ideal";
    } else {
        classificacao = "Limite crítico";
    }

    return {
        celsius: parseFloat(celsius.toFixed(2)),
        fahrenheit: parseFloat(convercao_f.toFixed(2)),
        classificacao: classificacao,
        unidade_convertida: unidade_convertida,
    }
    
}
module.exports = convercao;