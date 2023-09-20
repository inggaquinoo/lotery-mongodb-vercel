import React, {useState} from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';


const HabilitarNuevoSorteo = () => {

const [cantidadboletos, setCantidadBoletos] = useState('');

    const generarboletos = async(cantidadboletos) =>{

            const response = await fetch('https://lotery-mongodb-vercel.vercel.app/api/sorteos/crearboletos',{
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'//Indica que la solicitud a utilizar esta en formato JSON
                },
                body: JSON.stringify({
                    //sorteoID: "64dd5e361bb2aab7af059b15",
                    //costointerno: 3,
                    //terminosycondicionesinterno: "terminosycondiciones",
                    boletosCantidad: cantidadboletos
                })
            })
            const responseData = await response.json();
            //const IDusuario = responseData.data._id
            console.log("responseData:      "+responseData)
            console.log("ID del nuevo cliente:      "+responseData.data._id)

            Alert.alert("Boletos generados correctamente")

    }

    return (
        <View>
            <View
              style={Styles.datospares}
            >
                <Text>DATOS DEL SORTEO</Text>
            </View>
            
            <View
              style={Styles.datospares}
            >
                <Text>Articulos:</Text>
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
                <Text>Fecha del sorteo:</Text>
                <TextInput
                style={Styles.input}
                placeholder='Ingrese Celular'
                keyboardType="numeric"
                onChangeText={(value) => setNumcelular(value)}
                >
                </TextInput>
            </View>
            <View
              style={Styles.datospares}
            >
                <Text>Lugar:</Text>
                <TextInput
                style={Styles.input}
                placeholder='Ingrese Celular'
                keyboardType="numeric"
                onChangeText={(value) => setNumcelular(value)}
                >
                </TextInput>
            </View>

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
                  onPress={()=>generarboletos(cantidadboletos)} ///Usar esto cuando se otorguen los permisos
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
    
export default HabilitarNuevoSorteo;
    
    
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