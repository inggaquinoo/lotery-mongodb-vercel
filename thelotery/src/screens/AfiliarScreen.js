import React, {useState} from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const AfiliarScreen = ({navigation, route}) => {
  
  //route.params.id
  //console.log("route.params.mensaje ->    " + route.params.valorIDBoleto)
  const [name, setName] = useState('');
  const [apellido, setApellido] = useState('');
  const [numcelular, setNumcelular] = useState('');

  const guardarcliente = async(name, apellido, numcelular) => {
    //console.log("Guardando cliente...")
    //console.log("Valores ->    " + name + " " + apellido + " " + numcelular)

    //console.log("route.params.mensaje ->    " + route.params.valorIDBoleto)
    //const response = await fetch('http://192.168.18.10:5000/api/sorteos/',{
    //const response = await fetch('http://192.168.101.20:5000/api/sorteos/',{
  
    const response = await fetch('https://lotery-mongodb-vercel.vercel.app/api/sorteos/',{
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

      /* -----Gran dato!------ el responseData (que en realidad es la respuesta) tiene
      un campo que se llama "data" (lo puedes ver en el console.log) y accediendo
      a data puedes acceder a cualquier campo, inclusive si el registro recién ha sido
      insertado o actualizado. Genial!!!
      */
      const responsegeneral = await fetch(`https://lotery-mongodb-vercel.vercel.app/api/sorteos/${route.params.valorIDBoleto}`,{
        method: 'PUT',
        headers: {
            'Content-type': 'application/json'//Indica que la solicitud a utilizar esta en formato JSON
        },
        body: JSON.stringify({
          cliente_id: responseData.data._id,
          empleado_id: "6509c3920c3a856a831fbc6e", //debería venir de la sesión de inicio
          fecha_compra: "2023-08-28",
          estado_boleto: "1"
        })
      })
      //const responseDataGeneral = await responsegeneral.json(); //no se usan los resultados
      //console.log("responseData:      "+responseDataGeneral)
      //console.log("BOLETO GRABADO EN BASE DE DATOS!!!")
      
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
        IDusuario: responseData.data._id,
        nombrecliente: responseData.data.nombre,
        apellidocliente: responseData.data.apellidos,
        celularcliente: responseData.data.numero_celular
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