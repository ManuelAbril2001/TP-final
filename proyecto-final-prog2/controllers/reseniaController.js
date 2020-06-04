let db = require("../database/models")
let Op = db.sequelize.Op;
//const bcrypt = require('bcryptjs');
let moduloLogin = require('../moduloLogin')

module.exports = {
    index: function(req,res){
        db.usuarios.findAll({
            where: {
                id: req.params.id
            },
            include:{
                association:"resenias"
            }
        })

        .then(data => {
          
            
            return res.render('resenias', {
                usuario: data[0]
            })

            })

        
    },
    crear: (req,res) =>{

            moduloLogin.validar(req.body.email, req.body.contrasenia)
        
            .then(resultado => {

                if(resultado != null) {
                    db.resenias.create({
                    texto_resenia: req.body.texto_resenia,
                    puntaje: req.body.puntaje,
                    id_usuario: resultado.id,
                    id_pelicula: req.params.idPelicula
            
                    })
                    .then(function(index){
                        return res.redirect('/peliculas?id='+ req.params.idPelicula)
                    })
                    .catch(function(error){
                        return res.send(error);

                        
                        
                    })
                    

                 }   
                        else {
                            res.send('error');
            }
        })
    },

    detallesUsuario: function(req,res){
        db.usuarios.findByPk(req.params.id)
        .then(function(usuarios){
            db.resenias.findAll({
                where: [{
                    id: req.params.id
                }]
            })
            .then(function(resultados){
                res.render('detallesUsuario',{
                    usuarios: usuarios,
                })
            })
        })
    },

    editar: function(req, res){
        let pedidoResenia = db.resenias.findByPK(req.params.id);

        Promise.all([pedidoResenia])
           .then(function(resenia){
               res.render('editarResenia', {resenia:resenia});

           })
    },

   actualizar: function(req,res){
    db.resenias.update({
        texto_resenia: req.body.texto_resenia,
        puntaje: req.body.puntaje,
        id_pelicula: req.query.id
   }, {
       where: {
           id: req.params.id
       }
   });

    res.redirect('/peliculas/' + req.params.id);
},

borrar: function(req,res){
    db.resenias.destroy({
        where: {
            id: req.params.id
        }
    })
        res.redirect('/peliculas');
    
}

     
}