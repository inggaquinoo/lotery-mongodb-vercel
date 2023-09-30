import React, {useState, useEffect} from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';

const AsignarSerieAEmpleado = ({navigation, route}) => {

    const idSorteo = route.params.idSorteo;
    const serie_talonario = route.params.serie_talonario;

    const [name, setName] = useState();
    const [apellido, setApellido] = useState();
    const [celular, setCelular] = useState();
    const [usuario, setUsuario] = useState();
    const [clave, setClave] = useState();
   
    const asignarserieaempleado = async(name,apellido,celular,usuario,clave) => {
        try {
          const response = await fetch('https://lotery-mongodb-vercel.vercel.app/api/sorteos/crearvendedor',{
          //const response = await fetch('http://192.168.101.20:5000/api/sorteos/crearvendedor',{
          method: 'POST',
          headers: {
              'Content-type': 'application/json'//Indica que la solicitud a utilizar esta en formato JSON
          },
          body: JSON.stringify({
            nombre: name,
            apellidos: apellido,
            celular: celular,
            usuario: usuario,
            clave: clave
          })
        })
        const responseData = await response.json();
        //const IDusuario = responseData.data._id
        //console.log("responseData:      "+responseData)
        console.log("Mensaje creacion   ->   "+responseData.message) //ID del nuevo vendedor creado
        console.log("Mensaje datos   ->   "+responseData.data._id) //ID del nuevo vendedor creado
        var iDNuevoVendedor = responseData.data._id;
      }
       catch (error) {
        console.log("El error es: " + error);
      }

    //console.log("numero de boleto    "+numero_boleto)
    console.log("serie_talonario    "+serie_talonario)
    
    
    try {
          const response = await fetch(`https://lotery-mongodb-vercel.vercel.app/api/sorteos/asignartalonariovendedor/:${idSorteo},${serie_talonario},${iDNuevoVendedor}`,{    
          //const response = await fetch(`http://192.168.101.20:5000/api/sorteos/asignartalonariovendedor/:${idSorteo},${serie_talonario},${iDNuevoVendedor}`,{
          method: 'PUT',
          headers: {
              'Content-type': 'application/json'//Indica que la solicitud a utilizar esta en formato JSON
          },
        })
        const responseData = await response.json();
        //const IDusuario = responseData.data._id
        //console.log("responseData:      "+responseData)
        console.log("Mensaje FR END talonario :   ->   "+responseData.messageresultado) //Mensaje indicando que la asignación fue exitosa
        Alert.alert(responseData.messageresultado)
      } catch (error) {
        console.log("El error es: " + error);
      }
 


   }



    
  return (
    <View>
                <View
                  style={Styles.datospares}
                >
                    <Text>ASIGNAR EMPLEADO A SERIE</Text>
                </View>
                
                <View
          style={Styles.datospares}
        >
            <Text>Nombre:</Text>
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
            <Text>Apellidos:</Text>
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
            <Text>Número Celular:</Text>
            <TextInput
            style={Styles.input}
            placeholder='Ingrese celular'
            keyboardType="numeric"
            onChangeText={(value) => setCelular(value)}
            >
            </TextInput>
        </View>
        <View
          style={Styles.datospares}
        >
            <Text>Usuario:</Text>
            <TextInput
            style={Styles.input}
            placeholder='Ingrese usuario'
            onChangeText={(value) => setUsuario(value)}
            >
            </TextInput>
        </View>
        <View
          style={Styles.datospares}
        >
            <Text>Clave:</Text>
            <TextInput
            style={Styles.input}
            placeholder='Ingrese clave'
            onChangeText={(value) => setClave(value)}
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
                      onPress={()=>asignarserieaempleado(name,apellido,celular,usuario,clave)}
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

export default AsignarSerieAEmpleado;

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