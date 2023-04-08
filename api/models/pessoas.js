'use strict';
const {
  Model
} = require('sequelize');
const matriculas = require('./matriculas');
module.exports = (sequelize, DataTypes) => {
  class Pessoas extends Model {
    static associate(models) {
      Pessoas.hasMany(models.Turmas, {foreignKey: 'docente_id'})
      Pessoas.hasMany(models.Matriculas, {foreignKey: 'estudante_id', scope: { status: 'confirmado' }, as: 'aulasMatriculadas'})
    }
  }
  Pessoas.init({
    nome: {
      type:DataTypes.STRING,
      validate: {
        funcaoValidadora: function(dado){
          if(dado.length < 3) throw new Error ('O campo nome deve ter mais de 3 caracteres')
        }
      }
    },
    ativo: DataTypes.BOOLEAN,
    email: {
      type: DataTypes.STRING, 
      validate: {
        isEmail:{
          args: true,//validando se o email que está sendo enviado está correto.
          msg:"dados do tipo e-mail invalido"
        }
      }
    },
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Pessoas',
    paranoid:true,
    defaultScope: {
      where: {ativo: true} //vai retornar os cadastro que tem a coluna ativo como true 
    },
    scopes: {
      todos: {where : {}},
    }
  });
  return Pessoas;
};