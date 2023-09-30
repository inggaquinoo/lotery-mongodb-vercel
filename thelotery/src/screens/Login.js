import React, {useState} from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const Login = ({navigation, route}) => {
  
  const [usuario, setUsuario] = useState('');
  const [clave, setClave] = useState('');

  const accesosistema = async(usuario, clave) => {
          try {//Encontramos el ID del vendedor basados en su usuario y clave
            const response = await fetch(`https://lotery-mongodb-vercel.vercel.app/api/sorteos/accesosistema/${usuario},${clave}`,{
            //const response = await fetch(`http://192.168.101.20:5000/api/sorteos/accesosistema/${usuario},${clave}`,{
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json'//Indica que la solicitud a utilizar esta en formato JSON
                },
            })
                const responseData = await response.json();
                //console.log("err:      "+JSON.stringify(responseData.messageresultadoacceso))
                //console.log("err:      "+JSON.stringify(responseData.messageresultadoaccesodenegado))
                    if (responseData.messageresultadoacceso.length > 0)
                        {
                            //GenerarBoleto = hacia donde va
                            navigation.navigate('ListadoSorteos',{
                              //No es necesario colocar explicitamente la palabra "params"
                              //igual cuando revisas el route los params estan inherentes
                              //salvo que haya varias jerarquías o requieras enviar un dato
                              //hacia una pagina espefica o hacia dentro de un drawer o bottomtab
                              //params: {
                              //id: es la pantalla desde donde se está enviando el dato
                              id: 'Login',
                              usuario: usuario,
                              clave: clave,
                              //usuario: "plopez",
                              //clave: "123456"
                              //}
                            })
                        }
                    if (responseData.messageresultadoaccesodenegado === "DENEGADO")
                        {
                          Alert.alert("Acceso Denegado / Usuario no encontrado")
                        }
              } catch (error) {
                  //console.log("El error es: " + error);
                  Alert.alert("Acceso Denegado / Usuario no encontrado");
              }
      
}

 return (
    <View>
        <View
          style={Styles.datospares}
        >
            <Text>Usuario:</Text>
            <TextInput
            style={Styles.input}
            placeholder='Ingrese Usuario'
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
            placeholder='Ingrese Clave'
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
              onPress={()=>accesosistema(usuario, clave)} ///Usar esto cuando se otorguen los permisos
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

export default Login;


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