const Service = require('./Services')
const database = require('../models')

class PessoasServices extends Service{
    constructor(){
        super('Pessoas')
        this.matriculas = new Service('Matriculas') // um novo parametro para o construtor 
    }

    async pegaResgistrosAtivos(where = {}){
        return database[this.nomeDoModelo].findAll({where: {...where}})
    }
    async pegaTodosOsRegistros(where = {}){
        return database[this.nomeDoModelo].scope('todos').findAll({where: {...where}})
    }
    async atualizaRegistro(dadosAtualizados, id, transacao = {}){
        return database[this.nomeDoModelo].update(dadosAtualizados, {where: {id:id}}, transacao)
    }
    async cancelaPessoaEMatriculas(estudanteId){
        return database.sequelize.transaction(async transacao => {
            await super.atualizaRegistro({ativo: false}, estudanteId,{transaction: transacao})
            await this.matriculas.atualizaRegistros({status:'cancelado'}, {estudante_Id: estudanteId}, {transaction: transacao})
        })
    }
}

module.exports = PessoasServices