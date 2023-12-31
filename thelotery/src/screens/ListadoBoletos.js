import React, {useEffect, useState} from 'react';  
import { View, Text, SafeAreaView, Platform, StatusBar, StyleSheet, TouchableOpacity, TextInput, ScrollView, Button} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

const ListadoBoletos = ({ navigation, route }) => {
    const [boletos, setBoletos] = useState([])
    const obtenerBoletos = async() => {
        
        try {//Encontramos los boletos que pertenecen a determinado talonario
            const response = await fetch(`https://lotery-mongodb-vercel.vercel.app/api/sorteos/buscarboletos/${route.params.idtalonario}`,{
            //const response = await fetch(`http://192.168.101.20:5000/api/sorteos/buscarboletos/${route.params.idtalonario}`,{
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json'//Indica que la solicitud a utilizar esta en formato JSON
                },
            })
                const responseData = await response.json();
                console.log("responseData:      "+responseData.arrayNumerosBoletos)
                setBoletos(responseData.arrayNumerosBoletos)
        } catch (error) {
            console.log("El error es: " + error);
        }
       
    }
    //const afiliarboleto = (valorObjectId) => {
    const afiliarboleto = (valorIDBoleto, descripcionarticulos, costoarticulos, numero_boleto) => {
        console.log("Afiliando boleto...")
        console.log("PANTALLA LISTADO BOLETOS - SERIE TALONARIO      "+route.params.serietalonario)
                   //AfiliarScreen = hacia donde va
                navigation.navigate('AfiliarScreen',{
                    //No es necesario colocar explicitamente la palabra "params"
                    //igual cuando revisas el route los params estan inherentes
                    //salvo que haya varias jerarquías o requieras enviar un dato
                    //hacia una pagina espefica o hacia dentro de un drawer o bottomtab
                    //params: {
                    //id: es la pantalla desde donde se está enviando el dato
                    id: 'ListadoBoletos',
                    valorIDsorteo: route.params.valorIDsorteo,    
                    valorIDBoleto: valorIDBoleto,
                    descripcionarticulos: descripcionarticulos,
                    costoarticulos: costoarticulos,
                    serietalonario: route.params.serietalonario,
                    numero_boleto: numero_boleto,
                    nombrevendedorasignado: route.params.nombrevendedorasignado,
                    apellidovendedorasignado: route.params.apellidovendedorasignado,
                    terminos_condiciones: route.params.terminos_condiciones,
                    fecha_sorteo: route.params.fecha_sorteo,
                    lugar_sorteo: route.params.lugar_sorteo,
                    //}
                })
    }

    useEffect(() => {
        //console.log("HOLA - ejecutando useEffect");
        obtenerBoletos();
    }, []);
    
      //Lo que esta entre corchetes osea "dispatch"
      //es lo que provoca que el useffect se lance
      //una sola vez, osea al renderizar por 
      //primera vez la aplicación

      //boletosfiltrados = [];
      //boletosfiltrados = boletos.filter(e => e.estado==0)
      //boletosfiltrados = boletos.filter(e => e.sorteo_id==route.params.valorIDsorteo)
      //console.log("comprobantes ->    " + comprobantes.length);
      //console.log("comprobantesfiltrados ->    " + comprobantesfiltrados.length);
      //console.log("boletosfiltrados ->    " + boletosfiltrados);
      //console.log("boletosfiltrados ->    " + JSON.stringify(boletosfiltrados) );
      
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
                //boletosfiltrados.map(item => (
                    boletos.map(item => (
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
                            { item.numero_boleto + " - " + route.params.descripcion_articulos + " - " + "US$" + item.costo + ".00"}
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
                            //onPress={()=>afiliarboleto(item._id)}
                            onPress={()=>afiliarboleto(item._id, route.params.descripcion_articulos, item.costo, item.numero_boleto)}
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