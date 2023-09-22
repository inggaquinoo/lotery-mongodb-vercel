const express = require('express')
const ModeloSorteo = require('../../server/models/file')
const ModeloBoleto = require('../../server/models/boleto')
const router = express.Router()

const mongoose = require('mongoose')
const schema = mongoose.Schema

////////////////////////////////////////////////////////
// comprobante.js ES EL ARCHIVO DE TODAS LAS RUTAS PARA 
// GENERAR NUEVO, EDITAR, ELIMINAR COMPROBANTE
////////////////////////////////////////////////////////
/*
const eschemacomprobante = new schema({
    serieprincipal: Number,
    seriesecundaria: Number

})

//al parecer 'comprobantes' es el nombre de la tabla
//eschemacomprobante es el modelo que se definió en eschemacomprobante

const ModeloComprobante = mongoose.model('comprobantes',eschemacomprobante)
*/
///////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////// R  U  T  A  S ////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////


//RUTA PARA CONSULTAR / LEER TODOS LOS SORTEOS
// /api/sorteos
router.get('/',(req, res) => {
    //en este caso "find()" es un método de Mongoose
    //y permite devolver todos los datos que tenemos
    //en esta collection
    ModeloSorteo.find()
        //sorteo puede ser cualquier nombre de variable
        .then(sorteo => {
            res.send(sorteo)
        })
        .catch(err => console.log(err))
});


//RUTA PARA CONSULTAR / LEER TODOS LOS BOLETOS
// /api/sorteos/boletos
router.get('/boletos',(req, res) => {
    //en este caso "find()" es un método de Mongoose
    //y permite devolver todos los datos que tenemos
    //en esta collection
    
    /*Funciona 01
    const resultado = ModeloBoleto.aggregate(
        [
            {
                $lookup:
                {
                    from: "sorteos",
                    localField: "sorteo_id",
                    foreignField: "_id",
                    as: "boletoSorteos"
                }
            },
            {$match : {estado_boleto: "0"}}
        ]
    )
    */

    const resultado = ModeloBoleto.aggregate(
        [
            {
                $lookup:
                {
                    from: "sorteos",
                    localField: "sorteo_id",
                    foreignField: "_id",
                    as: "boletoSorteos",
                }
            },
            {$match : {estado_boleto: "0"}}
            //{$match : {sorteo_id: "64dd5e361bb2aab7af059b15"}}
        ]
    )



    /* sí funciona 02
    const resultado = ModeloSorteo.aggregate(
        [
            {
                $lookup:
                {
                    from: "boletos",
                    localField: "_id",
                    foreignField: "sorteo_id",
                    as: "boletoSorteos"
                }
            },
            {$unwind: "$boletoSorteos"},
            {$match : {estado_sorteo: "0" }}
        ]
    )
    */

    /*Consulta 3, funciona ok pero no envia el parametro de ID de sorteo
    const resultado = ModeloSorteo.aggregate( [ //coleccion: sorteos
        {
            $match: { //Filtra solo los sorteos disponibles
                estado_sorteo: "0", //0 = Disponibles
            }
         },
        {
            $lookup:
              {
                from: "boletos", //coleccion: boletos
                let: { var_sorteo_id: "$_id" }, //_id de sorteos
                pipeline: [
                   { $match:
                      { $expr:
                         { $and:
                            [
                              { $eq: [ "$sorteo_id",  "$$var_sorteo_id" ] },
                              { $eq: [ "$estado_boleto",  "0" ]  }//Filtra solo los boletos disponibles
                            ]
                         }
                      }
                   },
                   //{ $project: { sorteo_id: 1, _id: 1 } },
                ],
                as: "boletosDisponibles"
              }
         }
     ] )
     */

        //resultado puede ser cualquier nombre de variable
        
        .then(resultado => {
            res.send(resultado)
        })
        .catch(err => console.log(err))
});


//RUTA PARA CREAR UN NUEVO REGISTRO
router.post('/', (req, res) => {
    
    const comprobante = new ModeloComprobante({
        serieprincipal: req.body.serieprincipal,
        seriesecundaria: req.body.seriesecundaria,
        terminoscondiciones: req.body.terminoscondiciones,
        fechacompra: req.body.fechacompra,
        estado: req.body.estado,
        usuario: "64da5753443896243eb7fe31",
        articulo: "64da5753443896243eb7fe37"
    });
    
/*
    const comprobante = new ModeloComprobante({
        serieprincipal: req.body.serieprincipal,
        usuario: req.body.usuario,
        articulo: req.body.articulo,
    });

*/

    comprobante.save() //Aquí sucede el guardar los datos en la BD Mongo
        //Si tiene éxito al guardar se ejecuta .then
        .then(result => {
            res.send({
                message: 'Comprobante data create successfully - Today 11/7/2023',
                data: result
                
            })
            console.log("Comprobante data create successfully - Today 11/7/2023");
            //este resultado se ve en la terminal del server (node.js)
        })
        //Si tiene ERROR al guardar se ejecuta .catch
        .catch(err => console.log("error aqui here here->",err))

});






module.exports = router