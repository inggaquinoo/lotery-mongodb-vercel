import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const AfiliarScreen = () => {
  return (
    <View>
        <View
          style={Styles.datospares}
        >
            <Text>Serie:</Text>
            <Text>1</Text>
        </View>
        <View
          style={Styles.datospares}
        >
            <Text>Numero:</Text>
            <Text>001</Text>
        </View>
        <View
          style={Styles.datospares}
        >
            <Text>Descripcion:</Text>
            <Text>Plancha</Text>
        </View>
        <View
          style={Styles.datospares}
        >
            <Text>Costo Unitario:</Text>
            <Text>US$ 2.00</Text>
        </View>
        <View
          style={Styles.datospares}
        >
            <Text>Nombre del Cliente:</Text>
            <TextInput
            style={Styles.input}
            placeholder='Ingrese Nombre'
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
              onPress={()=>console.log("Generando...")}
            >
                  <Text
                  style = {{ fontSize: 15, backgroundColor: "yellow" }}
                  >GENERAR</Text>
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