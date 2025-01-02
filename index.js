const express = require('express');
const app = express();
const projetos = require('./database/database')

app.listen(8081, () => {
    console.log('Servidor Rodando em http://localhost:8081')
})
