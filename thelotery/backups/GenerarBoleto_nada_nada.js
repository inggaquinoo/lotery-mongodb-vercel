import React, {useState, useEffect} from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Button } from 'react-native';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RNFS from 'react-native-fs';
import {request, PERMISSIONS} from 'react-native-permissions';
//import * as OpenAnything from "react-native-openanything";


  
const GenerarBoleto = ({navigation, route}) => {

  //const filePath = RNFS.DocumentDirectoryPath + "/joke.txt";
  const filePath = RNFS.ExternalStorageDirectoryPath + "/joke.txt";
  const [fileData, setFileData] = useState();

  
  //route.params.id
  //console.log("route.params ->    " + route.params.IDBoleto)

  //Todo esto borrar
  /*
  const sorteo_id = "123";
  const usuario_id = "123";
  const descripcionarti = "hola";
  const costoarti = "99";
  const nombrecli = "nombre";
  const apellidocli = "apellido";
  const celularclie = "celu";
  const fecha_compra = "2023-08-28";
  const estado_boleto = "1";
  */

  //lo que sigue borralo, es solo para que no te de error

  const sorteo_id = "route.params.IDSorteo;"
  const usuario_id = "route.params.IDusuario;"
  const descripcionarti = "route.params.descripcionarticulos;"
  const costoarti = "route.params.costoarticulos;"
  const nombrecli = "route.params.nombrecliente;"
  const apellidocli = "route.params.apellidocliente;"
  const celularclie = "route.params.celularcliente;"
  const fecha_compra = "2023-08-28";
  const estado_boleto = "1";


/* Liberar desde aqui cuando otorguen los permisos

  const sorteo_id = route.params.IDSorteo;
  const usuario_id = route.params.IDusuario;
  const descripcionarti = route.params.descripcionarticulos;
  const costoarti = route.params.costoarticulos;
  const nombrecli = route.params.nombrecliente;
  const apellidocli = route.params.apellidocliente;
  const celularclie = route.params.celularcliente;
  const fecha_compra = "2023-08-28";
  const estado_boleto = "1";



  const GenerarBoletoComprobante = async(usuario_id, fecha_compra, estado_boleto) => {
    //En este caso _id es el id del boleto

    console.log("Comenzando generación de Boleto")
    console.log("IDBoleto ->    "+route.params.IDBoleto);
    console.log("usuario_id ->    "+usuario_id);
    console.log("fecha_compra ->    "+fecha_compra);
    console.log("estado_boleto ->    "+estado_boleto);

    //console.log("Guardando cliente...")
    //console.log("Valores ->    " + name + " " + apellido + " " + numcelular)
    //const response = await fetch(`http://192.168.18.10:5000/api/sorteos/${route.params.IDBoleto}`,{
    //const response = await fetch(`http://192.168.101.20:5000/api/sorteos/${route.params.IDBoleto}`,{

    const response = await fetch(`https://lotery-mongodb-vercel.vercel.app/api/sorteos/${route.params.IDBoleto}`,{
          method: 'PUT',
          headers: {
              'Content-type': 'application/json'//Indica que la solicitud a utilizar esta en formato JSON
          },
          body: JSON.stringify({
            usuario_id: usuario_id,
            fecha_compra: fecha_compra,
            estado_boleto: estado_boleto
          })
      })
      const responseData = await response.json();

      console.log("BOLETO GENERADO EXITOSAMENTE!!!")

      //DE HTML HACIA PDF

      try {
        const html = `
          <html>
            <head>
              <style>
                body {
                  font-family: 'Helvetica';
                  font-size: 12px;
                }
                header, footer {
                  height: 50px;
                  background-color: #fff;
                  color: #000;
                  display: flex;
                  justify-content: center;
                  padding: 0 20px;
                }
                table {
                  width: 100%;
                  border-collapse: collapse;
                }
                th, td {
                  border: 1px solid #000;
                  padding: 5px;
                }
                th {
                  background-color: #ccc;
                }
              </style>
            </head>
            <body>
              <header>
                <h1>Lotería "Nueva Lotería"</h1>
              </header>
              <h1>Información Importante:</h1>
              <table>
                <tr>
                  <th>SORTEO</th>
                  <td>${sorteo_id}</td> 
                </tr>
                <tr>
                  <th>BOLETO</th>
                  <td>${route.params.IDBoleto}</td>
                </tr>
                <tr>
                  <th>PREMIOS</th>
                  <td>${descripcionarti}</td>
                </tr>
                <tr>
                  <th>COSTO</th>
                  <td>${costoarti}</td>
                </tr>
                <tr>
                  <th>NOMBRES</th>
                  <td>${nombrecli}</td>
                </tr>
                <tr>
                  <th>APELLIDOS</th>
                  <td>${apellidocli}</td>
                </tr>
                <tr>
                  <th>CELULAR</th>
                  <td>${celularclie}</td>
                </tr>
                <tr>
                  <th>FECHA DE COMPRA</th>
                  <td>${fecha_compra}</td>
                </tr>
                <tr>
                  <th>TERMINOS Y CONDICIONES</th>
                  <td>terminos y condiciones</td>
                </tr>
              </table>
              <footer>
                <p>Gracias por participar. Suerte!</p>
              </footer>
            </body>
          </html>
        `;
        const options = {
          html,
          fileName: `${route.params.IDBoleto}-${route.params.nombrecliente} ${route.params.apellidocliente}`,
          directory: 'Loteria888',
        };
        const file = await RNHTMLtoPDF.convert(options); //esta línea guarda el boleto en la carpeta del movil
        console.log("Ya se guardó en la carpeta LOTERÍA DEL MOVIL")
        //OpenAnything.Pdf('file:///storage/emulated/0/Documents/Loteria/abc.pdf')
        //OpenAnything.Pdf('https://www.exteriores.gob.es/documents/fichaspais/peru_ficha%20pais.pdf')

        //https://www.exteriores.gob.es/documents/fichaspais/peru_ficha%20pais.pdf
        //Alert.alert('Success', `Boleto guardado en: ${file.filePath}`);
        //Alert.alert('Success', 'PDF saved to');
        
        //setCount(count + 1);
        //setIsLoading(false);
      } 
      catch (error) {
        Alert.alert(error);

      }

      //navigation.navigate('ListadoSorteos')
     
}
Liberar desde aqui cuando otorguen los permisos
*/ 

/*
const permisoPdf = async() => {

  try {
  
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      //PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      //PermissionsAndroid.PERMISSIONS.CAMERA,

 
      {
        title: "Permiso",
        message: "necesitas permiso",
        buttonNeutral: "Ask me later",
        buttonNegative: "Cancel",
        buttonPositive: "OK"
      }
  
      );
      console.log("que es granted: ->     "+granted)
      console.log("que es PermissionsAndroid.RESULTS.granted: ->     "+PermissionsAndroid.RESULTS.granted)
      if(granted === PermissionsAndroid.RESULTS.granted){
        return true;
      }else{
        console.log("Denegado")
        return false;
      }
         
    } catch (err) {
      console.warn(err)
      return false;
      }

}
*/
/*
const mostrarPdf = () => {


  try {

    RNFS.readFile('/storage/emulated/0/Download/Nearby Share/abcd.pdf', 'base64')
    
     .then((contents) => {
      // log the file contents
      //console.log("Este es el contenido: ->   "+contents);
    if (statResult[0].isFile()) {
      console.log("Es un archivo")
    }
    })
  
  }catch (err) {
  console.log('ERROR AL ALMACENAR EL PDF:', err);
  }
  
  
}
*/

const pedirpermisoindian = (permiso) => {

    try {

      request(permiso)

      .then(result => {
        console.log(result)
        if (result === 'granted')
        {
          console.log("AQUI IRIA LA PARTE DE ACCEDER AL ARCHIVO")
          const pathlocal = RNFS.ExternalStorageDirectoryPath + "/joke.txt"
          console.log("RUTA EN LA QUE BUSCA->     "+pathlocal, 'utf-8')
          const response = RNFS.readFile(pathlocal);
              setFileData(response); //set the value of response to the fileData Hook.
        }
        else
        {
          console.log("No se concedió el permiso")
        }
        
        
      })


      



    }catch (err) {
    console.log('NO SE OTORGÓ EL PERMISO NECESARIO:', err);
    }

}

/*
const readFile = async (path) => {
  
  const response = await RNFS.readFile(path);
  setFileData(response); //set the value of response to the fileData Hook.
  
};
*/

/*
useEffect(() => {
  readFile(filePath);
}, []);
*/

  return (
    <View>
        <View>
            <Text>fileData</Text>
        </View>    
        
        
        
        
        
        <View
          style={Styles.datospares}
        >
            <Text>SORTEO:</Text>
            <Text
            //value={sorteo_id}
            //value="HOLA"
            > {sorteo_id}</Text>
        </View>

        <View
          style={Styles.datospares}
        >
            <Text>BOLETO:</Text>
            <Text
            //value={name}
            //value="HOLA"
            > {
            123
            //route.params.IDBoleto
            
            }</Text>
        </View>

        <View
          style={Styles.datospares}
        >
            <Text>DESCRIPCION:</Text>
            <Text
            //value={name}
            //value="HOLA"
            > {descripcionarti}</Text>
        </View>

        <View
          style={Styles.datospares}
        >
            <Text>COSTO:</Text>
            <Text
            //value={name}
            //value="HOLA"
            > US$ {costoarti}</Text>
        </View>

        <View
          style={Styles.datospares}
        >
            <Text>NOMBRE:</Text>
            <Text
            //value={name}
            //value="HOLA"
            > {nombrecli}</Text>
        </View>

        <View
          style={Styles.datospares}
        >
            <Text>APELLIDOS:</Text>
            <Text
            //value={name}
            //value="HOLA"
            > {apellidocli}</Text>
        </View>

        <View
          style={Styles.datospares}
        >
            <Text>CELULAR:</Text>
            <Text
            //value={name}
            //value="HOLA"
            > {celularclie}</Text>
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
              onPress={()=>GenerarBoletoComprobante(usuario_id, fecha_compra,estado_boleto)}
              
              //onPress={()=>OpenAnything.Text("555555555")} //sí funciona
              //onPress={()=>OpenAnything.Open("https://www.exteriores.gob.es/documents/fichaspais/peru_ficha%20pais.pdf")} //sí funciona
              //onPress={()=>OpenAnything.Pdf("https://www.exteriores.gob.es/documents/fichaspais/peru_ficha%20pais.pdf").catch(err => console.error(err))  
            >
                  <Text
                  style = {{ fontSize: 15, backgroundColor: "yellow" }}
                  >GENERAR BOLETO</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={()=>console.log("Cancelando...")}
            >
                  <Text
                  style = {{ fontSize: 15, backgroundColor: "yellow" }}
                  >CANCELAR</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={()=>mostrarPdf()}
            >
                  <Text
                  style = {{ fontSize: 15, backgroundColor: "yellow" }}
                  >MOSTRAR PDF</Text>
            </TouchableOpacity>

            <Button
              title="Permiso"
              message= "necesitas permiso"
              buttonNeutral= "Ask me later"
              buttonNegative= "Cancel"
              buttonPositive= "OK"
              onPress={()=>permisoPdf()}
            >
                  <Text
                  style = {{ fontSize: 15, backgroundColor: "yellow" }}
                  >PERMISO</Text>
            </Button>
          </View>

          <TouchableOpacity
              onPress={()=>pedirpermisoindian(PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE)}
            >
                  <Text
                  style = {{ fontSize: 15, backgroundColor: "yellow" }}
                  >PERMISO INDIAN</Text>
            </TouchableOpacity>


    </View>
  )
}

export default GenerarBoleto;


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