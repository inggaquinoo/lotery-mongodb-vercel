const express = require('express')
const ModeloSorteo = require('../../server/models/file')
const ModeloBoleto = require('../../server/models/boleto')
const ModeloCliente = require('../../server/models/cliente')
const ModeloEmpleado = require('../../server/models/empleado')
const ModeloTalonario = require('../../server/models/talonario')
const router = express.Router()

const mongoose = require('mongoose')
const { json } = require('body-parser')
var ObjectId = mongoose.Types.ObjectId //Permite generar el tipo de dato ObjectId para que se inserte en la BD

////////////////////////////////////////////////////////
// sorteo.js ES EL ARCHIVO DE TODAS LAS RUTAS PARA 
// GENERAR NUEVO, EDITAR, ELIMINAR COMPROBANTE
////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////// R  U  T  A  S /////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////


///NOTASSSSS
////////PARA ESTA RUTA EN EL FRONT END DEBERÍA HABER UNA PANTALLA
////////EN LA CUAL SE PERMITA ELEGIR AL VENDEDOR PARA POSTERIORMENTE
////////ASIGNAR LA SERIE DE TALONARIO QUE VENDERÁ
////POR LO GENERAL CUANDO LOS TALONARIOS SON CREADOS CON CREADOS 
/////CON EL CAMPO EMPLEADO_ID VACÍO PORQUE AUN NO SABES QUIEN LOS VA A VENDER
/////YA LUEGO DEBE DE HACERSE UNA PANTALLA EN EL FRONT END EL CUAL PERMITA
//////ASIGNAR UN VENDEDOR A UN TALONARIO

/////ADICIONAL:  LAS PANTALLAS INCIALES TAMBIEN DEBEN DE MODIFICARSE
////PORQUE CUANDO EL VENDEDOR SE LOGUEE DEBE DE ABRIR SOLO LOS BOLETOS QUE
////QUE LE HAN SIDO PREASIGNADOS

////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////----CREACIÓN------/////////////////////////////////////////////

//RUTA PARA CREAR UN NUEVO SORTEO
// /api/sorteos/cliente
router.post('/crearsorteo', (req, res) => {
    var fecha_sorteo = new Date(req.body.fecha_sorteoFrEnd);
    const sorteo = new ModeloSorteo({
        fecha_sorteo: fecha_sorteo,
        lugar: req.body.lugarFrEnd ,
        estado_sorteo: "0",
        descripcion_articulos: req.body.descripcion_articulosFrEnd,
        terminos_condiciones: req.body.terminos_condicionesFrEnd,
    });

    sorteo.save() //Aquí sucede el guardar los datos en la BD Mongo
        //Si tiene éxito al guardar se ejecuta .then
        .then(result => {
            res.send({ //con PUT no regresa ninguna respuesta, mejor usa res.end(), 
                        //cuidado res.end y res.send no pueden estar en el mismo
                        //bloque de codigo o juntos
                message: 'Sorteo create successfully - Today September 2023',
                data: result
            })
            console.log("Console --- Sorteo create successfully - Today September 2023");
            //este resultado se ve en la terminal del server (node.js)
        })
        //Si tiene ERROR al guardar se ejecuta .catch
        .catch(err => console.log("error aqui here here->",err))
});


//router.put('/creartalonarios/:id', (req, res) => {
router.put('/creartalonarios/:id_sorteo,:cantvendedores', (req, res) => { //:id, en este caso 'id' es lo que llega y para obtener el dato
        //colocas req.params.id. 'id' puede ser cualquier letra(s)
        //los ':' dos puntos siempre van adelante de las letras

        const sorteoID = req.params.id_sorteo;
        const cantidadvendedores = req.params.cantvendedores;
        
        console.log("sorteoID ->   "+sorteoID);
        console.log("Cantidad de Vendedores ->   "+cantidadvendedores);

            for (var i=0; i < cantidadvendedores; i++)
                    {
                        ModeloTalonario.collection.insertMany([
                            {
                                sorteo_id: new ObjectId(sorteoID),
                                empleado_id: "",
                                serie_talonario: i,
                                estado_talonario: "0",
                                }
                            ])
                }//fin del for
//IMPORTANTÍSIMO: siempre que uses PUT y POST debes devolver una respuesta. 
//Prueba tambien con GET.
//con PUT no regresa ninguna respuesta, mejor usa res.end(), 
//cuidado res.end y res.send no pueden estar en el mismo
//bloque de codigo ó juntos. 
//res.send tiene su forma para retornar el dato, así: 
//res.send({message: 'Hola'})
                res.send({ 
                messageconfirmacion: 'Talonarios creados satisfactoriamente',
                })
});


