const mongoose = require('mongoose');

//Se crea el esquema que viene a ser 
//como los campos de la tabla pero sin el nombre (en bd relacional)
/*
const HouseSchema = new mongoose.Schema({
    title: {type: String, require: true},
    address: {type: String, require: true},
    homeType: String,
    description: String,
    price: {type: Number, require: true},
    image: String,
    yearBuilt: Number
})
*/

/*
const EschemaComprobante = new mongoose.Schema({
    serieprincipal: Number,
    seriesecundaria: Number,
    terminoscondiciones: String,
    fechacompra: Number,
    estado: Number,
    idarticulo: mongoose.ObjectId,
    idusuario: { 
        type: ObjectId,
        required: true
   }
    
})

*/

/*
const EschemaComprobante = new mongoose.Schema({
    serieprincipal: { type: String, require: true },
    seriesecundaria: { type: Number, require: true },
    terminoscondiciones: { type: String, require: true },
    fechacompra: { type: Number, require: true },
    estado: { type: Number, require: true },
    usuario: { type: mongoose.ObjectId, require: true },
    articulo: { type: mongoose.ObjectId, require: true }
})
*/
////ESQUEMA DE LA COLEECTION SORTEO

const EschemaSorteo = new mongoose.Schema({
    fecha_sorteo: { type: Date, require: true },
    lugar: { type: String, require: true },
    estado_sorteo: {type: String, require: true},
    descripcion_articulos: {type: String, require: true},
    terminos_condiciones: { type: String, require: true },
},{versionKey:false})
//articulo: { type: Array, require: true },

/*

const EschemaBoleto = new mongoose.Schema({
    usuario_id: { type: String, require: false },
    sorteo_id: { type: String, require: false },
    articulo: {type: Array, require: false},
    costo: { type: Number, require: true },
    terminos_condiciones: { type: String, require: true },
    fecha_compra: { type: Date, require: true },
    estado: { type: String, require: true }
})

*/
/*
const EschemaComprobante = new mongoose.Schema({
    serieprincipal: { type: String, require: true },
    usuario: { type: mongoose.ObjectId, require: true },
    articulo: { type: mongoose.ObjectId, require: true }
})
*/

//collection = nombre de la tabla 
//comprobantes es la collection -> Recuerda que MongoDB lo pone en plural y minusculas osea "comprobantes"
//eschemacomprobante es el Schema


//module.exports = mongoose.model('boletos',EschemaBoleto)

module.exports = mongoose.model('sorteos',EschemaSorteo)
