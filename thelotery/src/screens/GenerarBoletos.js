import React, {useState} from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const GenerarBoletos = ({navigation, route}) => {
  
    const sorteo_id = route.params.IDsorteo
    const [cantidadBoletos, setCantidadBoletos] = useState('');
    const [costo, setCosto] = useState('');
    
    const generarboletos = async(cantidadBoletos,costo,sorteo_id) =>{
        try {//Generar el array con todos los ID de los talonarios
              const response = await fetch(`https://lotery-mongodb-vercel.vercel.app/api/sorteos/leertalonarios/${sorteo_id}`,{      
              //const response = await fetch(`http://192.168.101.20:5000/api/sorteos/leertalonarios/${sorteo_id}`,{    
                    method: 'PUT',
                    headers: {
                        'Content-type': 'application/json'//Indica que la solicitud a utilizar esta en formato JSON
                    },
                })
                const responseData = await response.json();
                console.log("Array con ID de talonarios: " + typeof responseData.arrayIDtodostalonarios)// lo devuelve como cadena
                var arrayIDtodostalonariosFrEnd = responseData.arrayIDtodostalonarios;
                //en este caso se lee el 'messageconfirmacion' que viene del 
                //res.send({messageconfirmacion: 'Boletos creados satisfactoriamente',})
                //data no se lee porque no devuelve ningun dato
        } catch (error) {
            console.log("El error es: " + error);
        }
        
      
        try {//Generamos los boletos 
                const response = await fetch(`https://lotery-mongodb-vercel.vercel.app/api/sorteos/crearboletos/${cantidadBoletos},${costo}`,{      
                //const response = await fetch(`http://192.168.101.20:5000/api/sorteos/crearboletos/${cantidadBoletos},${costo}`,{    
                    method: 'PUT',
                    headers: {
                        'Content-type': 'application/json'//Indica que la solicitud a utilizar esta en formato JSON
                    },
                    body: JSON.stringify({
                        //El array se coloca directo, ya no le coloques corchetes, Gran lección!
                        matrizIdTodosTAlonarios: arrayIDtodostalonariosFrEnd
                        //arrayIDtodostalonariosFrEnd viene de arriba, en este caso cruza el contexto de trycatch
                      })
                })
                const responseData = await response.json();
                console.log("Mensaje de respuesta: " + responseData.messageconfirmacion) 
                //en este caso se lee el 'messageconfirmacion' que viene del 
                //res.send({messageconfirmacion: 'Boletos creados satisfactoriamente',})
                //data no se lee porque no devuelve ningun dato
                Alert.alert("Boletos generados correctamente")
                navigation.navigate('ListadoSorteos'); //Debería regresar a una pantalla neutral
        } catch (error) {
            console.log("El error es: " + error);
        }   
        
        
               
      }
    
        return (
            <View>
                
                <View
                  style={Styles.datospares}
                >
                    <Text>DATOS DE LOS BOLETOS</Text>
                </View>
    
                <View
                  style={Styles.datospares}
                >
                    <Text>Cantidad de boletos:</Text>
                    <TextInput
                    style={Styles.input}
                    placeholder='Ingrese Cantidad'
                    keyboardType="numeric"
                    onChangeText={(value) => setCantidadBoletos(value)}
                    >
                    </TextInput>
                </View>
    
                <View
                  style={Styles.datospares}
                >
                    <Text>Costo unitario:</Text>
                    <TextInput
                    style={Styles.input}
                    placeholder='Ingrese Costo US$'
                    keyboardType="numeric"
                    onChangeText={(value) => setCosto(value)}
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
                      onPress={()=>generarboletos(cantidadBoletos,costo,sorteo_id)} ///Usar esto cuando se otorguen los permisos
                      //onPress={()=>pasarpantalla()}
                    >
                          <Text
                          style = {{ fontSize: 15, backgroundColor: "yellow" }}
                          >GENERAR BOLETOS</Text>
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
        
export default GenerarBoletos;
        
        
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