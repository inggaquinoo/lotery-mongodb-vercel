const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;
//const Mixed = mongoose.Schema.Types.Mixed;

const EschemaTalonario = new mongoose.Schema({
    sorteo_id: { type: ObjectId, require: true },
    empleado_id: { type: ObjectId, require: false },
    serie_talonario:  { type: Number, require: false },
    estado_talonario: { type: String, require: false }
},{versionKey:false})

module.exports = mongoose.model('talonarios',EschemaTalonario)

    //sorteo_id: { type: String, require: false },
    //sorteo_id: { type: ObjectId, require: false },