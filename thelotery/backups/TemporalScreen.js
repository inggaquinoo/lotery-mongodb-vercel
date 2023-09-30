import React, {useState} from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const TemporalScreen = ({navigation, route}) => {
    //Constantes para la fecha de compra
    const anio = route.params.anio;
    const mes = route.params.mes;
    const dia = route.params.dia;
    const hora = route.params.hora;
    const minuto = route.params.minuto;
    const segundo = route.params.segundo;

    /*
    console.log("AÑO: "+anio);
    console.log("MES: "+mes);
    console.log("DÍA: "+dia);
    console.log("HORA: "+hora);
    console.log("MINUTO: "+minuto);
    console.log("SEGUNDO: "+segundo);
    */

    console.log("FECHA_COMPRA: "+dia+"/"+mes+"/"+anio+" - "+hora+":"+minuto+":"+segundo)
    const fechadecompra = dia+"/"+mes+"/"+anio+" - "+hora+":"+minuto+":"+segundo

  return (
            <View>
                <View
                  style={Styles.datospares}
                >
                    <Text>DATOS DEL TEMPORAL</Text>
                </View>

                <View
                style={Styles.datospares}
                >
                    <Text>FECHA DE COMPRA:</Text>
                    <Text
                    > {fechadecompra}</Text>
                </View>
               
                
            </View>
          )
        }
        
export default TemporalScreen;
        
        
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