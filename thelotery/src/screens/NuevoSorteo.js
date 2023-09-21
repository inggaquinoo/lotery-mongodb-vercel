import React, {useState} from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const NuevoSorteo = ({navigation, route}) => {

    const [fechaSorteo, setFechaSorteo] = useState('');
    const [lugarSorteo, setLugarSorteo] = useState('');
    const [descArti, setDescArti] = useState('');
    
    const generarsorteo = async(fechaSorteo,lugarSorteo,descArti) =>{
        
        try {
                const responsesorteo = await fetch('http://192.168.101.20:5000/api/sorteos/crearsorteo',{    
                //const responsesorteo = await fetch('https://lotery-mongodb-vercel.vercel.app/api/sorteos/crearsorteo',{    
                  method: 'POST',
                  headers: {
                      'Content-type': 'application/json'//Indica que la solicitud a utilizar esta en formato JSON
                  },
                  body: JSON.stringify({
                    fecha_sorteoFrEnd: fechaSorteo,
                    lugarFrEnd: lugarSorteo,
                    descripcion_articulosFrEnd: descArti,
                  })
              })
              const responseData = await responsesorteo.json();
              //const IDusuario = responseData.data._id
              //console.log("responseData:      "+responseData)
              console.log("ID del nuevo sorteo:   ->   "+responseData.data._id) //ID del nuevo sorteo creado

              //GenerarBoleto = hacia donde va
              navigation.navigate('NuevoBoleto',{
                //No es necesario colocar explicitamente la palabra "params"
                //igual cuando revisas el route los params estan inherentes
                //salvo que haya varias jerarquías o requieras enviar un dato
                //hacia una pagina espefica o hacia dentro de un drawer o bottomtab
                //params: {
                //id: es la pantalla desde donde se está enviando el dato
                id: 'NuevoSorteo',
                    IDsorteo: responseData.data._id,
                //}
            })
        } catch (error) {
            console.log("El error en sorteo es: " + error);
        }

        
        
        
        
               
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
                placeholder='Ingrese Articulos'
                onChangeText={(value) => setDescArti(value)}
                >
                </TextInput>
            </View>
            <View
              style={Styles.datospares}
            >
                <Text>Fecha del sorteo:</Text>
                <TextInput
                style={Styles.input}
                placeholder='Ingrese Fecha Sorteo'
                onChangeText={(value) => setFechaSorteo(value)}
                >
                </TextInput>
            </View>
            <View
              style={Styles.datospares}
            >
                <Text>Lugar:</Text>
                <TextInput
                style={Styles.input}
                placeholder='Ingrese Lugar'
                onChangeText={(value) => setLugarSorteo(value)}
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
                      onPress={()=>generarsorteo(fechaSorteo,lugarSorteo,descArti)} ///Usar esto cuando se otorguen los permisos
                      //onPress={()=>pasarpantalla()}
                    >
                          <Text
                          style = {{ fontSize: 15, backgroundColor: "yellow" }}
                          >NUEVO SORTEO</Text>
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
        
export default NuevoSorteo;
        
        
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