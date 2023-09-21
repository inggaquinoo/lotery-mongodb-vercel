import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ListadoBoletos from '../screens/ListadoBoletos';
import ListadoSorteos from '../screens/ListadoSorteos';
import AfiliarScreen from '../screens/AfiliarScreen';
import GenerarBoleto from '../screens/GenerarBoleto';
import HabilitarNuevoSorteo from '../../backups/HabilitarNuevoSorteo';
import NuevoSorteo from '../screens/NuevoSorteo';
import NuevoBoleto from '../screens/NuevoBoleto';



const Stack = createStackNavigator();

const Navigator = () => {
    return (
        // headerShown: false -> oculta el encabezado de arriba del stack
        <Stack.Navigator  screenOptions={{ headerShown: true } } >
            <Stack.Screen name="ListadoSorteos"  options={{ title: "Lotery App" }} component={ListadoSorteos} />
            <Stack.Screen name="ListadoBoletos"  component={ListadoBoletos} />
            <Stack.Screen name="AfiliarScreen"  component={AfiliarScreen} />
            <Stack.Screen name="GenerarBoleto"  component={GenerarBoleto} />
            <Stack.Screen name="NuevoSorteo"  component={NuevoSorteo} />
            <Stack.Screen name="NuevoBoleto"  component={NuevoBoleto} />

            
            
        </Stack.Navigator>
  )
}

export default Navigator;