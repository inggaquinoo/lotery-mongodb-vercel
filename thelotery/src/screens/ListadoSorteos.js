import React, {useEffect, useState} from 'react';  
import { View, Text, SafeAreaView, Platform, StatusBar, StyleSheet, TouchableOpacity, TextInput, ScrollView, Button, Alert} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

const ListadoSorteos = ({ navigation, route }) => {
  
    const [sorteos, setSorteos] = useState([]);
    usuarioFrEnd = route.params.usuario;
    claveFrEnd = route.params.clave;

    const obtenerSorteos = async() => {
        try {
            const response = await fetch('https://lotery-mongodb-vercel.vercel.app/api/sorteos/')
            //const response = await fetch('http://192.168.101.20:5000/api/sorteos')
            const data = await response.json();
            setSorteos(data)
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
            console.log("El error es: " + error);
        }
       
    }
    const verBoletosDisponibles = async(usuarioFrEnd,claveFrEnd,valorIDsorteo,descripcion_articulos,terminos_condiciones,fecha_sorteo,lugar) => {
        try {//Encontramos el ID del vendedor basados en su usuario y clave
            const response = await fetch(`https://lotery-mongodb-vercel.vercel.app/api/sorteos/buscaridvendedor/${usuarioFrEnd},${claveFrEnd}`,{
            //const response = await fetch(`http://192.168.101.20:5000/api/sorteos/buscaridvendedor/${usuarioFrEnd},${claveFrEnd}`,{
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json'//Indica que la solicitud a utilizar esta en formato JSON
                },
            })
                const responseData = await response.json();
                //console.log("responseData:      "+responseData.messageresultado)
                var idvendedorasignado = responseData.messageresultado_id;
                var nombrevendedorasignado = responseData.messageresultado_nombre;
                var apellidovendedorasignado = responseData.messageresultado_apellidos;
                
        } catch (error) {
            console.log("El error es: " + error);
        }


        console.log("idvendedorasignado   ->    "+idvendedorasignado) 
        try {//Encontramos el ID del talonario asignado a un vendedor específico
            const response = await fetch(`https://lotery-mongodb-vercel.vercel.app/api/sorteos/buscaridtalonario/${valorIDsorteo},${idvendedorasignado}`,{
            //const response = await fetch(`http://192.168.101.20:5000/api/sorteos/buscaridtalonario/${valorIDsorteo},${idvendedorasignado}`,{
                method: 'PUT',
                headers: {
                    'Content-type': 'application/json'//Indica que la solicitud a utilizar esta en formato JSON
                },
            })
                const responseData = await response.json();
                //console.log("responseData:      "+responseData.messageresultado)
                var idtalonario = responseData.messageresultado_idtalonario;
                var serietalonario = responseData.messageresultado_serietalonario;
        } catch (error) {
            console.log("El error es: " + error);
        }

        //console.log("PANTALLA LISTADOSORTEOS - SERIE TALONARIO      "+serietalonario)
        var fechadesorteo = new Date(fecha_sorteo);
        ///Enviando los datos de fecha de sorteo
        const anio = fechadesorteo.getFullYear();//typeof number
        const mes = (fechadesorteo.getMonth() + 1); //getMonth() siempre suma + 1 //typeof number
        const dia = fechadesorteo.getDate();//typeof number
        const hora = fechadesorteo.getHours();//typeof number
        const minuto = fechadesorteo.getMinutes();//typeof number
        const segundo = fechadesorteo.getSeconds();//typeof number
        //Cadena fecha de sorteo
        var cadenafechadesorteo = dia+"/"+mes+"/"+anio+" - "+hora+":"+minuto+":"+segundo
        
        //console.log("Mostrando boletos disponibles...")
        //navigation.navigate('ListadoBoletos')
        //ListadoBoletos = hacia donde va
                navigation.navigate('ListadoBoletos',{
                    //No es necesario colocar explicitamente la palabra "params"
                    //igual cuando revisas el route los params estan inherentes
                    //salvo que haya varias jerarquías o requieras enviar un dato
                    //hacia una pagina espefica o hacia dentro de un drawer o bottomtab
                    //params: {
                    //id: es la pantalla desde donde se está enviando el dato
                    id: 'ListadoSorteos',    
                    valorIDsorteo: valorIDsorteo,
                    idtalonario: idtalonario,
                    descripcion_articulos: descripcion_articulos,
                    serietalonario: serietalonario,
                    nombrevendedorasignado: nombrevendedorasignado,
                    apellidovendedorasignado: apellidovendedorasignado,
                    terminos_condiciones: terminos_condiciones,
                    fecha_sorteo: cadenafechadesorteo,
                    lugar_sorteo: lugar,
                    //}
                })
    }

    useEffect(() => {
        //console.log("ejecutando useEffect");
        obtenerSorteos();
    }, []);
    
      //Lo que esta entre corchetes osea "dispatch"
      //es lo que provoca que el useffect se lance
      //una sola vez, osea al renderizar por 
      //primera vez la aplicación

      /*
      sorteosfiltrados = [];
      sorteosfiltrados = sorteos.filter(e => e.estado == '0')//0 = Sorteos Activos
      console.log("sorteos ->    " + sorteos.length);
      console.log("sorteosfiltrados ->    " + sorteosfiltrados.length);
      */
    return (
<>

<View  style={{ backgroundColor: '#fff', flex: 1, paddingTop: Platform.OS === "android"? 
StatusBar.currentHeight: 0 }} >
    <Text style={styles.heading} >S O R T E O S</Text>
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
                sorteos.map(item => (
                    
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
                            {item._id + "    -    " + new Date(item.fecha_sorteo)}
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
                            onPress={()=>verBoletosDisponibles(usuarioFrEnd,claveFrEnd,item._id,item.descripcion_articulos,item.terminos_condiciones,item.fecha_sorteo,item.lugar)}
                        />
                    </View>
                    
                ))
                
            }
             
        </View>
                <View>
                    <Text></Text>
                </View>
                <View>
                    <Text>TEMPORAL ACCESOS DE ADMINISTRADOR</Text>
                </View>

                <View>
                    <TouchableOpacity
                      onPress={()=>navigation.navigate('NuevoSorteo')}
                    >
                          <Text
                          style = {{ fontSize: 15, backgroundColor: "yellow" }}
                          >ADMINISTRADOR</Text>
                    </TouchableOpacity>
                 </View>
        </SafeAreaView>
    </ScrollView>
</View>
</>
)
  
}

export default ListadoSorteos;


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