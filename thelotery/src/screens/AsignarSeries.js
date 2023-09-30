import React, {useState, useEffect} from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';

const AsignarSeries = ({navigation, route}) => {

    ////Para proporcionar los datos que van a cargarse en el control SelectDropdown
    const [dataRespuestaIDSorteos, setDataRespuestaIDSorteos] = useState([]);
    const [dataRespuestaNumeroSorteo, setDataRespuestaNumeroSorteo] = useState([]);

    ////Para saber cual es el elemento seleccionado
    const [idSorteoSeleccionado, setIdSorteoSeleccionado] = useState(" ")
    const [numeroTalonarioSeleccionado, setNumeroTalonarioSeleccionado] = useState(" ")

    ///Para controlar si ha selccionar un elemento
    const [eleccionIdSorteo, setEleccionIdSorteo] = useState(0);
    const [eleccionNum_Talonario, setEleccionNum_Talonario] = useState(0)
    
    //Ejemplo de matriz para SelectDropdown
    //const countries = ["Egypt", "Canada", "Australia", "Ireland"]

    const buscarsorteos = async() => {
        try {
            const response = await fetch('https://lotery-mongodb-vercel.vercel.app/api/sorteos/')
            //const response = await fetch('http://192.168.101.20:5000/api/sorteos')
            const data = await response.json();
            setDataRespuestaIDSorteos(data)
        } catch (error) {
            console.log("El error es: " + error);
        }
    }


    const buscartalonariosdisponibles = async(idSorteo, valoreleccionIdSorteo) => {
        if(valoreleccionIdSorteo === 1)//Quiere decir que seleccionó por lo menos un sorteo
                {
                        try {
                        const response = await fetch(`https://lotery-mongodb-vercel.vercel.app/api/sorteos/leertalonarios/${idSorteo}`,{
                        //const response = await fetch(`http://192.168.101.20:5000/api/sorteos/leertalonarios/${idSorteo}`,{
                        method: 'PUT',
                        headers: {
                            'Content-type': 'application/json'//Indica que la solicitud a utilizar esta en formato JSON
                        },
                        })
                            const responseData = await response.json();
                            //console.log("responseData -------------->>>>   "+responseData)
                            //console.log("responseData.arraySerieDisponibletalonarios   "+responseData.arraySerieDisponibletalonarios)
                            //console.log("responseData.arraySerieDisponibletalonarios  --STRINGI "+JSON.stringify(responseData.arraySerieDisponibletalonarios))
                            setDataRespuestaNumeroSorteo(responseData.arraySerieDisponibletalonarios)
                        
                        } catch (error) {
                            console.log("El error es: " + error);
                        }
                    }
    }
    
    const asignarserieynumerotalonario = (idSorteo) =>{
        if(eleccionIdSorteo === 0 && eleccionNum_Talonario === 0)
                {
                    Alert.alert("Debe seleccionar un sorteo y una serie de talonario");
                }
        if(eleccionIdSorteo === 1 && eleccionNum_Talonario === 1)
                {
                        //GenerarBoleto = hacia donde va
                        navigation.navigate('AsignarSerieAEmpleado',{
                            //No es necesario colocar explicitamente la palabra "params"
                            //igual cuando revisas el route los params estan inherentes
                            //salvo que haya varias jerarquías o requieras enviar un dato
                            //hacia una pagina espefica o hacia dentro de un drawer o bottomtab
                            //params: {
                            //id: es la pantalla desde donde se está enviando el dato
                            id: 'AsignarSeries',
                            idSorteo: idSorteo,
                            serie_talonario: numeroTalonarioSeleccionado,
                            //}
                       })
                }
    }
    
    

useEffect(() => {
    console.log("ejecutando useEffect");
    buscarsorteos();
}, []);
        

  return (
    <View>
                <View
                  style={Styles.datospares}
                >
                    <Text>ASIGNAR SERIE</Text>
                </View>
                
                <View
                    //style={Styles.datospares}
                >
                    <Text>Elegir Sorteo</Text>

                    <SelectDropdown
                        data={dataRespuestaIDSorteos.map(e => e._id)} //dataRespuesta.map(e => e._id) lee solos los ID de los sorteos
                        onSelect={(selectedItem, index) => {
                            setEleccionIdSorteo(1)//para saber si ha seleccionado 1 elemento
                            setIdSorteoSeleccionado(selectedItem)//Captura el ID del sorteo seleccionado
                            buscartalonariosdisponibles(selectedItem,1)//Buscar los talonarios dependiendo del numero de sorteo y los muestra en el control SelectDropdown de series talonarios
                            
                            console.log(selectedItem, index)
                        }}
                        buttonTextAfterSelection={(selectedItem, index) => {
                            // text represented after item is selected
                            // if data array is an array of objects then return selectedItem.property to render after item is selected
                            return selectedItem
                        }}
                        rowTextForSelection={(item, index) => {
                            // text represented for each item in dropdown
                            // if data array is an array of objects then return item.property to represent item in dropdown
                            return item
                        }}
                    />
                    
                </View>

                <View
                    //style={Styles.datospares}
                >
                    <Text>Elegir Serie</Text>

                    <SelectDropdown
                        //data={dataRespuestaNumeroSorteo.map(e => e.serie_talonario)} //dataRespuesta.map(e => e._id) lee solos los ID de los sorteos
                        data={dataRespuestaNumeroSorteo} //ya no usa map porque ya esta filtrado dataRespuestaNumeroSorteo
                        onSelect={(selectedItem, index) => {
                            setEleccionNum_Talonario(1)
                            setNumeroTalonarioSeleccionado(selectedItem)
                            console.log(selectedItem, index)
                        }}
                        buttonTextAfterSelection={(selectedItem, index) => {
                            // text represented after item is selected
                            // if data array is an array of objects then return selectedItem.property to render after item is selected
                            return selectedItem
                        }}
                        rowTextForSelection={(item, index) => {
                            // text represented for each item in dropdown
                            // if data array is an array of objects then return item.property to represent item in dropdown
                            return item
                        }}
                    />
                    
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
                      //onPress={()=>buscartalonariosdisponibles(idSorteoSeleccionado, numeroTalonarioSeleccionado)}
                      onPress={()=>asignarserieynumerotalonario(idSorteoSeleccionado)}
                      asignarserieynumerotalonario
                      //onPress={()=>pasarpantalla()}
                    >
                          <Text
                          style = {{ fontSize: 15, backgroundColor: "yellow" }}
                          >ASIGNAR</Text>
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

export default AsignarSeries;

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