//RUTA PARA GENERAR TODOS LOS BOLETOS DE UN SORTEO
//router.put('/crearboletos/:cantidad_boletos,:cantidad_vendedores', (req, res) => {
router.put('/crearboletos/:cantidad_boletos,:costoFrEnd', (req, res) => { //:id, en este caso 'id' es lo que llega y para obtener el dato
        //colocas req.params.id. 'id' puede ser cualquier letra(s)
        //los ':' dos puntos siempre van adelante de las letras
        console.log("req.params.cantidad_boletos ->    " + req.params.cantidad_boletos)
        console.log("req.params.costoFrEnd ->    " + req.params.costoFrEnd)

        var dataidtalonarios = [];
        dataidtalonarios = req.body.matrizIdTodosTAlonarios; //por aqui colocas desde el frontend el array de id de empleados (desde el body: JSON.stringify)
        var cantidadIDsTalonarios = dataidtalonarios.length;
        const cantidadboletosXtalonario = req.params.cantidad_boletos / dataidtalonarios.length

        console.log("Cantidad de boletos por talonario ->   "+cantidadboletosXtalonario);
        
        crearboletos();
        function crearboletos() {
            var localcosto = req.params.costoFrEnd;

            for (var i=0; i < cantidadIDsTalonarios; i++)
                {
                for (var j=0; j < cantidadboletosXtalonario; j++)
                    {
                        if(j <= 9)
                        {
                            //Aqui entra para que el orden sera 00,01,02...hasta 09
                            j = '0' + j;
                            ModeloBoleto.collection.insertMany([
                                {
                                    cliente_id: "",
                                    talonario_id: new ObjectId(dataidtalonarios[i]),
                                    numero_boleto: j,
                                    costo: localcosto,
                                    fecha_compra: "",
                                    estado_boleto: "0",
                                }
                            ])
                        }
                        else
                        {
                            //Aqui sigue 10,11,12...hasta el último
                            ModeloBoleto.collection.insertMany([
                                {
                                    cliente_id: "",
                                    talonario_id: new ObjectId(dataidtalonarios[i]),
                                    numero_boleto: j,
                                    costo: localcosto,
                                    fecha_compra: "",
                                    estado_boleto: "0",
                                }
                            ])
                        }
                    }//fin dle for j
                }//fin del for i
        }//Fin de la funcion crearboletos

        //IMPORTANTÍSIMO: siempre que uses PUT y POST debes devolver una respuesta. 
        //Prueba tambien con GET.
        //con PUT no regresa ninguna respuesta, mejor usa res.end(), 
        //cuidado res.end y res.send no pueden estar en el mismo
        //bloque de codigo ó juntos. 
        //res.send tiene su forma para retornar el dato, así: 
        //res.send({message: 'Hola'})
        res.send({ 
        messageconfirmacion: 'Boletos creados satisfactoriamente',
        })
        console.log("BOLETOS CREADOS SATISFACTORIAMENTE EN EL BACKEND");
});

//RUTA PARA CREAR UN NUEVO CLIENTE
// /api/sorteos/cliente
router.post('/cliente', (req, res) => {
    const cliente = new ModeloCliente({
        nombre: req.body.nombre,
        apellidos: req.body.apellidos,
        numero_celular: req.body.numero_celular,
    });

    cliente.save() //Aquí sucede el guardar los datos en la BD Mongo
        //Si tiene éxito al guardar se ejecuta .then
        .then(result => {
            res.send({ //con PUT no regresa ninguna respuesta, mejor usa res.end(), 
                        //cuidado res.end y res.send no pueden estar en el mismo
                        //bloque de codigo o juntos
                message: 'Cliente create successfully',
                data: result
                
            })
            console.log("Cliente create successfully");
            //este resultado se ve en la terminal del server (node.js)
        })
        //Si tiene ERROR al guardar se ejecuta .catch
        .catch(err => console.log("error aqui here here->",err))

});


