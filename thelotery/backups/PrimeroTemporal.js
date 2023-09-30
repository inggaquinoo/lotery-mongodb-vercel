import React, {useState} from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const PrimeroTemporal = ({navigation, route}) => {

  const temporal = async() => {

    try {
              ///////////TEMPORAL
          const response = await fetch('http://192.168.101.20:5000/api/sorteos/fecha')
          const responseData = await response.json();
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
          console.log("El error en sorteo es: " + error);
      }


      //GenerarBoleto = hacia donde va
      navigation.navigate('TemporalScreen',{
        //No es necesario colocar explicitamente la palabra "params"
        //igual cuando revisas el route los params estan inherentes
        //salvo que haya varias jerarquías o requieras enviar un dato
        //hacia una pagina espefica o hacia dentro de un drawer o bottomtab
        //params: {
        //id: es la pantalla desde donde se está enviando el dato
        id: 'PrimeroTemporal',
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
                    <Text>DATOS DEL FECHA TEMPORAL</Text>
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
                      onPress={()=>temporal()}
                     >
                      <Text
                      style = {{ fontSize: 15, backgroundColor: "yellow" }}
                      >TEMPORAL</Text>
                    </TouchableOpacity>
                    
                  </View>
            </View>
          )
        }
        
export default PrimeroTemporal;
        
        
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