const express = require('express');
const aplicacao = express();
const port = 4000;

aplicacao.get('/', (req, res) => {
    res.send("Chamei o Backend com sucesso");
});

aplicacao.post('/', (req, res) => {
    res.send("Chamei o Backend com sucesso usando post");
});


aplicacao.get('/moedas', (req, res) => {

    const moedas = {
        BRL: "real",
        USD: "dolar",
        EUR: "euro"
    }

    res.status(200).json(moedas);

});

// aplicacao.post('/', (req, res) => {
//     const moedas = {
//         BRL: "real",
//         USD: "dolar",
//         EUR: "euro"
//     }

//     res.status(200).json(moedas);
// });

aplicacao.get('/info', (req, res) => {

    const informacoes = {
        version: "1.0",
        author: "João",
        update: "Maio de 2024",
        price: "Free",
        license: "ABC"
    }

    res.status(200).json(informacoes);

})

aplicacao.get('/conversao/:moedas', (req, res) => {
    let moedas = req.params.moedas.split("-");
    let moeda1 = moedas[0];
    let moeda2 = moedas[1];

    console.log(moeda1)
    console.log(moeda2)
    conversao = {};
    res.status(200).json(conversao)
})



// Aplicação ouvindo a porta
aplicacao.listen(port, () => {
    console.log(`Escutando na porta ${port}`);
});