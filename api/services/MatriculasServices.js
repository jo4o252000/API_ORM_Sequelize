const Service = require('./Services')
const database = require('../models')

class MatriculasServices extends Service{
    constructor(){
        super('Matriculas')
    }
    async atualziaMatriculaDeEstudante(atualizaMatricula, estudanteId, matriculaId){
        return database[this.nomeDoModelo].update(atualizaMatricula, {where:{id: matriculaId, estudante_id: estudanteId}})
    }
}

module.exports = MatriculasServices