const {Router} = require('express')
const PessoaController = require('../controllers/PessoaController')

const router = Router()

router.get('/pessoas', PessoaController.getAllPessoas)
router.get('/pessoas/:id', PessoaController.getPessoas)
router.get('/pessoas/:estudanteId/matriculas/:matriculaId', PessoaController.getMatricula)
router.post('/pessoas', PessoaController.createPessoa)
router.post('/pessoas/:estudanteId/matriculas', PessoaController.createMatricula)
router.put('/pessoas/:id', PessoaController.updatePessoa)
router.put('/pessoas/:estudanteId/matriculas/:matriculaId', PessoaController.updateMatricula)
router.delete('/pessoas/:id', PessoaController.deletePessoa)
router.delete('/pessoas/:estudanteId/matriculas/:matriculaId', PessoaController.deleteMatricula)

module.exports = router