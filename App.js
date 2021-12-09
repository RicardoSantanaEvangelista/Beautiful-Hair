import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

import Login from "./src/pages/Login";
import Cadastrar from "./src/pages/Cadastrar";
import Routes from "./src/pages/Routes";
import AlterarAgendamento from "./src/pages/AlterarAgendamento";

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerTintColor: "#FFF",
          headerStyle: {backgroundColor: '#e91e63'},
        }}
      >
          <Stack.Screen 
            name="Login" 
            component={Login}
            options={{
              headerShown: false,
            }}
        />

        <Stack.Screen 
            name="Cadastrar" 
            component={Cadastrar} 
            options={{
              headerShown: false,
            }}
        />

        <Stack.Screen 
            name="Routes" 
            component={Routes} 
            options={{
              headerShown: false,
            }}
        />

        <Stack.Screen 
            name="Alterar Agendamento" 
            component={AlterarAgendamento} 
            
        />
    </Stack.Navigator>
    </NavigationContainer>
  );
}

