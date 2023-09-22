const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;
const Mixed = mongoose.Schema.Types.Mixed;

const EschemaBoleto = new mongoose.Schema({
    cliente_id: { type: String, require: false },
    empleado_id: { type: String, require: false },
    sorteo_id: { type: ObjectId, require: false },
    costo: { type: Number, require: true },
    terminos_condiciones: { type: String, require: true },
    fecha_compra: { type: Date, require: false },
    estado_boleto: { type: String, require: true }
})

module.exports = mongoose.model('boletos',EschemaBoleto)

    //sorteo_id: { type: String, require: false },