//RUTA PARA CREAR UN VENDEDOR
// /api/sorteos/crearvendedor
router.post('/crearvendedor', (req, res) => { 

const vendedor = new ModeloEmpleado({
    nombre: req.body.nombre,
    apellidos: req.body.apellidos,
    numero_celular: req.body.celular,
    tipo_usuario: "vendedor",
    usuario: req.body.usuario,
    clave: req.body.clave,
    estado_empleado: "0" //0 = Disponible  1=No Disponible (para cuando quieras que no ingrese al sistema)
    });

vendedor.save() //Aquí sucede el guardar los datos en la BD Mongo
    //Si tiene éxito al guardar se ejecuta .then
    .then(result => {
        res.send({ //con PUT no regresa ninguna respuesta, mejor usa res.end(), 
                    //cuidado res.end y res.send no pueden estar en el mismo
                    //bloque de codigo o juntos
            message: 'Vendedor create successfully',
            data: result
            
        })
        console.log("Vendedor create successfully");
        //este resultado se ve en la terminal del server (node.js)
    })
    //Si tiene ERROR al guardar se ejecuta .catch
    .catch(err => console.log("error aqui here here->",err))

});



/*
//RUTA PARA CREAR UN TODOS LOS EMPLEADOS(VENDEDORES) DE UN SORTEO
// /api/sorteos/crearempleados/:id_cantidadvendedores
router.put('/crearvendedores/:id_cantidadvendedores', (req, res) => { //:id, en este caso 'id' es lo que llega y para obtener el dato
        //colocas req.params.id. 'id' puede ser cualquier letra(s)
        //los ':' dos puntos siempre van adelante de las letras
        const cantvendedores = req.params.id_cantidadvendedores;
        crearvendedores();
            function crearvendedores() {
                console.log("cantvendedores   "+cantvendedores)
                        for (var i=1; i <=cantvendedores; i++)
                        {
                                ModeloEmpleado.collection.insertMany([
                                {
                                    nombre: "",
                                    apellidos: "",
                                    numero_celular: "",
                                    tipo_usuario: "vendedor",
                                    usuario: "",
                                    clave: "",
                                    estado_empleado: "0",
                                }
                                ])
                        }//fin del for
            }//Fin de la funcion crearvendedores
            //IMPORTANTÍSIMO: siempre que uses PUT y POST debes devolver una respuesta. 
        //Prueba tambien con GET.
        //con PUT no regresa ninguna respuesta, mejor usa res.end(), 
        //cuidado res.end y res.send no pueden estar en el mismo
        //bloque de codigo ó juntos. 
        //res.send tiene su forma para retornar el dato, así: 
        //res.send({message: 'Hola'})
        res.send({ 
        messageconfirmacion: 'Vendedores creados satisfactoriamente',
        })
});
*/

