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

app.post('/projetos/id/:id', (req, res) => {
    const { id } = req.params
    const projeto = projetos.find((p) => p.id === id) 

    if (!projeto) {
        return res.status(404).send('Projeto Inexistente!')
    }

    const novaVersao = {
        idVersao: req.body.idVersao,
        descVersao: req.body.descVersao
    }

    projeto.versoes.push(novaVersao)
    res.status(201).json({ mensagem: 'Versão adicionada com sucesso!', projeto })
})

app.listen(8081, () => {
    console.log('Servidor Rodando em http://localhost:8081')
})
