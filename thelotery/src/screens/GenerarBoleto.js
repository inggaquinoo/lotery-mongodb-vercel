import React, {useState, useEffect} from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Button } from 'react-native';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RNFS from 'react-native-fs';
import {request, PERMISSIONS} from 'react-native-permissions';
import Share from 'react-native-share';
import RNFetchBlob from 'rn-fetch-blob';
  
const GenerarBoleto = ({navigation, route}) => {
  
  //route.params.id
  //console.log("route.params ->    " + route.params.IDBoleto)

  const sorteo_id = route.params.IDSorteo;
  //const usuario_id = route.params.IDusuario;
  const descripcionarti = route.params.descripcionarticulos;
  const costoarti = route.params.costoarticulos;
  const nombrecli = route.params.nombrecliente;
  const apellidocli = route.params.apellidocliente;
  const celularclie = route.params.celularcliente;
  const serietalonario = route.params.serietalonario;
  const numero_boleto = route.params.numero_boleto;
  const nombrevendedorasignado = route.params.nombrevendedorasignado;
  const apellidovendedorasignado = route.params.apellidovendedorasignado;
  const terminos_condiciones = route.params.terminos_condiciones;
  const fecha_sorteo = route.params.fecha_sorteo;
  const lugar_sorteo = route.params.lugar_sorteo;
  
  //Constantes para la fecha de compra
  const anio = route.params.anio;
  const mes = route.params.mes;
  const dia = route.params.dia;
  const hora = route.params.hora;
  const minuto = route.params.minuto;
  const segundo = route.params.segundo;

  //Cadena fecha de compra
  const fechadecompra = dia+"/"+mes+"/"+anio+" - "+hora+":"+minuto+":"+segundo
  
  //console.log("PANTALLA GENERAR BOLETO - SERIE TALONARIO      "+serietalonario)
  
  //const GenerarBoletoComprobante = async(usuario_id, fecha_compra, estado_boleto) => {
  const GenerarBoletoComprobante = async(fechadecompra) => {
    /*
    console.log("Comenzando generación de Boleto")
    console.log("IDBoleto ->    "+route.params.IDBoleto);
    console.log("usuario_id ->    "+usuario_id);
    console.log("fecha_compra ->    "+fecha_compra);
    console.log("estado_boleto ->    "+estado_boleto);
    */

      //DE HTML HACIA PDF
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
                  <h1>DATOS DEL SORTEO</h1>
                  <table>
                    <tr>
                      <th>SORTEO</th>
                      <td>${sorteo_id}</td> 
                    </tr>
                    <tr>
                      <th>SERIE</th>
                      <td>${serietalonario}</td>
                    </tr>
                    <tr>
                      <th>BOLETO</th>
                      <td>${numero_boleto}</td>
                    </tr>
                    <tr>
                      <th>PREMIOS</th>
                      <td>${descripcionarti}</td>
                    </tr>
                    <tr>
                      <th>COSTO</th>
                      <td>US$ ${costoarti}.00</td>
                    </tr>
                    <tr>
                      <th>FECHA DE COMPRA</th>
                      <td>${fechadecompra}</td>
                    </tr>
                    <tr>
                      <th>FECHA DE SORTEO</th>
                      <td>${fecha_sorteo}</td>
                    </tr>
                    <tr>
                      <th>LUGAR DEL SORTEO</th>
                      <td>${lugar_sorteo}</td>
                    </tr>
                  </table>
                  <h1>DATOS DEL CLIENTE</h1>
                  <table>
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
                  </table>
                  <h1>DATOS DEL VENDEDOR</h1>
                  <table>
                    <tr>
                      <th>NOMBRES</th>
                      <td>${nombrevendedorasignado}</td>
                    </tr>
                    <tr>
                      <th>APELLIDOS</th>
                      <td>${apellidovendedorasignado}</td>
                    </tr>
                  </table>
                  <h1>TERMINOS Y CONDICIONES</h1>
                  <table>
                    <tr>
                      <th>TERMINOS Y CONDICIONES</th>
                      <td>${terminos_condiciones}</td>
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
        
        //console.log("PDF GENERADO CON EXITO EN CARPETA DOCUMENTOS")
        //console.log("CARPETA LOTERIA UBICADA EN  ->   "+file.filePath); //en este caso filePath es una
        //propiedad de file

        //console.log("RUTA EN FETCHBLOB ++++**++++   ->    "+RNFetchBlob.fs.dirs.DownloadDir)
        ///storage/emulated/0/Download
        //console.log("RUTA EN RNFS ++++**++++   ->    "+RNFS.DownloadDirectoryPath) 
        // /storage/emulated/0/Download
        
        //console.log("INICIANDO COPIADO EN CARPETA PERSONALIZADA...")
        

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
                      //console.log("Éxito "+response);
                      //console.log("DESDE DONDE COPIA EL ARCHIVO    ->    "+file.filePath) //Desde donde lo copia
                      //console.log("LA COPIA SE GUARDA EN   ->    "+filePath) //En donde lo copia
                      Alert.alert(
                        'Información',
                        'Boleto generado con éxito, desea compartirlo?',
                        [
                          {text: 'Sí', onPress: () => compartirWhatsApp(PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE, nombrearchivo)},
                          {text: 'No', onPress: () => regresarainicio(), style: 'cancel'},
                        ],
                        { 
                          cancelable: false //cuando toca fuera de la pantalla NO desaparece el control
                        }
                      );
                    

                       })//si en caso da error al copiar el archivo en la carpeta Donwload
                         .catch(errors=>{
                           //console.log("Error "+errors);
                       });
                  
}

