const PessoasServices = require("./PessoasServices")
const TurmasServices = require("./TurmasServices")
const NiveisServices = require("./NiveisServices")
const MatriculasServices= require ("./MatriculasServices")

//end-point - vai receber as chamadas dos controladores e distribuir nos arquivos services
module.exports = {
    PessoasServices: PessoasServices,
    TurmasServices: TurmasServices,
    NiveisServices: NiveisServices,
    MatriculasServices: MatriculasServices
}