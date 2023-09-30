import React, {useState, useEffect} from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';



const AsignarSeries = ({navigation, route}) => {

    const [isOpen, setisOpen] = useState(false);
    const [currentValue, setCurrentValue] = useState();
    const [dataRespuesta, setDataRespuesta] = useState([])

    const buscarsorteos = async() => {
        try {
            const response = await fetch('http://192.168.101.20:5000/api/sorteos')
            const data = await response.json();
            setDataRespuesta(data)
        } catch (error) {
            console.log("El error es: " + error);
        }
        
    }
                //arrayidsorteos se crea con la forma para que ingrese al DropDownPicker
                /*
                const arrayidsorteos = [
                     {
                       label: `${dataRespuesta.map(item => (item._id))}`, value: `${dataRespuesta.map(item => (item._id))}`
                     }
                  ]
                */

                  
                  //asi debe quedar

                  
                  const arrayidsorteos = [
                        {label: 'Item 1', value: 'item1'},
                        {label: 'Item 2', value: 'item2'}
                    ]
                    

                    //const arrayidsorteos = ["1","2","3"]

                  
                 //const response = await fetch(`http://192.168.101.20:5000/api/sorteos/boletocomprado/${route.params.valorIDBoleto}`,{
                  /*
                  const arrayidsorteos = []
                  for (var i=0; i < 1; i++)
                    {
                        const arrayidsorteos = new Array;
                        arrayidsorteos.push(i)
                       
                    }
                
                console.log("arrayidsorteos "+arrayidsorteos)
                console.log("arrayidsorteos typeof "+ typeof arrayidsorteos)
                console.log("arrayidsorteos "+JSON.stringify(arrayidsorteos))
*/

                /*SALIDA EN CONSOLA DE LO CORRECTO

                    arrayidsorteos [object Object],[object Object]
                    arrayidsorteos typeof object
                    arrayidsorteos [{"label":"Item 1","value":"item1"},{"label":"Item 2","value":"item2"}]
                */
                


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
                    <Text>Elegir Sorteo: DROPDOWNPICKER</Text>


                    <DropDownPicker
                        //key={arrayidsorteos}
                        open={isOpen}
                        value={currentValue}
                        items={arrayidsorteos}
                        setOpen={()=> setisOpen(!isOpen)}
                        setValue={(val)=>setCurrentValue(val)}
                    />


                    
                </View>

                <View
                    style={Styles.datospares}
                >
                    <Text>Series Disponibles:</Text>
                    <TextInput
                        style={Styles.input}
                        placeholder='Ingrese Cantidad'
                        keyboardType="numeric"
                        //onChangeText={(value) => setCantidadVendedores(value)}
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
                      //onPress={()=>generarcantvendedores()}
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