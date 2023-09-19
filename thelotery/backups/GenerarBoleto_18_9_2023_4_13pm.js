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
          //directory: la ruta predeterminada y que no se puede cambiar es Documents dentro de la memoria
          //interna del móvil
          directory: 'Loteria',
          base64: true,
        };
        const file = await RNHTMLtoPDF.convert(options); //esta línea guarda el boleto en la carpeta del movil
        console.log("CARPETA LOTERIA UBICADA EN  ->   "+file.filePath); //en este caso filePath es una
        //propiedad de file

        
        
        //console.log("RUTA EN FETCHBLOB ++++**++++   ->    "+RNFetchBlob.fs.dirs.CacheDir) 
        // /data/user/0/com.thelotery/cache
        //console.log("RUTA EN RNFS ++++**++++   ->    "+RNFS.CachesDirectoryPath) 
        // /data/user/0/com.thelotery/cache
        ///------------------
        //console.log("RUTA EN RNFS ++++**++++   ->    "+RNFS.DocumentDirectoryPath) 
        // /data/user/0/com.thelotery/files


        /*
        console.log("INCIANDO COPIADO EN CARPETA PERSONALIZADA...")

        //En este caso RNFetchBlob.fs.dirs.CacheDir = '/data/user/0/com.thelotery/cache'
        const filePath = RNFetchBlob.fs.dirs.CacheDir + '/abc.pdf';
        console.log("RUTA EN FETCHBLOB ++**++    ->    "+RNFetchBlob.fs.dirs.CacheDir)

        //RNFetchBlob.fs.writeFile(filePath, file.base64, 'base64')  -> hace una copia del archivo
        //ubicado en 'Documents' y la copia la pega en el diretorio que tú elijas 
        //en este caso es en la ruta: filePath = RNFetchBlob.fs.dirs.CacheDir + '/xxx.pdf';
        RNFetchBlob.fs.writeFile(filePath, file.base64, 'base64') 
          .then(response=>{
            console.log("Exito "+response);
          })
          .catch(errors=>{
            console.log("Error "+errors);
          })

          console.log("DESDE DONDE COPIA EL ARCHIVO    ->    "+file.filePath) //Desde donde lo copia
          console.log("LA COPIA SE GUARDA EN   ->    "+filePath) //En donde lo copia

          */


          ///CREANDO CARPETA PERSONALIZADA
          //
          // /storage/emulated/0/Android/data/com.thelotery/files
          /*
          diracrear = RNFetchBlob.fs.dirs.CacheDir + '/com.thelotery/cache'
          RNFetchBlob.fs.mkdir(diracrear)
          .then((success) => {
            console.log('DIR WAS CREATED -> '+success);
          })
          .catch((err) => {
            console.log(err.message);
          });
          */
         ////////

          /////OTRA CREACION DE CARPETA
          /*
          diracrear = RNFS.ExternalDirectoryPath + '/carpetadeprueba';
          console.log("EXTERNAL DIRECTORY PATH->       "+diracrear);
          RNFS.mkdir(diracrear)
          .then((success) => {
            console.log('DIR WAS CREATED -> '+success);
          })
          .catch((err) => {
            console.log(err.message);
          });
          */
          ////


          ////USANDO RNFS PARA COPIAR ARCHIVOS EN CUALQUIER CARPETA 
          //Esto sí funciona pero debes tener cuidado con las rutas admitidas
          /*
          console.log("DESDE file.filePath->      "+filePathRNFS) 
          
          //const filePathRNFS = RNFS.ExternalDirectoryPath + '/abc.pdf';
          const filePathRNFS = RNFS.ExternalDirectoryPath + '/abcX.pdf';
          const filePathRNFSX = RNFS.DownloadDirectoryPath + '/abcxxx.pdf';
          console.log("HACIA filePathRNFS->      "+filePathRNFSX) // /storage/emulated/0/Android/data/com.thelotery/files
          
          
          console.log("CARPETA DESDE","HACIA DONDE VA");

          
          RNFS.copyFile(filePathRNFS, filePathRNFSX)
          .then((success) => {
            console.log('FILE WRITTEN!'+success);
            console.log("COPIA EXITOSA CON RNFS!!!"+success)

          })
          .catch((err) => {
            console.log(err.message);
          });
          */
          ////





          ////USANDO RNFS PARA COPIAR ARCHIVOS EN CUALQUIER CARPETA //no funciona
          /*
          const filePathRNFS = RNFS.ExternalDirectoryPath + '/abc.pdf';
          console.log("RUTA DE filePathRNFS->      "+RNFS.ExternalDirectoryPath) // /storage/emulated/0/Android/data/com.thelotery/files
          
          RNFS.writeFile(filePathRNFS,'contenido hecho por tavo', 'base64')//no funciona
          
          .then((success) => {
            console.log('FILE WRITTEN!'+success);
            console.log("COPIA EXITOSA CON RNFS!!!"+success)

          })
          .catch((err) => {
            console.log(err.message);
          });
          */
          ////
        
          /*
          console.log("----LEYENDO DIRECTO DESDE FETCHBLOB----")//Esto tambien arroja la cadena larga
          //con base 64, ten en cuenta que el filePath debe de ser una ruta válida
          RNFetchBlob.fs.readFile(filePath, 'base64')
            .then(respuesta=>{
              console.log("Exito  "+ respuesta);
            })
          */
        
        
        //https://www.exteriores.gob.es/documents/fichaspais/peru_ficha%20pais.pdf
        //Alert.alert('Success', `Boleto guardado en: ${file.filePath}`);
        //Alert.alert('Success', 'PDF saved to');

         ///USANDO FETCH BLOB PARA LEER ARCHIVO PDF
         /*
         console.log("USANDO FETCH BLOB")
         fetch('file:///storage/emulated/0/Documents/Loteria/abc.pdf')
             .then(res => res.blob)
             .then(blob => console.log(blob))
             .then(blob => {
               const file = new File([blob], 'pdf', {type: blob.type});

               const fr = new FileReader();
               fr.readAsText(file);
               fr.addEventListener('load', ()=>{
                 const finalres = fr.result;
                 console.log("El resultado final es: ->     "+finalres); 
               })
             })
            */
        
        
      } 
      catch (error) {
        Alert.alert(error);

      }

      //navigation.navigate('ListadoSorteos')
     
}
//Liberar desde aqui cuando otorguen los permisos
 