//RUTA PARA ASIGNAR EL NUMERO DE SERIE A UN VENDEDOR
// /api/sorteos/asignartalonariovendedor/:id_sorteo,/:serie_talonario
//router.put('/crearboletos/:cantidad_boletos,:costoFrEnd', (req, res) => { //:id, en este caso 'id' es lo que 
router.put('/asignartalonariovendedor/:id_sorteo,:serie_talonario,:idnuevovendedor',(req, res) => {
    //const id_sorteoBkEnd = req.params.id_sorteo;
    var serie_talonarioBkEnd = Number(req.params.serie_talonario); //En la base de datos es integer
    //console.log("serie_talonarioBkEnd  "+ typeof serie_talonarioBkEnd);
        
    var arrayrecepcion = [];
    arrayrecepcion = req.params.id_sorteo //en este caso req.params.id_vendedor es un array de 26 elementos
    var cadenaIDSorteo = "" //para que genere la cadena unificada de 24 caracteres para que pueda ser usada
                            //dentro aquí: {empleado_id: new ObjectId(cadenaIDVendedor)},

    for (var i=1; i < arrayrecepcion.length; i++)//para que no tome las comillas de inicio y fin
        {
            cadenaIDSorteo = cadenaIDSorteo + arrayrecepcion[i]
        }
        
        const resultado = ModeloTalonario.aggregate([
            {$match: 
                {"$and": 
                    [
                        //FILTROS
                        {sorteo_id: new ObjectId(cadenaIDSorteo)},
                        {serie_talonario: serie_talonarioBkEnd},
                        {estado_talonario: "0"}                        
                    ]}},
            //{$group: {_id: "$_id"}} //$_id es el _id de talonario de la coleccion talonarios
            //En este caso no se usa group porque necesitamos mas de 1 valor
            
        ])
        .then(resultado => { //RESULTADO SIEMPRE ES TIPO JSON, ENTONCES CON JSON.STRINGIFY() LO CONVIERTES A JAVASCRIPT
                             //RESULTADO ES UN ARRAY, EL CUAL PUEDES RECORRER ASI: resultado[0]._id ó resultado[0].nombre, etc...  
            console.log("resultado TODO ->    "+JSON.stringify(resultado));
            console.log("resultado ->    "+JSON.stringify(resultado[0]._id));//ID del talonario
            console.log("resultado ->    "+JSON.stringify(resultado[0].serie_talonario));
                    
            //A partir de aqui empieza a buscar el talonario para insertar el ID del vendedor y actualizar el estado
                ModeloTalonario.findById(resultado[0]._id)//Buscar por ID del talonario
                    //ModeloTalonario.findById(JSON.stringify(resultado[0]._id))//Encuentra el el talonario por su IDTalonario
                    .then(talonario => {
                        //Solo necesito actualizar estos campos:
                        talonario.empleado_id = new ObjectId(req.params.idnuevovendedor);
                        talonario.estado_talonario = "1";
                        
                        talonario.save();
                            res.send({ 
                                messageresultado: "Asignación exitosa"
                            })
                    })
                    .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
});



///////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////----LECTURA------/////////////////////////////////////////////////

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

//RUTA PARA CONSULTAR / LEER TODOS LOS TALONARIOS
// /api/sorteos/leertalonarios
router.put('/leertalonarios/:id_sorteo',(req, res) => {
    const sorteoID = req.params.id_sorteo;
    
    const resultado = ModeloTalonario.aggregate(
        [
            {
                $lookup:
                {
                    from: "sorteos",
                    localField: "sorteo_id",
                    foreignField: "_id",
                    as: "talonarioSorteos",
                }
            },
            {$unwind: "$talonarioSorteos"},
            {$match : {estado_talonario: "0"}},
            {$match : {sorteo_id: new ObjectId(sorteoID)}} //tiene que enviar el ID del sorteo, usa PUT
        ]
    )
        .then(resultado => {
            //Creamos una array para almacenar solo los id de los talonarios que pertenecen 
            //a un determinado sorteo
            arraystodostalonarios = [];
            arraysserie_talonarios = [];
            for (var i=0; i < resultado.length; i++)
                {
                    arraystodostalonarios.push(resultado[i]._id);
                    arraysserie_talonarios.push(resultado[i].serie_talonario);
                }
            //console.log("MATRIZ FINAL ->    "+arraystodostalonarios)
            res.send({ 
                    arrayIDtodostalonarios: arraystodostalonarios, // arraystodostalonarios, este array contiene todos los id de los talonarios
                    arraySerieDisponibletalonarios: arraysserie_talonarios
                })
        })
        .catch(err => console.log(err))
});

//RUTA PARA CONSULTAR / LEER TODOS LOS BOLETOS
// /api/sorteos/buscarboletos
router.put('/buscarboletos/:id_talonario',(req, res) => {
    //const IdTalonario = req.params.id_talonario;
    var arrayrecepcion = []
    arrayrecepcion = req.params.id_talonario //en este caso req.params.id_talonario es un array de 26 elementos
    var cadenaIDTalonario = "" //para que genere la cadena unificada de 24 caracteres para que pueda ser usada
                            //dentro aquí: {talonario_id: new ObjectId(cadenaIDTalonario)},

    for (var i=1; i < arrayrecepcion.length - 1; i++)//para que no tome las comillas de inicio y fin
        {
            cadenaIDTalonario = cadenaIDTalonario + arrayrecepcion[i]
        }
    
    console.log("cadenaIDTalonario   "+cadenaIDTalonario)
    
    const resultado = ModeloBoleto.aggregate([
        {$match: 
            {"$and": 
                [
                    //FILTROS
                    {talonario_id: new ObjectId(cadenaIDTalonario)},
                    {estado_boleto: "0"}                        
                ]}},
        //{$group: {_id: "$_id"}} //$_id es el _id del boleto de la coleccion boletos
        //{$group: {numero_boleto: "$numero_boleto"}} //$_id es el _id del boleto de la coleccion boletos
        ///NO AGRUPAMOS PORQUE NECESITAMOS VER OTRO CAMPO, EN ESTE CASO: numero_boleto
        {$sort:{numero_boleto: 1}} //Ordenamos porque los boletos salían desordenados
                                          //{ $sort : { numero_boleto : 1 } } -> 1 = ASCENDENTE
                                          //{ $sort : { numero_boleto : -11 } } -> -1 = DESCENDENTE
        
    ])
        //resultado puede ser cualquier nombre de variable
            .then(resultado => {
                res.send({ 
                        arrayNumerosBoletos: resultado, // arraystodosboletos, este array contiene todos los numeros de los boletos
                    })
        })
        .catch(err => console.log(err))
});


//RUTA PARA CONTAR TODOS LOS BOLETOS - CAMBIAR DE NOMBRE A LA RUTA
// /api/sorteos/consultarboletos
router.get('/consultarboletos',(req, res) => {
    contarboletos();
        async function contarboletos() {
                try {
                  const totalboletos = await ModeloBoleto.collection.estimatedDocumentCount();
                  //const estimateB = await ModeloBoleto.collection.countDocuments(); //esta funciona
                  //console.log(`Total documentos en la coleccion "boletos": ${totalboletos}`);
                  //console.log(`Estimated number of documents in the boletos collection 'countDocuments': ${estimateB}`);
                  // Query for movies from Canada.
                        //const query = { countries: "Canada" };
                  // Find the number of documents that match the specified
                  // query, (i.e. with "Canada" as a value in the "countries" field)
                  // and print out the count.
                        //const countCanada = await movies.countDocuments(query);
                        //console.log(`Number of movies from Canada: ${countCanada}`);
                        //Este bloque de código es para enviar un msje de vuelta con messagetotalboleinsertados: totalboletos,
                        ModeloBoleto.collection.estimatedDocumentCount()
                        .then(result => {
                            res.send({ //con PUT no regresa ninguna respuesta, mejor usa res.end(), 
                                        //cuidado res.end y res.send no pueden estar en el mismo
                                        //bloque de codigo o juntos
                                messagetotalboleinsertados: totalboletos,
                                //data: result
                            })
                        })
                        .catch(err => console.log("Error es: ",err))
                        
                } catch (error) {
                    console.log("Error al contar todos los boletos, el error es ->>  "+error);
                } 
            }
});

//RUTA PARA LEER EL ID DEL VENDEDOR QUE INICIO SESION
// /api/sorteos/buscaridvendedor/:usuario,:clave
router.put('/accesosistema/:usuario,:clave',(req, res) => {
    const userBkEnd = req.params.usuario;
    const claveBkEnd = req.params.clave;

    console.log("userBkEnd  "+userBkEnd);
    console.log("claveBkEnd  "+claveBkEnd);

    const resultado = ModeloEmpleado.aggregate([
        {$match: 
            {"$and": 
                [
                    //FILTROS
                    {estado_empleado: "0"},
                    {tipo_usuario: "vendedor"},
                    {usuario: userBkEnd},
                    {clave: claveBkEnd}
                ]}},
        //{$group: {_id: "$_id"}} //$_id es el _id de empleado de la coleccion empleados
        //No usamos group porque necesitamos varios datos del vendedor
        
    ])
    .then(resultado => { //RESULTADO SIEMPRE ES TIPO JSON, ENTONCES CON JSON.STRINGIFY() LO CONVIERTES A JAVASCRIPT
                         //RESULTADO ES UN ARRAY, EL CUAL PUEDES RECORRER ASI: resultado[0]._id ó resultado[0].nombre, etc...  
        res.send({ 
                messageresultadoacceso: JSON.stringify(resultado[0]._id), //Envia el id del empleado al front end
            })
    })
    .catch(resultado => {
            res.send({ 
            messageresultadoaccesodenegado: "DENEGADO" //Cuando dejan los campos vacíos o no encuentra el empleado
            })
        })
});


//RUTA PARA LEER EL ID DEL VENDEDOR QUE INICIO SESION
// /api/sorteos/buscaridvendedor/:usuario,:clave
router.put('/buscaridvendedor/:usuario,:clave',(req, res) => {
    const userBkEnd = req.params.usuario;
    const claveBkEnd = req.params.clave;

    console.log("userBkEnd  "+userBkEnd);
    console.log("claveBkEnd  "+claveBkEnd);

    const resultado = ModeloEmpleado.aggregate([
                {$match: 
                    {"$and": 
                        [
                            //FILTROS
                            {estado_empleado: "0"},
                            {tipo_usuario: "vendedor"},
                            {usuario: userBkEnd},
                            {clave: claveBkEnd},
                        ]}},
                //{$group: {_id: "$_id"}} //$_id es el _id de empleado de la coleccion empleados
                //No usamos group porque necesitamos varios datos del vendedor
                
            ])
            .then(resultado => { //RESULTADO SIEMPRE ES TIPO JSON, ENTONCES CON JSON.STRINGIFY() LO CONVIERTES A JAVASCRIPT
                                 //RESULTADO ES UN ARRAY, EL CUAL PUEDES RECORRER ASI: resultado[0]._id ó resultado[0].nombre, etc...  
                //console.log("resultado ->    "+JSON.stringify(resultado[0]._id));
                res.send({ 
                        messageresultado_id: JSON.stringify(resultado[0]._id), //Envia el id del empleado al front end
                        //messageresultado_nombre: JSON.stringify(resultado[0].nombre), //Envia el nombre del empleado al front end
                        messageresultado_nombre: resultado[0].nombre, //No va de esta forma JSON.stringify(resultado[0].nombre)
                                                                      //porque sino sale entre comillas
                        messageresultado_apellidos: resultado[0].apellidos //No va de esta forma JSON.stringify(resultado[0].nombre)
                                                                            //porque sino sale entre comillas
                    })
            })
            .catch(err => console.log(err))
});

//RUTA PARA LEER EL ID DEL TALONARIO QUE PERTENECE AL VENDEDOR QUE INICIO SESION
// /api/sorteos/buscaridtalonario/:usuario,:clave
router.put('/buscaridtalonario/:id_sorteo,:id_vendedor',(req, res) => {
    const id_sorteoBkEnd = req.params.id_sorteo;

    var arrayrecepcion = []
    arrayrecepcion = req.params.id_vendedor //en este caso req.params.id_vendedor es un array de 26 elementos
    var cadenaIDVendedor = "" //para que genere la cadena unificada de 24 caracteres para que pueda ser usada
                            //dentro aquí: {empleado_id: new ObjectId(cadenaIDVendedor)},

    for (var i=1; i < arrayrecepcion.length - 1; i++)//para que no tome las comillas de inicio y fin
        {
            cadenaIDVendedor = cadenaIDVendedor + arrayrecepcion[i]
        }
        
        const resultado = ModeloTalonario.aggregate([
            {$match: 
                {"$and": 
                    [
                        //FILTROS
                        {sorteo_id: new ObjectId(id_sorteoBkEnd)},
                        {empleado_id: new ObjectId(cadenaIDVendedor)},
                        {estado_talonario: "1"}//En este caso es 1 porque el talonario ya está asignado a un vendedor. 1 = No disponible                        
                    ]}},
            //{$group: {_id: "$_id"}} //$_id es el _id de talonario de la coleccion talonarios
            //En este caso no se usa group porque necesitamos mas de 1 valor
            
        ])
        .then(resultado => { //RESULTADO SIEMPRE ES TIPO JSON, ENTONCES CON JSON.STRINGIFY() LO CONVIERTES A JAVASCRIPT
                             //RESULTADO ES UN ARRAY, EL CUAL PUEDES RECORRER ASI: resultado[0]._id ó resultado[0].nombre, etc...  
            //console.log("resultado TODO ->    "+JSON.stringify(resultado));
            //console.log("resultado ->    "+JSON.stringify(resultado[0]._id));
            //console.log("resultado ->    "+JSON.stringify(resultado[0].serie_talonario));
            
            res.send({ 
                    messageresultado_idtalonario: JSON.stringify(resultado[0]._id), //Envia el id del talonario al front end
                    messageresultado_serietalonario: JSON.stringify(resultado[0].serie_talonario) //Envia el id del talonario al front end
                })
        })
        .catch(err => console.log(err))
});


////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////----EDICIÓN------/////////////////////////////////////////////
//RUTA PARA ENCONTRAR UN BOLETO Y EDITARLO, POR EL ID
// /api/sorteos/:id
router.put('/boletocomprado/:id', (req, res) => {
    var fecha_compra = new Date() //Captura la fecha actual del sistema
    const boletoID = req.params.id;
    console.log("req.params.id ->    " + req.params.id)

    ModeloBoleto.findById(boletoID)
        .then(boleto => {
            //Solo necesito actualizar estos campos:
            boleto.cliente_id = req.body.cliente_id;
            boleto.fecha_compra = fecha_compra;
            boleto.estado_boleto = "1";

            return boleto.save();
        })
        .then(resultado => {
            //console.log("resultado ->   "+resultado.fecha_sorteo)
            //console.log("resultado typeof ->   "+typeof resultado.fecha_sorteo)//typeof Object
            //console.log("FECHA DE COMPRA DE BOLETO ->    "+result.fecha_compra); //arroja esta forma Thu Sep 28 2023 00:52:01 GMT-0500 (hora estándar de Perú); es una cadena
            res.send({ 
                messageresultado: resultado.fecha_compra
            })
        })
        .catch(err => console.log(err))

});



//--------------------------------------------F I N A L-------------------------------------------------------
//-------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------------------


/*
//Esto me ayudó a obtener la fecha de los boletos
///Fechaaaaa
// /api/sorteos/fecha
router.get('/fecha', (req, res) => {
    
    ModeloSorteo.findById(new ObjectId("65134a7de200296e2c19f505"))
        .then(resultado => {
            //console.log("resultado ->   "+resultado.fecha_sorteo)
            //console.log("resultado typeof ->   "+typeof resultado.fecha_sorteo)//typeof Object
            //console.log("FECHA DE COMPRA DE BOLETO ->    "+result.fecha_compra); //arroja esta forma Thu Sep 28 2023 00:52:01 GMT-0500 (hora estándar de Perú); es una cadena
            res.send({ 
                messageresultado: resultado.fecha_sorteo
            })
        })
        .catch(err => console.log(err))
});
*/

///////////POR AHRORA NO USAR ESTO PORQUE ES MUY AMBIGUO
/*
//RUTA PARA CONSULTAR / LEER TODOS LOS EMPLEADOS: ADMINISTRADOR ó VENDEDOR
// /api/sorteos/consultarempleados/:id_tipo_usuario
router.put('/consultarempleados/:id_tipo_usuario',(req, res) => {
    const tipo_usuario = req.params.id_tipo_usuario;
    console.log("Tipo empleado   "+tipo_usuario);

    contarempleados();
        async function contarempleados() {
                try {
                  const totalempleados = await ModeloEmpleado.collection.estimatedDocumentCount();
                  //const estimateB = await ModeloBoleto.collection.countDocuments(); //esta funciona
                  //console.log(`Total documentos en la coleccion "boletos": ${totalboletos}`);
                  //console.log(`Estimated number of documents in the boletos collection 'countDocuments': ${estimateB}`);
                  //Query for movies from Canada.
                        //const query = { countries: "Canada" };
                        const query = { tipo_usuario: tipo_usuario};
                  // Find the number of documents that match the specified
                  // query, (i.e. with "Canada" as a value in the "countries" field)
                  // and print out the count.
                        //const countCanada = await movies.countDocuments(query);
                        //console.log(`Number of movies from Canada: ${countCanada}`);
                        const cantidadEMPLEADOS = await ModeloEmpleado.collection.countDocuments(query);
                        //console.log(`Numbero de empleados: ${cantidadEMPLEADOS}`);
                        //Este bloque de código es para enviar un msje de vuelta con messagetotalboleinsertados: totalboletos,
                        ModeloBoleto.collection.estimatedDocumentCount()
                        .then(result => {
                            res.send({ //con PUT no regresa ninguna respuesta, mejor usa res.end(), 
                                        //cuidado res.end y res.send no pueden estar en el mismo
                                        //bloque de codigo o juntos
                                messagetotalempleados: cantidadEMPLEADOS,
                                //data: result
                            })
                        })
                        .catch(err => console.log("Error es: ",err))
                        
                } catch (error) {
                    console.log("Error al contar todos los empleados, el error es ->>  "+error);
                } 
            }
});
*/

/* 
//ESTO ERA CUANDO ASIGNABAS LOS 10 VENDEDORES A LOS 10 TALONARIOS, EN ESTE CASO SABÍAS 
//QUIENES ERAN LOS VENDEDORES
//router.put('/creartalonarios/:id', (req, res) => {
    router.put('/creartalonarios/:id_sorteo', (req, res) => { //:id, en este caso 'id' es lo que llega y para obtener el dato
        //colocas req.params.id. 'id' puede ser cualquier letra(s)
        //los ':' dos puntos siempre van adelante de las letras

        const sorteoID = req.params.id_sorteo;
        //console.log("ARRAY "+req.body.arrayempleados); //arrayempleados es el nombre del array en el frontend
        var dataempleados = [];
        dataempleados = req.body.arrayempleados; //por aqui colocas desde el frontend el array de id de empleados (desde el body: JSON.stringify)
        var cantidadempleados = dataempleados.length;
        
        console.log("sorteoID ->   "+sorteoID);
        console.log("dataempleados ->   "+dataempleados);
        console.log("Cantidad de dataempleados ->   "+dataempleados.length);

            for (var i=0; i < cantidadempleados; i++)
                    {
                        ModeloTalonario.collection.insertMany([
                            {
                                sorteo_id: new ObjectId(sorteoID),
                                empleado_id: new ObjectId(dataempleados[i]),
                                serie_talonario: i,
                                estado_boleto: "0",
                                }
                            ])
                }//fin del for
//IMPORTANTÍSIMO: siempre que uses PUT y POST debes devolver una respuesta. 
//Prueba tambien con GET.
//con PUT no regresa ninguna respuesta, mejor usa res.end(), 
//cuidado res.end y res.send no pueden estar en el mismo
//bloque de codigo ó juntos. 
//res.send tiene su forma para retornar el dato, así: 
//res.send({message: 'Hola'})
                res.send({ 
                messageconfirmacion: 'Talonarios creados satisfactoriamente',
                })
});
*/


////////////////EJEMPLOS DE CONSULTAS MONGODB
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

    /*sí funciona 04
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

    */

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
////////FIN EJEMPLO DE CONSULTAS MONGODB

/////////////NOTA: Cuando las rutas no funciones, copia una que sí funciona, es decir otra por ejem:
///////////////////router.put('/boletocomprado', (req, res) => { y reemplazadas el resto

module.exports = router