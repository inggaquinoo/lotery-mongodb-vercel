const mongoose = require('mongoose');

const EschemaEmpleado = new mongoose.Schema({
    nombre: { type: String, require: false },
    apellidos: { type: String, require: false },
    numero_celular: {type: String, require: false},
    tipo_usuario: {type: String, require: true},
    usuario: { type: String, require: false },
    clave: { type: String, require: false },
    estado_empleado: { type: String, require: false }
},{versionKey:false})

module.exports = mongoose.model('empleados',EschemaEmpleado)
