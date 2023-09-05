import React, {useEffect, useState} from 'react';  
import { View, Text, SafeAreaView, Platform, StatusBar, StyleSheet, TouchableOpacity, TextInput, ScrollView, Button} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

const ListadoBoletos = ({ navigation }) => {
  
    const [boletos, setBoletos] = useState([])
    /*
    comprobantes = [
        {
            _id: "64ae098d7824c3e5ee312d8a",
            serieprincipal: 1,
            seriesecundaria: 1,
            terminoscondiciones: "TEXTO DE TERMINOS Y CONDICIONES",
            fechacompra: 11,
            idpersona: "1",
            idarticulo: "1",
            __v: 0
        },
        {
            _id: "64ae237a7824c3e5ee312d8c",
            serieprincipal: 1,
            seriesecundaria: 2,
            terminoscondiciones: "TEXTO DE TERMINOS Y CONDICIONES",
            fechacompra: 11,
            idpersona: "1",
            idarticulo: "1",
            __v: 0
            },
    ]
    */
    
    //ejemplo para probar API con fetch
    //https://pokeapi.co/api/v2/pokemon/ditto
    
    const obtenerBoletos = async() => {
        
        try {
            const res = await fetch('http://192.168.101.22:5000/api/sorteos/boletos')
            const data = await res.json();
            setBoletos(data)

            //HACIA JSON
            //const resultComprobantes = JSON.stringify(result);
    
            //HACIA JAVASCRIPT
            //const resultComprobantesJSCRIPT = JSON.parse(resultComprobantes);

            //no borrar esta forma
            //console.log(JSON.stringify(obtenerComprobantes()))

            /*
            <ul>
            {["Item1", "Item2", "Item3"].map(item =>
            <li key="{item}">{item}</li>
            )}
            </ul>
            */
        } catch (error) {
            console.log("el error es: " + error);
        }
       
    }
    const afiliarboleto = (valorObjectId) => {
        console.log("Afiliando boleto...")
                   //AfiliarScreen = hacia donde va
                navigation.navigate('AfiliarScreen',{
                    //No es necesario colocar explicitamente la palabra "params"
                    //igual cuando revisas el route los params estan inherentes
                    //salvo que haya varias jerarquías o requieras enviar un dato
                    //hacia una pagina espefica o hacia dentro de un drawer o bottomtab
                    //params: {
                    //id: es la pantalla desde donde se está enviando el dato
                    id: 'ListadoBoletos',    
                    valorIDpersona: valorObjectId
                    //}
                })

                



    }

    useEffect(() => {
        console.log("ejecutando useEffect");
        obtenerBoletos();
    }, []);
    
      //Lo que esta entre corchetes osea "dispatch"
      //es lo que provoca que el useffect se lance
      //una sola vez, osea al renderizar por 
      //primera vez la aplicación

      boletosfiltrados = [];
      boletosfiltrados = boletos.filter(e => e.estado==0)
      //console.log("comprobantes ->    " + comprobantes.length);
      //console.log("comprobantesfiltrados ->    " + comprobantesfiltrados.length);
    return (
<>

<View  style={{ backgroundColor: '#fff', flex: 1, paddingTop: Platform.OS === "android"? 
StatusBar.currentHeight: 0 }} >
    <Text style={styles.heading} >B O L E T O S</Text>
    <ScrollView>
        <SafeAreaView >        
        <View
            /*
            style={{ 
                padding: 10,
                flexDirection: 'column',
                alignItems: "center",
                justifyContent: "space-between"
            }}
            */
        >
            {
                //key={item._id} es obligatorio ponerlo 
                //en realidad no es el ._id de la base de datos
                //solo es un valor que usa el javascript para poder
                //listar los elementos
                //además puedes colocar el ._id del elemento de la BD
                //en filter "e" es cualquier letra
                //0 = disponible || 1 = No disponible
                //comprobantesfiltrados = comprobantes.filter(e => e.estado==0),
                boletosfiltrados.map(item => (
                    
                    <View 
                        key={item._id}
                        style={{ 
                            padding: 10,
                            flexDirection: 'row',
                            alignItems: "center",
                            justifyContent: "space-between"
                        }}
                    >
                        
                        <Text style={{color: "red"}}>
                            {item._id + " - " + "descripcion" + " - " + "S/."+item.costo}
                        </Text>
                        <Icon 
                            name="caretright"
                            color="#fff"
                            size={20}
                            style={{ 
                                backgroundColor: '#900',
                                padding: 10,
                                borderRadius: 100
                            }}
                            onPress={()=>afiliarboleto(item._id)}
                        />
                    </View>
                    
                ))
                
            }
             
        </View>
        </SafeAreaView>
    </ScrollView>
</View>
</>
)
  
}

export default ListadoBoletos;


const styles = StyleSheet.create({
    heading: {
        fontSize: 28,
        textAlign: "center",
        marginTop: 25,
        marginBottom: 20,
        color: "#fff",
        backgroundColor: "#474747",
    },
    addBtn:{
        backgroundColor: '#fff',
        width: 150,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 100,
        alignSelf: 'center',
        marginVertical: 20,
        elevation: 5
    },
    input:{
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#b5b5b5',
        padding: 10,
        paddingLeft: 15,
        borderRadius: 5,
        marginVertical: 15,
        fontSize: 15
    }
})