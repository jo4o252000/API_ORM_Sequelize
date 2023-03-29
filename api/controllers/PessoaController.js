const database = require ('../models')

class PessoaController{
    static async getAllPessoas(req, res){
        try{
            const allPessoas = await database.Pessoas.findAll()
            return res.status(200).json(allPessoas)
        }catch(error){
            return res.status(500).json(error.menssage)
        }
        
    }

    static async getPessoas(req, res){
        const {id} = req.params
        try{ 
            const umaPessoa = await database.Pessoas.findOne( {where: { id: Number(id) }} )//pegando um registro especifico
            return res.status(200).json(umaPessoa)
        }catch (error){
            return res.status(500).json(error.menssage)
        }
    }

    static async createPessoa(req, res){
        const newPessoa = req.body
        try{
            const createNewPessoa = await database.Pessoas.create(newPessoa)
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
            const deletePessoa = await database.Pessoas.destroy({where: {id: Number(id)} })
            return res.status(200).json({menssage: 'deletado com sucesso'})
        }catch (error){
            return res.status(500).json(error.menssage)
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
            await database.Matriculas.update(atualizaMatricula, {where: {id: Number(matriculaId), estudante_id: Number(estudanteId)} })
            return res.status(200).json({menssage: 'sucesso'})
        }catch (error){
            return res.status(500).json(error.menssage)
        }
    }

    static async deleteMatricula(req, res){
        const { estudanteId, matriculaId } = req.params
        try{
            const deleteMatricula = await database.Matriculas.destroy({where: {id: Number(matriculaId)} })
            return res.status(200).json({menssage: 'deletado com sucesso'})
        }catch (error){
            return res.status(500).json(error.menssage)
        }   
    }

}


module.exports = PessoaController