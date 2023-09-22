const mongoose = require('mongoose');

const EschemaCliente = new mongoose.Schema({
    nombre: { type: String, require: true },
    apellidos: { type: String, require: true },
    numero_celular: {type: String, require: true}
},{versionKey:false})

module.exports = mongoose.model('clientes',EschemaCliente)
