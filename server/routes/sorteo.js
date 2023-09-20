const express = require('express')
const ModeloSorteo = require('../models/file')
const ModeloBoleto = require('../models/boleto')
const ModeloCliente = require('../models/cliente')
const ModeloEmpleado = require('../models/empleado')
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
    //ModeloSorteo.find() //esto ya no se usaría

    const resultado = ModeloSorteo.aggregate(
        [
            {
                $match: { //Filtra solo los sorteos disponibles
                    estado_sorteo: "0", //0 = Disponibles
                }
            }
        ]
    )
        //resultado puede ser cualquier nombre de variable
        .then(resultado => {
            res.send(resultado)
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
            {$unwind: "$boletoSorteos"},
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
    const resultado = ModeloSorteo.aggregate( //coleccion: sorteos
    [ 
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


//RUTA PARA CREAR TODOS LOS BOLETOS DE UN SORTEO
// /api/sorteos/crearboletos
//router.post('/crearboletos', (req, res) => { //ruta antigua
router.put('crearboletos/:id', (req, res) => {
//res.end('ESTAS EN RUTA PARA CREAR VARIOS BOLETOS DE Lotery - GET/POST - INSERTAR BOLETOS MASIVO')
res.end('ESTAS EN LA RUTA PARA CREAR LOS BOLETOS')
//borrarcoleecionboletos()
crearboletos();


   async function crearboletos() {
        //try {
            
            var cantidad = req.params.id;

            /*
            var localsorteoid = req.body.sorteoid;
            var localcosto = req.body.costo;
            var localterminosycondiciones = req.body.terminosycondiciones;
            */
            var localsorteoid = "64dd5e361bb2aab7af059b15";
            var localcosto = 3;
            var localterminosycondiciones = "terminosycondiciones";
        
                    for (var i=0; i < cantidad; i++)
                    {
                        ModeloBoleto.collection.insertMany([
                                {
                                    cliente_id: " ",
                                    empleado_id: " ",
                                    sorteo_id: localsorteoid,
                                    costo: localcosto,
                                    terminos_condiciones: localterminosycondiciones,
                                    fecha_compra: " ",
                                    estado_boleto: " ",
                                }
                            ])
                    }//fin del for

                    res.end('BOLETOS INSERTADOS SATISFACTORIAMENTE')
                    await console.log(cantidad+' boletos creados satisfactoriamente');
         //           console.log(BulkWriteResult.insertedCount)
         //           } catch (error) {
         //           console.log("Error al insertar boletos, el error es ->>  "+error);
         //           }
            }//Fin de la funcion crearboletos

          /*
   function borrarcoleecionboletos(){
         ModeloBoleto.collection.drop();
       }
        */

       //////////NOTA 
       //EVALUA EL COMPORTAMIENTO CON POSTMAN Y MAS IMPORTANTE CON EL APP
       //AL PARECER DEMORA EN GRABAR EN LA BASE DE DATOS
       //MUY BIEN!!!
        
});




//RUTA PARA CREAR UN NUEVO CLIENTE
// /api/sorteos
router.post('/cliente', (req, res) => {
    
    const cliente = new ModeloCliente({
        nombre: req.body.nombre,
        apellidos: req.body.apellidos,
        numero_celular: req.body.numero_celular,
    });

/*
    const comprobante = new ModeloComprobante({
        serieprincipal: req.body.serieprincipal,
        usuario: req.body.usuario,
        articulo: req.body.articulo,
    });

*/

    cliente.save() //Aquí sucede el guardar los datos en la BD Mongo
        //Si tiene éxito al guardar se ejecuta .then
        .then(result => {
            res.send({
                message: 'Cliente create successfully - Today September 2023',
                data: result
                
            })
            console.log("Console --- Cliente create successfully - Today September 2023");
            //este resultado se ve en la terminal del server (node.js)
        })
        //Si tiene ERROR al guardar se ejecuta .catch
        .catch(err => console.log("error aqui here here->",err))

});


//RUTA PARA CREAR UN NUEVO EMPLEADO
// /api/sorteos
router.post('/', (req, res) => {
    
    const empleado = new ModeloEmpleado({
        nombre: req.body.nombre,
        apellidos: req.body.apellidos,
        numero_celular: req.body.numero_celular,
        tipo_usuario: req.body.tipo_usuario,
        usuario: req.body.usuario,
        clave: req.body.clave,
        estado_empleado: req.body.clave,
    });


/*
    const comprobante = new ModeloComprobante({
        serieprincipal: req.body.serieprincipal,
        usuario: req.body.usuario,
        articulo: req.body.articulo,
    });

*/

  empleado.save() //Aquí sucede el guardar los datos en la BD Mongo
        //Si tiene éxito al guardar se ejecuta .then
        .then(result => {
            res.send({
                message: 'Employee create successfully - Today September 2023',
                data: result
                
            })
            console.log("Console --- Employee create successfully - Today September 2023");
            //este resultado se ve en la terminal del server (node.js)
        })
        //Si tiene ERROR al guardar se ejecuta .catch
        .catch(err => console.log("error aqui here here->",err))

});


//RUTA PARA ENCONTRAR UN ELEMENTO Y EDITARLO, POR EL ID
// /api/sorteos/:id
router.put('/:id', (req, res) => {
    
    const boletoID = req.params.id;
    console.log("req.params.id ->    " + req.params.id)
    //boletoID = "64e386441bb2aab7af059b74"
    
    ModeloBoleto.findById(boletoID)
        .then(boleto => {

            //Solo necesito actualizar estos campos:
            boleto.cliente_id = req.body.cliente_id;
            boleto.empleado_id = req.body.empleado_id;
            boleto.fecha_compra = req.body.fecha_compra;
            boleto.estado_boleto = req.body.estado_boleto;

            return boleto.save();
        })
        .then(result => {
            res.send(result);
        })
        .catch(err => console.log(err))
});



module.exports = router