const pedirpermisoindian = (permiso) => {
      request(permiso)
      .then(result => {
        console.log(result)
        if (result === 'granted')
              {
                console.log("AQUI IRIA LA PARTE DE ACCEDER AL ARCHIVO")
            //otro intento
                  // get a list of files and directories in the main bundle
                  //RNFS.readDir(RNFS.ExternalDirectoryPath) // On Android, use "RNFS.DocumentDirectoryPath" (MainBundlePath is not defined)
                  //RNFS.readDir(RNFS.ExternalDirectoryPath) // On Android, use "RNFS.DocumentDirectoryPath" (MainBundlePath is not defined)

                  ///NOTAS IMPORTANTES
                  //RNFS.ExternalDirectoryPath -> cada uno de estas extensiones despues de RNFS apunta
                  //hacia lugares distintos en el móvil y todos no leen los archivos PDF ni word!!!
                                    
                  //https://www.youtube.com/watch?v=amTnwvJF8CA //Mira este video para
                  //que copies el archivo hacia una carpeta desde donde sí se pueda leer el PDF
                  ////******************** */
                  
                  
                  // readFile(filepath: string, encoding?: string)
                      console.log("USANDO R N F S ")
                      //RNFS.readFile('file:///storage/emulated/0/Android/data/com.thelotery/cache/abc.pdf', 'base64') //Esta ruta funciona y arroja la cadena larga con base64
                      RNFS.readFile(RNFS.ExternalDirectoryPath+'/abc.pdf', 'base64')// /storage/emulated/0/Android/data/com.thelotery/files

                      
                      //Se le asigna la ruta 'file:///storage/emulated/0/Android/data/com.thelotery/cache/'
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
                              //whatsAppNumber: "9199999999",  // country code + phone number
                              filename: 'abc.pdf' , // only for base64 file in Android
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
                      .catch(err => {
                        console.log(err.message, err.code);
                      });

                  //Cuando lees directorios y adentro archivos
                  /*
                  RNFS.readDir(              
                    "file:///storage/emulated/0/Android/data/com.thelotery/files/abc.pdf"
                    ) // On Android, use "RNFS.DocumentDirectoryPath" (MainBundlePath is not defined)
                  .then((result) => {
                    console.log('------- +++++++++++++ GOT RESULT ++++++++++++++', result);

                    // stat the first file
                    return Promise.all([RNFS.stat(result[0].path), result[0].path]);
                  })

                  .then((statResult) => {
                    if (statResult[0].isFile()) {
                      // if we have a file, read it
                      //return RNFS.readFile(statResult[1], 'utf8');
                      return RNFS.readFile(statResult[1], 'base64'); //base64 fue la clave para poder compartir el archivo PDF
                    }
                    return 'no file';
                  })

                  .then((contents) => {
                    // log the file contents
                    //console.log(contents);
                    //const cadena = "data:application/pdf;base64,"+contents;
                    */

                 
                    

                      
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

          </View>

          <TouchableOpacity
              onPress={()=>pedirpermisoindian(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE)}
            >
                  <Text
                  style = {{ fontSize: 15, backgroundColor: "yellow" }}
                  >PERMISO INDIAN</Text>
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