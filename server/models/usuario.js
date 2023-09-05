const mongoose = require('mongoose');

const EschemaUsuario = new mongoose.Schema({
    nombre: { type: String, require: true },
    apellidos: { type: String, require: true },
    numero_celular: {type: String, require: true},
    tipo_usuario: {type: String, require: true},
    usuario: { type: String, require: false },
    clave: { type: String, require: false },
})

module.exports = mongoose.model('usuarios',EschemaUsuario)
