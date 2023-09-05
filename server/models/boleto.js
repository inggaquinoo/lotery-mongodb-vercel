const mongoose = require('mongoose');

const EschemaBoleto = new mongoose.Schema({
    usuario_id: { type: String, require: false },
    sorteo_id: { type: String, require: false },
    costo: { type: Number, require: true },
    terminos_condiciones: { type: String, require: true },
    fecha_compra: { type: Date, require: false },
    estado_boleto: { type: String, require: true }
})

module.exports = mongoose.model('boletos',EschemaBoleto)
