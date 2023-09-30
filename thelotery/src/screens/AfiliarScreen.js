import React, {useState} from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const AfiliarScreen = ({navigation, route}) => {
  
  //route.params.id
  //console.log("route.params.mensaje ->    " + route.params.valorIDBoleto)
  const [name, setName] = useState('');
  const [apellido, setApellido] = useState('');
  const [numcelular, setNumcelular] = useState('');

  const guardarcliente = async(name, apellido, numcelular) => {
      ///////////CREAMOS EL CLIENTE
      try {
            const response = await fetch('https://lotery-mongodb-vercel.vercel.app/api/sorteos/cliente',{
            //const response = await fetch('http://192.168.101.20:5000/api/sorteos/cliente',{
              method: 'POST',
              headers: {
                  'Content-type': 'application/json'//Indica que la solicitud a utilizar esta en formato JSON
              },
              body: JSON.stringify({
                nombre: name,
                apellidos: apellido,
                numero_celular: numcelular
              })
          })
          const responseData = await response.json();
          //const IDusuario = responseData.data._id
          console.log("responseData:      "+responseData)
          console.log("ID del nuevo cliente:      "+responseData.data._id)
          var idCliente = responseData.data._id;
          //var IDusuario = responseData.data._id;
          var nombrecliente = responseData.data.nombre;
          var apellidocliente = responseData.data.apellidos;
          var celularcliente = responseData.data.numero_celular;
          /* -----Gran dato!------ el responseData (que en realidad es la respuesta) tiene
          un campo que se llama "data" (lo puedes ver en el console.log) y accediendo
          a data puedes acceder a cualquier campo, inclusive si el registro recién ha sido
          insertado o actualizado. Genial!!!
          En este caso data._id devolverá el id del cliente, es decir lo que en base de datos esta como '_id'
          Es decir data contiene los datos de los campos de la base de datos
          */  
        } catch (error) {
          console.log("El error es: " + error);
        }
      
      try {
              ///////////GUARDAMOS EL BOLETO QUE HA SIDO COMPRADO
          const response = await fetch(`https://lotery-mongodb-vercel.vercel.app/api/sorteos/boletocomprado/${route.params.valorIDBoleto}`,{
          //const response = await fetch(`http://192.168.101.20:5000/api/sorteos/boletocomprado/${route.params.valorIDBoleto}`,{
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'//Indica que la solicitud a utilizar esta en formato JSON
            },
            body: JSON.stringify({
              cliente_id: idCliente,
            })
          })
          const responseData = await response.json();
          //console.log("RESPUESTA BKEND   "+responseData)
          //console.log("RESPUESTA BKEND  "+responseData.messageresultado) //Typeof Object
          //console.log("RESPUESTA BKEND   ----------   "+responseData.messageresultado.fecha_sorteo) //Typeof Object
          //var puente = responseData.messageresultado.fecha_sorteo
          //console.log("RESPUESTA BKEND  typeof  "+typeof responseData.messageresultado.fecha_sorteo) //Typeof Object
          //console.log("RESPUESTA BKEND typeof JSON.stringify   "+typeof JSON.stringify(responseData.messageresultado)) //Typeof Object

          //arraytemp = ["1","2","3"]
          //console.log("arraytemp  "+arraytemp)
          
          var fecha_compra = new Date(responseData.messageresultado);
          //console.log("bandera typeof  "+typeof bandera) //typeof object
          //console.log("bandera typeof  "+typeof bandera.getFullYear()) //typeof number
        } catch (error) {
          console.log("El error es: " + error);
        }
      //GenerarBoleto = hacia donde va
      navigation.navigate('GenerarBoleto',{
        //No es necesario colocar explicitamente la palabra "params"
        //igual cuando revisas el route los params estan inherentes
        //salvo que haya varias jerarquías o requieras enviar un dato
        //hacia una pagina espefica o hacia dentro de un drawer o bottomtab
        //params: {
        //id: es la pantalla desde donde se está enviando el dato
        id: 'AfiliarScreen',
        
        IDSorteo: route.params.valorIDsorteo,
        IDBoleto: route.params.valorIDBoleto,
        descripcionarticulos: route.params.descripcionarticulos,
        costoarticulos: route.params.costoarticulos,
        //IDusuario: IDusuario,
        nombrecliente: nombrecliente,
        apellidocliente: apellidocliente,
        celularcliente: celularcliente,
        serietalonario: route.params.serietalonario,
        numero_boleto: route.params.numero_boleto,
        nombrevendedorasignado: route.params.nombrevendedorasignado,
        apellidovendedorasignado: route.params.apellidovendedorasignado,
        terminos_condiciones: route.params.terminos_condiciones,
        fecha_sorteo: route.params.fecha_sorteo,
        lugar_sorteo: route.params.lugar_sorteo,
        
        ///Enviando los datos de fecha de compra
        anio: fecha_compra.getFullYear(),//typeof number
        mes: (fecha_compra.getMonth() + 1), //getMonth() siempre suma + 1 //typeof number
        dia: fecha_compra.getDate(),//typeof number
        hora: fecha_compra.getHours(),//typeof number
        minuto: fecha_compra.getMinutes(),//typeof number
        segundo: fecha_compra.getSeconds()//typeof number
        //}
    })
}

 return (
    <View>
        <View
          style={Styles.datospares}
        >
            <Text>Nombre del Cliente:</Text>
            <TextInput
            style={Styles.input}
            placeholder='Ingrese Nombre'
            onChangeText={(value) => setName(value)}
            >
            </TextInput>
        </View>
        <View
          style={Styles.datospares}
        >
            <Text>Apellido del Cliente:</Text>
            <TextInput
            style={Styles.input}
            placeholder='Ingrese Apellido'
            onChangeText={(value) => setApellido(value)}
            >
            </TextInput>
        </View>
        <View
          style={Styles.datospares}
        >
            <Text>Celular del Cliente:</Text>
            <TextInput
            style={Styles.input}
            placeholder='Ingrese Celular'
            keyboardType="numeric"
            onChangeText={(value) => setNumcelular(value)}
            >
            </TextInput>
        </View>
        <View
            style={{ 
                padding: 20,
                flexDirection: 'row',
                alignItems: "center",
                justifyContent: "space-around"
            }}
          >
            <TouchableOpacity
              /* NOTA: cuando usas ()=> console.log("Generando...") refresca la consola inmediatemente
              cuando usas console.log("Generando...") NO refresca la consola*/
              onPress={()=>guardarcliente(name, apellido, numcelular)} ///Usar esto cuando se otorguen los permisos
              //onPress={()=>pasarpantalla()}
            >
                  <Text
                  style = {{ fontSize: 15, backgroundColor: "yellow" }}
                  >GUARDAR</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={()=>console.log("Cancelando...")}
            >
                  <Text
                  style = {{ fontSize: 15, backgroundColor: "yellow" }}
                  >CANCELAR</Text>
            </TouchableOpacity>
          </View>
    </View>
  )
}

export default AfiliarScreen;


const Styles = StyleSheet.create({

  input: {
      backgroundColor: "#fff",
      borderWidth: 1,
      borderColor: "#b5b5b5",
      padding: 5,
      paddingLeft: 15,
      borderRadius: 5,
      marginVertical: 5,
      fontSize: 15,
  },

  datospares: {
      padding: 5,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center"
  },
  cajastexto:{
      padding: 20,
      flexDirection: 'row',
      alignItems: "center",
      justifyContent: "space-around"
  }
})