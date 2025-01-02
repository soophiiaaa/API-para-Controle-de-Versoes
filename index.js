const express = require('express');
const projetos = require('./database/database');
const gerarId = require('./functions/idAleatorio');
const app = express();

app.use(express.json())

app.get('/projetos', (req, res) => {
    res.json(projetos)
})

app.post('/projetos', (req, res) => {
    const novoProjeto = {
        id: gerarId(),
        nome: req.body.nome,
        descricao: req.body.descricao,
        dataCriacao: req.body.dataCriacao
    }

    if (typeof req.body.nome !== "string") {
        return res.status(406).send('Informação Incorreta Cadastrada')
    }
    
    if (typeof req.body.descricao !== "string") {
        return res.status(406).send('Informação Incorreta Cadastrada')
    }

    if (typeof req.body.dataCriacao !== "string") {
        return res.status(406).send('Informação Incorreta Cadastrada')
    }

    projetos.push(novoProjeto)
    res.send('Projeto Cadastrado com Sucesso!')
})

app.listen(8081, () => {
    console.log('Servidor Rodando em http://localhost:8081')
})
