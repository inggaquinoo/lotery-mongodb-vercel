import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ListadoBoletos from '../screens/ListadoBoletos';
import ListadoSorteos from '../screens/ListadoSorteos';
import AfiliarScreen from '../screens/AfiliarScreen';
import GenerarBoleto from '../screens/GenerarBoleto';
import NuevoSorteo from '../screens/NuevoSorteo';
import GenerarVendedores from '../screens/GenerarVendedores';
import GenerarBoletos from '../screens/GenerarBoletos';
import Login from '../screens/Login';
import AsignarSeries from '../screens/AsignarSeries';
import AsignarSerieAEmpleado from '../screens/AsignarSerieAEmpleado';

const Stack = createStackNavigator();

const Navigator = () => {
    return (
        // headerShown: false -> oculta el encabezado de arriba del stack
        <Stack.Navigator  screenOptions={{ headerShown: true } } >

            <Stack.Screen name="NuevoSorteo"  component={NuevoSorteo} />
            <Stack.Screen name="GenerarVendedores"  component={GenerarVendedores} />
            <Stack.Screen name="GenerarBoletos"  component={GenerarBoletos} />


            <Stack.Screen name="Login"  options={{ title: "Lotery App" }} component={Login} />
            <Stack.Screen name="ListadoSorteos"  component={ListadoSorteos} />
            <Stack.Screen name="ListadoBoletos"  component={ListadoBoletos} />
            <Stack.Screen name="AfiliarScreen"  component={AfiliarScreen} />
            <Stack.Screen name="GenerarBoleto"  component={GenerarBoleto} />
            
            <Stack.Screen name="AsignarSeries"  component={AsignarSeries} />
            <Stack.Screen name="AsignarSerieAEmpleado"  component={AsignarSerieAEmpleado} />



            
           
            
            
            
            
            

            
            

            
            
            
            
           
            
            
           
           

            
            

            
            
            
            
        </Stack.Navigator>
  )
}

export default Navigator;