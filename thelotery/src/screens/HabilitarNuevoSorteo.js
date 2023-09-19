import React, {useState} from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';


const HabilitarNuevoSorteo = () => {
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
                placeholder='Ingrese Celular'
                keyboardType="numeric"
                onChangeText={(value) => setNumcelular(value)}
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