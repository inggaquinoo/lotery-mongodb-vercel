import React, {useState} from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';


const GenerarVendedores = ({navigation, route}) => {

    const [cantidadVendedores, setCantidadVendedores] = useState('');
    const sorteo_id = route.params.IDsorteo;
    
    const generarcantvendedores = async(cantidadVendedores) => {
        try { //SE CREAN LOS TALONARIOS
            const response = await fetch(`https://lotery-mongodb-vercel.vercel.app/api/sorteos/creartalonarios/${sorteo_id},${cantidadVendedores}`,{    
            //const response = await fetch(`http://192.168.101.20:5000/api/sorteos/creartalonarios/${sorteo_id},${cantidadVendedores}`,{    
                    method: 'PUT',
                    headers: {
                        'Content-type': 'application/json'//Indica que la solicitud a utilizar esta en formato JSON
                    },
                })
                const responseData = await response.json();
                console.log("Estado creación de talonarios: " + responseData.messageconfirmacion) 
                //en este caso se lee el 'messageconfirmacion' que viene del 
                //res.send({messageconfirmacion: 'Boletos creados satisfactoriamente',})
                //data no se lee porque no devuelve ningun dato
                //GenerarBoleto = hacia donde va
                //GenerarBoleto = hacia donde va
                navigation.navigate('GenerarBoletos',{
                //No es necesario colocar explicitamente la palabra "params"
                //igual cuando revisas el route los params estan inherentes
                //salvo que haya varias jerarquías o requieras enviar un dato
                //hacia una pagina espefica o hacia dentro de un drawer o bottomtab
                //params: {
                //id: es la pantalla desde donde se está enviando el dato
                id: 'GenerarVendedores',
                    IDsorteo: sorteo_id,
                //}
                })
        } catch (error) {
            console.log("El error es: " + error);
        }
   }

  return (
    <View>
                <View
                  style={Styles.datospares}
                >
                    <Text>DATOS DE LOS VENDEDORES</Text>
                </View>

                <View
                    style={Styles.datospares}
                >
                    <Text>Cantidad Vendedores:</Text>
                    <TextInput
                        style={Styles.input}
                        placeholder='Ingrese Cantidad'
                        keyboardType="numeric"
                        onChangeText={(value) => setCantidadVendedores(value)}
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
                      onPress={()=>generarcantvendedores(cantidadVendedores)}
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

export default GenerarVendedores;

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