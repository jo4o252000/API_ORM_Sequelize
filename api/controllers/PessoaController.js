// const database = require ('../models')
// const Sequelize = require('sequelize')
const {PessoasServices, MatriculasServices} = require('../services')
const pessoasServices = new PessoasServices()
const matriculasServices = new MatriculasServices()

class PessoaController{
    static async getAllPessoasAtivas(req, res){
        try{
            const allPessoasAtivas = await pessoasServices.pegaResgistrosAtivos()
            return res.status(200).json(allPessoasAtivas)
        }catch(error){
            return res.status(500).json(error.menssage)
        }
    }

    static async getAllPessoas(req, res){
        try{
            const allPessoas = await pessoasServices.pegaTodosOsRegistros()
            return res.status(200).json(allPessoas)
        }catch(error){
            return res.status(500).json(error.menssage)
        }
    }

    static async getPessoa(req, res){
        const {id} = req.params
        try{ 
            const umaPessoa = await pessoasServices.pegaUmRegistro(Number(id))//pegando um registro especifico
            return res.status(200).json(umaPessoa)
        }catch (error){
            return res.status(500).json(error.menssage)
        }
    }

    static async createPessoa(req, res){
        const newPessoa = req.body
        try{
            const createNewPessoa = await pessoasServices.criaRegistro(newPessoa)
            return res.status(200).json(createNewPessoa)
        }catch (error){
            return res.status(500).json(error.menssage)
        }
    }

    static async updatePessoa(req, res){
        const { id } = req.params
        const atualizaPessoa = req.body
        try{
            await database.Pessoas.update(atualizaPessoa, {where: {id: Number(id)} })
            return res.status(200).json({menssage: 'sucesso'})
        }catch (error){
            return res.status(500).json(error.menssage)
        }
    }

    static async deletePessoa(req, res){
        const { id } = req.params
        try{
            const deletePessoa = await pessoasServices.apagaRegistro(Number(id))
            return res.status(200).json({menssage: 'deletado com sucesso'})
        }catch (error){
            return res.status(500).json(error.menssage)
        }   
    }
    static async restaurarPessoa(req, res){
        const {id} = req.params
        try{
          await database.Pessoas.restore( {where: {id: Number(id)}} )
          return res.status(200).json({menssage: `id ${id} restaurado`})
        }catch (error){
          return res.status(500).json(error.message)
        }
    }

    //matriculas
    static async getMatricula(req, res){
        const {estudanteId, matriculaId} = req.params
        try{ 
            const umaMatricula = await database.Matriculas.findOne( {where: { id: Number(matriculaId), estudante_id: Number(estudanteId)}} )//pegando um registro especifico
            return res.status(200).json(umaMatricula)
        }catch (error){
            return res.status(500).json(error.menssage)
        }
    }
    static async createMatricula(req, res){
        const {estudanteId} = req.params
        const newMatricula = {...req.body, estudante_id: Number(estudanteId)}
        try{
            const createNewMatricula= await database.Matriculas.create(newMatricula)
            return res.status(200).json(createNewMatricula)
        }catch (error){
            return res.status(500).json(error.menssage)
        }
    }

    static async updateMatricula(req, res){
        const { estudanteId, matriculaId } = req.params
        const atualizaMatricula= req.body
        try{
            await matriculasServices.atualziaMatriculaDeEstudante(atualizaMatricula, Number(estudanteId), Number(matriculaId))
            //await database.Matriculas.update(atualizaMatricula, {where: {id: Number(matriculaId), estudante_id: Number(estudanteId)} })
            return res.status(200).json({menssage: 'sucesso'})
        }catch (error){
            return res.status(500).json(error.menssage)
        }
    }

    static async deleteMatricula(req, res){
        const { estudanteId, matriculaId } = req.params
        try{
            const deleteMatricula = await matriculasServices.apagaRegistro(matriculaId)
            return res.status(200).json({menssage: 'deletado com sucesso'})
        }catch (error){
            return res.status(500).json(error.menssage)
        }   
    }
    static async getMatriculasInEstudante(req, res){
        const { estudanteId } = req.params
        try{
            const pessoa = await database.Pessoas.findOne({where: {id: Number(estudanteId)}})
            const matriculas = await pessoa.getAulasMatriculadas()
            return res.status(200).json(matriculas)
        }catch (error){
            return res.status(500).json(error.menssage)
        }   
    }
    static async getMatriculasPorTurma(req, res){
        const { turmaId } = req.params
        try{
            const todasAsMatriculas = await database.Matriculas.findAndCountAll({where:{turma_id: Number(turmaId), status: 'confirmado'},limit:20, order:[['estudante_id', 'DESC']]})
            return res.status(200).json(todasAsMatriculas)
        }catch (error){
            return res.status(500).json(error.menssage)
        }   
    }
    static async getTurmasLotadas(req, res){
        const lotacaoTurma = 1
        try{
            const turmasLotadas = await database.Matriculas.findAndCountAll({where: {status: 'confirmado'}, attributes: ['turma_id'], group: ['turma_id'], having: Sequelize.literal(`count(turma_id) > ${lotacaoTurma}`)})
            return res.status(200).json(turmasLotadas)            
        }catch (error){
            return res.status(500).json(error.menssage)
        }   
    }
    static async cancelaEstudante (req, res){
        const  {estudanteId} = req.params
        try{
            await pessoasServices.cancelaPessoaEMatriculas(Number(estudanteId))
            return res.status(200).json({menssage:`matriculas ref.estudante ${estudanteId} canceladas`})          
        }catch (error){
            return res.status(500).json(error.menssage)
        }   
    }

}


module.exports = PessoaController