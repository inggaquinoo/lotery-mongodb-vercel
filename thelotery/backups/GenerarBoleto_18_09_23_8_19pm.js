import React, {useState, useEffect} from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Button } from 'react-native';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RNFS from 'react-native-fs';
import {request, PERMISSIONS} from 'react-native-permissions';
import Share from 'react-native-share';
import RNFetchBlob from 'rn-fetch-blob';
//import * as OpenAnything from "react-native-openanything";
//import { Base64 } from 'js-base64';
//import base64 from 'react-native-base64';
  
const GenerarBoleto = ({navigation, route}) => {
  //const fs = RNFetchBlob.fs;
  //const filePath = RNFS.DocumentDirectoryPath + "/joke.txt";
  //const filePath = RNFS.ExternalStorageDirectoryPath + "/joke.txt";
  //const [fileData, setFileData] = useState();

  
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
/*
  const sorteo_id = "route.params.IDSorteo;"
  const usuario_id = "route.params.IDusuario;"
  const descripcionarti = "route.params.descripcionarticulos;"
  const costoarti = "route.params.costoarticulos;"
  const nombrecli = "route.params.nombrecliente;"
  const apellidocli = "route.params.apellidocliente;"
  const celularclie = "route.params.celularcliente;"
  const fecha_compra = "2023-08-28";
  const estado_boleto = "1";
*/

// Liberar desde aqui cuando otorguen los permisos

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
      //const responseData = await response.json();
      

      console.log("BOLETO GRABADO EN BASE DE DATOS!!!")

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
          //directory: la ruta predeterminada y que no se puede cambiar es Documents dentro de la memoria
          //interna del móvil
          directory: 'Loteria',
          base64: true,
        };
        const file = await RNHTMLtoPDF.convert(options); //esta línea guarda el boleto en la carpeta del movil
        console.log("PDF GENERADO CON EXITO EN CARPETA DOCUMENTOS")
        console.log("CARPETA LOTERIA UBICADA EN  ->   "+file.filePath); //en este caso filePath es una
        //propiedad de file

        //console.log("RUTA EN FETCHBLOB ++++**++++   ->    "+RNFetchBlob.fs.dirs.DownloadDir)
        ///storage/emulated/0/Download
        //console.log("RUTA EN RNFS ++++**++++   ->    "+RNFS.DownloadDirectoryPath) 
        // /storage/emulated/0/Download
        
        console.log("INICIANDO COPIADO EN CARPETA PERSONALIZADA...")
        

                  const nombrearchivo = route.params.IDBoleto + '-' + route.params.nombrecliente + ' ' + route.params.apellidocliente
                  //En este caso RNFetchBlob.fs.dirs.DownloadDir = '/storage/emulated/0/Download'
                  //const filePath = RNFetchBlob.fs.dirs.DownloadDir + '/abc.pdf';
                  const filePath = RNFetchBlob.fs.dirs.DownloadDir + '/Loteria/'+nombrearchivo+'.pdf';
                  //console.log("RUTA EN FETCHBLOB ++**++    ->    "+RNFetchBlob.fs.dirs.DownloadDir)

                  //RNFetchBlob.fs.writeFile(filePath, file.base64, 'base64')  -> hace una copia del archivo
                  //ubicado en 'Documents' y la copia la pega en el diretorio que tú elijas 
                  //en este caso es en la ruta: filePath = RNFetchBlob.fs.dirs.DownloadDir + '/xxx.pdf';
                  RNFetchBlob.fs.writeFile(filePath, file.base64, 'base64') 
                    .then(response=>{
                      console.log("Éxito "+response);
                      console.log("DESDE DONDE COPIA EL ARCHIVO    ->    "+file.filePath) //Desde donde lo copia
                      console.log("LA COPIA SE GUARDA EN   ->    "+filePath) //En donde lo copia
                      Alert.alert(
                        'Información',
                        'Boleto generado con éxito, desea compartirlo?',
                        [
                          {text: 'Sí', onPress: () => compartirWhatsApp(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE, nombrearchivo)},
                          {text: 'No', onPress: () => regresarainicio(), style: 'cancel'},
                        ],
                        { 
                          cancelable: false //cuando toca fuera de la pantalla desaparece el control
                        }
                      );


                      
                    /*
                      request(permiso)
                        .then(result => {
                        console.log(result)
                        if (result === 'granted')
                              {
                              console.log("USANDO R N F S ")
                                  //RNFS.readFile('file:///storage/emulated/0/Download/abc.pdf', 'base64') //Esta ruta funciona y arroja la cadena larga con base64
                                  //RNFS.readFile(RNFS.DownloadDirectoryPath+'/abc.pdf', 'base64')// /storage/emulated/0/Download
                                  //declaro nombrearchivo2 para que obtenga de nuevo el nombre del archivo
                                  //const nombrearchivo2 = route.params.IDBoleto + '-' + route.params.nombrecliente + ' ' + route.params.apellidocliente
                                  RNFS.readFile(RNFS.DownloadDirectoryPath+'/Loteria/'+nombrearchivo+'.pdf', 'base64')// /storage/emulated/0/Download
                                  
                                  //Se le asigna la ruta 'file:///storage/emulated/0/Download/'
                                  //porque aqui va a buscar el archivo pdf para luego enviarlo por whatsapp
                                  //digamos que es una ruta aceptada (en donde lee por lo menos PDFs)
                                  
                                      .then(res => {
                                      console.log(res)
                                      //Preparando la cadena para enviar a url para compartir en Whatsapp
                                      const cadena = "data:application/pdf;base64,"+res;

                                            ///////////INICIANDO COMPARTIR CON WHATSAPP
                                            const shareOptions = {
                                              message: 'Hola Tavo te esta enviando un mensaje de prueba',
                                              social: Share.Social.WHATSAPP,
                                              url: cadena,
                                              whatsAppNumber: "51963815050",  // country code + phone number
                                              //filename: 'abc.pdf' , // filename es opcional, only for base64 file in Android
                                              };
                                                try {
                                                  //const ShareResponse = Share.open(shareOptions)
                                                  const ShareResponse = Share.shareSingle(shareOptions)
                                                  console.log(JSON.stringify(ShareResponse))
                                                  console.log("Share response      "+ShareResponse)
                                                }catch (error) {
                                                    console.log("error ->   "+error)
                                                }
                                                // para cuando envies directo a whatsapp
                                                //Share.shareSingle(shareOptions)
                                                //  .then((res) => { console.log(res) })
                                                //  .catch((err) => { err && console.log(err); });

                                      })
                                      //Si en caso hay errores al leer el archivo
                                      .catch(err => {
                                        console.log(err.message, err.code);
                                      });
                                  }
                                  else
                                  {
                                    console.log("No se concedió el permiso")
                                  }
                              })
                          .catch(err => {//Si en caso da error con el permiso
                             console.log(err.message, err.code);
                          });
                       */         
                  


                       })//si en caso da error al copiar el archivo en la carpeta Donwload
                         .catch(errors=>{
                           console.log("Error "+errors);
                       });


                    

                  
                  
                  
                  

                  /*
                  console.log("USANDO R N F S ")
                      //RNFS.readFile('file:///storage/emulated/0/Download/abc.pdf', 'base64') //Esta ruta funciona y arroja la cadena larga con base64
                      //RNFS.readFile(RNFS.DownloadDirectoryPath+'/abc.pdf', 'base64')// /storage/emulated/0/Download
                      //declaro nombrearchivo2 para que obtenga de nuevo el nombre del archivo
                      const nombrearchivo2 = route.params.IDBoleto + '-' + route.params.nombrecliente + ' ' + route.params.apellidocliente
                      RNFS.readFile(RNFS.DownloadDirectoryPath+'/Loteria/'+nombrearchivo2+'.pdf', 'base64')// /storage/emulated/0/Download
                      
                      //Se le asigna la ruta 'file:///storage/emulated/0/Download/'
                      //porque aqui va a buscar el archivo pdf para luego enviarlo por whatsapp
                      //digamos que es una ruta aceptada (en donde lee por lo menos PDFs)
                      
                      .then(res => {
                      console.log(res)
                      //Preparando la cadena para enviar a url para compartir en Whatsapp
                      const cadena = "data:application/pdf;base64,"+res;

                            ///////////INICIANDO COMPARTIR CON WHATSAPP
                            const shareOptions = {
                              message: 'Hola Tavo te esta enviando un mensaje de prueba',
                              social: Share.Social.WHATSAPP,
                              url: cadena,
                              whatsAppNumber: "51963815050",  // country code + phone number
                              //filename: 'abc.pdf' , // filename es opcional, only for base64 file in Android
                              };
                                try {
                                  //const ShareResponse = Share.open(shareOptions)
                                  const ShareResponse = Share.shareSingle(shareOptions)
                                  console.log(JSON.stringify(ShareResponse))
                                  console.log("Share response      "+ShareResponse)
                                }catch (error) {
                                    console.log("error ->   "+error)
                                }
                                // para cuando envies directo a whatsapp
                                //Share.shareSingle(shareOptions)
                                //  .then((res) => { console.log(res) })
                                //  .catch((err) => { err && console.log(err); });

                      })
                      //Si en caso hay errores al leer el archivo
                      .catch(err => {
                        console.log(err.message, err.code);
                      });
                    */
            
          
      } 
      catch (error) { //error si en caso algo no sale bien con la generacion del PDF
        //Alert.alert(error);
        console.log("Error al generar PDF ->     "+error)
      }
      //navigation.navigate('ListadoSorteos')
}
//Liberar desde aqui cuando otorguen los permisos