const regresarainicio = () => {
  navigation.navigate('ListadoSorteos');
}

const compartirWhatsApp = (permiso, nombrearchivooriginal) => {
      request(permiso)
      .then(result => {
        //console.log(result)
        if (result === 'granted')
              {
                //console.log("AQUI IRIA LA PARTE DE ACCEDER AL ARCHIVO")

                  ///NOTAS IMPORTANTES
                  //RNFS.ExternalDirectoryPath -> cada uno de estas extensiones despues de RNFS apunta
                  //hacia lugares distintos en el móvil y todos no leen los archivos PDF ni word!!!
                  
                      //console.log("USANDO R N F S ")
                      //RNFS.readFile('file:///storage/emulated/0/Download/abc.pdf', 'base64') //Esta ruta funciona y arroja la cadena larga con base64
                      //RNFS.readFile(RNFS.DownloadDirectoryPath+'/abc.pdf', 'base64')// /storage/emulated/0/Download

                      RNFS.readFile(RNFS.DownloadDirectoryPath+'/Loteria/'+nombrearchivooriginal+'.pdf', 'base64')// /storage/emulated/0/Download
                      
                      //Se le asigna la ruta 'file:///storage/emulated/0/Download/'
                      //porque aqui va a buscar el archivo pdf para luego enviarlo por whatsapp
                      //digamos que es una ruta aceptada (en donde lee por lo menos PDFs)
                      
                      .then(res => {
                      //console.log(res)
                      //Preparando la cadena para enviar a url para compartir en Whatsapp
                      const cadena = "data:application/pdf;base64,"+res;

                            ///////////INICIANDO COMPARTIR CON WHATSAPP
                            const shareOptions = {
                              message: 'Envio de comprobante de Lotería',
                              social: Share.Social.WHATSAPP,
                              url: cadena,
                              //whatsAppNumber: "51999666111",  // country code + phone number
                              //filename: 'abc.pdf' , // filename es opcional, only for base64 file in Android
                              };
                                try {
                                  //const ShareResponse = Share.open(shareOptions)
                                  const ShareResponse = Share.shareSingle(shareOptions)
                                  //console.log(JSON.stringify(ShareResponse))
                                  //console.log("Share response      "+ShareResponse)
                                }catch (error) {
                                    //console.log("error ->   "+error)
                                }
                      
                      navigation.navigate('ListadoSorteos'); //regresa a la pantalla sorteos
                      })
                      //Si en caso hay errores al leer el archivo
                      .catch(err => {
                        //console.log(err.message, err.code);
                      });
    
              }
        else
              {
                //console.log("No se concedió el permiso")
              }
        })
}

  return (
    <View>
       <View
          style={Styles.datospares}
        >
            <Text>----------DATOS DEL SORTEO----------</Text>
        </View>

        <View
          style={Styles.datospares}
        >
            <Text>SORTEO:</Text>
            <Text
            > {sorteo_id}</Text>
        </View>

        <View
          style={Styles.datospares}
        >
            <Text>SERIE:</Text>
            <Text
            > {serietalonario}</Text>
        </View>

        <View
          style={Styles.datospares}
        >
            <Text>BOLETO:</Text>
            <Text
            > {numero_boleto}</Text>
        </View>

        <View
          style={Styles.datospares}
        >
            <Text>PREMIOS:</Text>
            <Text
            > {descripcionarti}</Text>
        </View>

        <View
          style={Styles.datospares}
        >
            <Text>COSTO:</Text>
            <Text
            > US$ {costoarti}.00</Text>
        </View>

        <View
          style={Styles.datospares}
        >
            <Text>FECHA DE COMPRA:</Text>
            <Text
            >{fechadecompra}</Text>
        </View>

        <View
          style={Styles.datospares}
        >
            <Text>FECHA DE SORTEO:</Text>
            <Text
            >{fecha_sorteo}</Text>
        </View>

        <View
          style={Styles.datospares}
        >
            <Text>LUGAR DEL SORTEO:</Text>
            <Text
            >{lugar_sorteo}</Text>
        </View>

        <View
        
          style={Styles.datospares}
        >
            <Text>----------DATOS DEL CLIENTE----------</Text>
        </View>
        <View
          style={Styles.datospares}
        >
            <Text>NOMBRE:</Text>
            <Text
            > {nombrecli}</Text>
        </View>

        <View
          style={Styles.datospares}
        >
            <Text>APELLIDOS:</Text>
            <Text
            > {apellidocli}</Text>
        </View>

        <View
          style={Styles.datospares}
        >
            <Text>CELULAR:</Text>
            <Text
            > {celularclie}</Text>
        </View>
        <View
          style={Styles.datospares}
        >
            <Text>----------DATOS DEL VENDEDOR----------</Text>
        </View>
        <View
          style={Styles.datospares}
        >
            <Text>NOMBRE:</Text>
            <Text
            > {nombrevendedorasignado}</Text>
        </View>

        <View
          style={Styles.datospares}
        >
            <Text>APELLIDOS:</Text>
            <Text
            > {apellidovendedorasignado}</Text>
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
              //onPress={()=>GenerarBoletoComprobante(usuario_id, fecha_compra,PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE)}
              onPress={()=>GenerarBoletoComprobante(fechadecompra)}
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