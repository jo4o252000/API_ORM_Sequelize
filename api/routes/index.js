const bodyParse = require('body-parser')

const pessoas = require('./pessoasRoutes')
const niveis = require('./niveisRoute')
const turmas = require('./turmasRoute')

module.exports = app => {
    //app.use(bodyParse.json())//informando que todas as requisições que cehgar o body parse vai converter para json 
    app.use(
        bodyParse.json(),
        pessoas,
        niveis,
        turmas
    )
}