const regresarainicio = () => {
  navigation.navigate('ListadoSorteos');
}

const compartirWhatsApp = (permiso, nombrearchivooriginal) => {
      request(permiso)
      .then(result => {
        console.log(result)
        if (result === 'granted')
              {
                console.log("AQUI IRIA LA PARTE DE ACCEDER AL ARCHIVO")

                  ///NOTAS IMPORTANTES
                  //RNFS.ExternalDirectoryPath -> cada uno de estas extensiones despues de RNFS apunta
                  //hacia lugares distintos en el móvil y todos no leen los archivos PDF ni word!!!
                  
                      console.log("USANDO R N F S ")
                      //RNFS.readFile('file:///storage/emulated/0/Download/abc.pdf', 'base64') //Esta ruta funciona y arroja la cadena larga con base64
                      //RNFS.readFile(RNFS.DownloadDirectoryPath+'/abc.pdf', 'base64')// /storage/emulated/0/Download

                      //const nombrearchivo2 = route.params.IDBoleto + '-' + route.params.nombrecliente + ' ' + route.params.apellidocliente
                      RNFS.readFile(RNFS.DownloadDirectoryPath+'/Loteria/'+nombrearchivooriginal+'.pdf', 'base64')// /storage/emulated/0/Download
                      
                      //Se le asigna la ruta 'file:///storage/emulated/0/Download/'
                      //porque aqui va a buscar el archivo pdf para luego enviarlo por whatsapp
                      //digamos que es una ruta aceptada (en donde lee por lo menos PDFs)
                      
                      .then(res => {
                      console.log(res)
                      //Preparando la cadena para enviar a url para compartir en Whatsapp
                      const cadena = "data:application/pdf;base64,"+res;

                            ///////////INICIANDO COMPARTIR CON WHATSAPP
                            const shareOptions = {
                              message: 'Envio de comprobante de Lotería',
                              social: Share.Social.WHATSAPP,
                              url: cadena,
                              whatsAppNumber: "51963815050",  // country code + phone number
                              //filename: 'abc.pdf' , // filename es opcional, only for base64 file in Android
                              };
                                try {
                                  //const ShareResponse = Share.open(shareOptions)
                                  const ShareResponse = Share.shareSingle(shareOptions)
                                  console.log(JSON.stringify(ShareResponse))
                                  console.log("Share response      "+ShareResponse)
                                }catch (error) {
                                    console.log("error ->   "+error)
                                }
                                // para cuando envies directo a whatsapp
                                //Share.shareSingle(shareOptions)
                                //  .then((res) => { console.log(res) })
                                //  .catch((err) => { err && console.log(err); });
                      
                      navigation.navigate('ListadoSorteos'); //regresa a la pantalla sorteos
                      })
                      //Si en caso hay errores al leer el archivo
                      .catch(err => {
                        console.log(err.message, err.code);
                      });
    
              }
        else
              {
                console.log("No se concedió el permiso")
              }
        }) //Fin del .then(result => {
}




  return (
    <View>
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
              onPress={()=>GenerarBoletoComprobante(usuario_id, fecha_compra,estado_boleto, PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE)}
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

          </View>

          <TouchableOpacity
              onPress={()=>compartirWhatsApp(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE)}
            >
                  <Text
                  style = {{ fontSize: 15, backgroundColor: "yellow" }}
                  >COMPARTIR</Text>
            </TouchableOpacity>

            <View>
              <Text>---</Text>
            </View>

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