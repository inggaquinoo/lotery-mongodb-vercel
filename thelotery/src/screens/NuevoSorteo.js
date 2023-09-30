import React, {useState} from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const NuevoSorteo = ({navigation, route}) => {

    const [fechaSorteo_anio, setFechaSorteo_anio] = useState('');
    const [fechaSorteo_mes, setFechaSorteo_mes] = useState('');
    const [fechaSorteo_dia, setFechaSorteo_dia] = useState('');
    const [fechaSorteo_hora, setFechaSorteo_hora] = useState('');
    const [fechaSorteo_minuto, setFechaSorteo_minuto] = useState('');

    const [lugarSorteo, setLugarSorteo] = useState('');
    const [terminosCondiciones, setTerminosCondiciones] = useState('');
    const [descArti, setDescArti] = useState('');
    
    const generarsorteo = async(
      dia,
      mes,
      anio,
      hora,
      minuto,
      lugarSorteo,
      descArti,
      terminosCondiciones) =>{
        
        //Cadena fecha de sorteo
        const fechadesorteo = anio+"-"+mes+"-"+dia+" "+hora+":"+minuto+":00";

        try {
              const responsesorteo = await fetch('https://lotery-mongodb-vercel.vercel.app/api/sorteos/crearsorteo',{          
              //const responsesorteo = await fetch('http://192.168.101.20:5000/api/sorteos/crearsorteo',{    
                  method: 'POST',
                  headers: {
                      'Content-type': 'application/json'//Indica que la solicitud a utilizar esta en formato JSON
                  },
                  body: JSON.stringify({
                    //fecha_sorteoFrEnd: fechaSorteo,
                    fecha_sorteoFrEnd: fechadesorteo,
                    lugarFrEnd: lugarSorteo,
                    descripcion_articulosFrEnd: descArti,
                    terminos_condicionesFrEnd: terminosCondiciones,
                  })
              })
              const responseData = await responsesorteo.json();
              //const IDusuario = responseData.data._id
              //console.log("responseData:      "+responseData)
              console.log("ID del nuevo sorteo:   ->   "+responseData.data._id) //ID del nuevo sorteo creado

              //GenerarBoleto = hacia donde va
              navigation.navigate('GenerarVendedores',{
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
                    <Text>FECHA DEL SORTEO</Text>
            </View>
            
            <View
              style={Styles.datospares}
            >
                <Text>DIA:</Text>
                <TextInput
                style={Styles.input}
                placeholder='DIA'
                keyboardType="numeric"
                onChangeText={(value) => setFechaSorteo_dia(value)}
                >
                </TextInput>
            </View>

            <View
              style={Styles.datospares}
            >
                <Text>MES:</Text>
                <TextInput
                style={Styles.input}
                placeholder='MES (1 al 12)'
                keyboardType="numeric"
                onChangeText={(value) => setFechaSorteo_mes(value)}
                >
                </TextInput>
            </View>

            <View
              style={Styles.datospares}
            >
                <Text>AÑO:</Text>
                <TextInput
                style={Styles.input}
                placeholder='AÑO'
                keyboardType="numeric"
                onChangeText={(value) => setFechaSorteo_anio(value)}
                >
                </TextInput>
            </View>

            <View
              style={Styles.datospares}
            >
                <Text>HORA:</Text>
                <TextInput
                style={Styles.input}
                placeholder='HORA (24 HORAS)'
                keyboardType="numeric"
                onChangeText={(value) => setFechaSorteo_hora(value)}
                >
                </TextInput>
            </View>

            <View
              style={Styles.datospares}
            >
                <Text>MINUTOS:</Text>
                <TextInput
                style={Styles.input}
                placeholder='MINUTOS'
                keyboardType="numeric"
                onChangeText={(value) => setFechaSorteo_minuto(value)}
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
              style={Styles.datospares}
            >
                <Text>Términos y Condiciones:</Text>
                <TextInput
                style={Styles.input}
                placeholder='Ingrese condiciones'
                onChangeText={(value) => setTerminosCondiciones(value)}
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
                      onPress={()=>generarsorteo(
                        fechaSorteo_dia,
                        fechaSorteo_mes,
                        fechaSorteo_anio,
                        fechaSorteo_hora,
                        fechaSorteo_minuto,
                        lugarSorteo,
                        descArti,
                        terminosCondiciones)} ///Usar esto cuando se otorguen los permisos
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