import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ListadoBoletos from '../screens/ListadoBoletos';
import ListadoSorteos from '../screens/ListadoSorteos';
import AfiliarScreen from '../screens/AfiliarScreen';
import GenerarBoleto from '../screens/GenerarBoleto';



const Stack = createStackNavigator();

const Navigator = () => {
    return (
        // headerShown: false -> oculta el encabezado de arriba del stack
        <Stack.Navigator  screenOptions={{ headerShown: true } } >
            <Stack.Screen name="ListadoSorteos"  options={{ title: "Lotery App" }} component={ListadoSorteos} />
            <Stack.Screen name="ListadoBoletos"  component={ListadoBoletos} />
            <Stack.Screen name="AfiliarScreen"  component={AfiliarScreen} />
            <Stack.Screen name="GenerarBoleto"  component={GenerarBoleto} />
            
        </Stack.Navigator>
  )
}

export default Navigator;