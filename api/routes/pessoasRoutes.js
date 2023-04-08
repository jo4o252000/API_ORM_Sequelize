const {Router} = require('express')
const PessoaController = require('../controllers/PessoaController')

const router = Router()

router.get('/pessoas', PessoaController.getAllPessoas)
router.get('/pessoas/ativas', PessoaController.getAllPessoasAtivas)
router.get('/pessoas/:id', PessoaController.getPessoa)
router.get('/pessoas/:estudanteId/matriculas/:matriculaId', PessoaController.getMatricula)
router.get('/pessoas/:estudanteId/matricula', PessoaController.getMatriculasInEstudante)
router.get('/pessoas/matricula/:turmaId/confirmadas', PessoaController.getMatriculasPorTurma )
router.get('/pessoas/matriculas/lotada', PessoaController.getTurmasLotadas)
router.post('/pessoas', PessoaController.createPessoa)
router.post('/pessoas/:estudanteId/matriculas', PessoaController.createMatricula)
router.post('/pessoas/:estudanteId/cancela', PessoaController.cancelaEstudante)
router.put('/pessoas/:id', PessoaController.updatePessoa)
router.put('/pessoas/:estudanteId/matriculas/:matriculaId', PessoaController.updateMatricula)
router.delete('/pessoas/:id', PessoaController.deletePessoa)
router.delete('/pessoas/:estudanteId/matriculas/:matriculaId', PessoaController.deleteMatricula)
router.post('/pessoas/:id/restaura', PessoaController.restaurarPessoa)

module.exports = router