module.exports= function(sequelize, dataTypes) {


    let alias= "Usuarios";

    
    let cols = {

        id: {
            type: dataTypes.int,
            primaryKey: true,
            autoIncrement: true,

        },

       usuario: {
            type: dataTypes.varchar
       },

       Email: {
            type: dataTypes.varchar
       },

       contrasenia: {
            type: dataTypes.varchar

       },

       Fecha_de_Nacimiento:{

        type: dataTypes.timestamps
       }
    
    }
}

let config = {
            tableName: "usuarios",
            timestamps: true
    }

 let Usuarios = sequelize.define(alias,cols, config);

 Usuarios.associate = function(models){
    Usuarios.hasMany(models.resenias, {

        as: 'resenias',
        foreignKey: 'id_usuario'

    });

    return Usuarios;
}







