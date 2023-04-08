const database = require('../models')

class Services {
    constructor(nomeDoModelo){
        this.nomeDoModelo = nomeDoModelo
    }
    
    async pegaTodosOsRegistros(){
        return database[this.nomeDoModelo].findAll()
    }
    async pegaUmRegistro(id){
        return database[this.nomeDoModelo].findOne({where: {id:id}})
    }
    async criaRegistro(dadosCriar){
        return database[this.nomeDoModelo].create(dadosCriar)
    }
    async atualizaRegistro(dadosAtualizados, id, transacao = {}){
        return database[this.nomeDoModelo].update(dadosAtualizados, {where: {id:id}}, transacao)
    }
    async atualizaRegistros(dadosAtualizados, where, transacao = {}){
        return database[this.nomeDoModelo].update(dadosAtualizados, {where: {...where}}, transacao)
    }

    async apagaRegistro(id){
        return database[this.nomeDoModelo].destroy({where:{id: id}})
    }   
}

module.exports = Services

/*Os arquivos Service, pegam a responsabilidade dos controladores de fazer as requisiçoes na dataBase
sendo assim podemos melhorar a qualidade do codigo nas controladoras e fazer com que alguns metodos, 
que usamos para fazer requisições no banco fique centralizado em um unico arquivo, podendo assim 
reutilizar ele em varios lugares. */