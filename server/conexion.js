//variable de entorno, es usada porque no siempre vamos
//a poder correr el programa en un puerto especifico 
require('dotenv').config();

const mongoose = require('mongoose');
                //mongodb es el proveedor de la base de datos
                //127.0.0.1 es el IP por donde escucha la tarjeta de red
                //puerto: 127017
                //Nombre de la base de datos: crudmernstack
//mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.dp6bpsr.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,{useNewUrlParser: true, useUnifiedTopology: true})
//mongoose.connect(`mongodb+srv://gustavo:1234567890@cluster0.dp6bpsr.mongodb.net/lotery?retryWrites=true&w=majority`,{useNewUrlParser: true, useUnifiedTopology: true})
//mongoose.connect(process.env.MONGO_CONNECT_URI)
//console.log ("cadena ->     "+process.env.MONGO_CONNECT_URI)
mongoose.connect(process.env.MONGO_CONNECT_URI,{useNewUrlParser: true, useUnifiedTopology: true})

//Esto se crea para crear los msjes de conexión
const objetobd = mongoose.connection                                                                                                                
                        //funcion callback ()=>
    objetobd.on('connected',()=>{console.log('Conexion correcta a MongoDB')})
    objetobd.on('error',()=>{console.log('Error en la conexion a MongoDB')})

module.exports = mongoose