import React from 'react';
import {TouchableOpacity, Alert} from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons, AntDesign, SimpleLineIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

import firebase from "../config/firebase";
import Home from "./Telas/Home";
import Agendar from "./Telas/Agendar";
import Agendamentos from "./Telas/Agendamentos";

import ButtonAgendar from './Telas/components/ButtonAgendar';


export default function Routes({ navigation }) {


  function logout(){
    firebase.auth().signOut().then(() => {
        navigation.navigate("Login");
      }).catch((error) => {
        Alert.alert("[ERROR 404]", "Erro ao sair do aplicativo !");
      });

  };

  
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: '#00F0FF',
        tabBarInactiveTintColor: "#FFF",
        headerTintColor: "#FFF",
        headerStyle: {backgroundColor: '#e91e63'},
        tabBarStyle: {backgroundColor: '#e91e63'},
        tabBarItemStyle:{
          paddingBottom: 5,
          paddingTop: 5,
        }
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
          headerRight: () => (
                  <TouchableOpacity
                      onPress={() => {
                          Alert.alert(
                              'Atenção!',
                              'Deseja sair do aplicativo?',
                              [
                                  {
                                      text: 'Sim',
                                      onPress: () => {logout()},
                                  },
                                  {
                                      text: 'Não',
                                      onPress: () => console.log('Cancelado'),
                                      style: 'cancel',
                                  },
                              ],
                              { cancelable: false }
                          );
                      }}
                      style={{ padding: 10 }}
                  >
                      <SimpleLineIcons name="logout" color="#FFF" size={26} />
                  </TouchableOpacity>
              ),
        }}
      />
      <Tab.Screen
        name="Agendar"
        component={Agendar}
        options={{
          tabBarLabel: "",
          tabBarIcon: ({focused, color, size }) => (
            <ButtonAgendar colo={color} size={size} focused={focused}/>
          ),
          headerRight: () => (
            <TouchableOpacity
                onPress={() => {
                    Alert.alert(
                        'Atenção!',
                        'Deseja sair do aplicativo?',
                        [
                            {
                                text: 'Sim',
                                onPress: () => {logout()},
                            },
                            {
                                text: 'Não',
                                onPress: () => console.log('Cancelado'),
                                style: 'cancel',
                            },
                        ],
                        { cancelable: false }
                    );
                }}
                style={{ padding: 10 }}
            >
              <SimpleLineIcons name="logout" color="#FFF" size={26} />
            </TouchableOpacity>
        ),
        }}
      />
      <Tab.Screen
        name="Agendamentos"
        component={Agendamentos}
        options={{
          tabBarLabel: 'Agendamentos',
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="circledowno" size={size} color={color} />
          ),
          headerRight: () => (
            <TouchableOpacity
                onPress={() => {
                    Alert.alert(
                        'Atenção!',
                        'Deseja sair do aplicativo?',
                        [
                            {
                                text: 'Sim',
                                onPress: () => {logout()},
                            },
                            {
                                text: 'Não',
                                onPress: () => console.log('Cancelado'),
                                style: 'cancel',
                            },
                        ],
                        { cancelable: false }
                    );
                }}
                style={{ padding: 10 }}
            >
              <SimpleLineIcons name="logout" color="#FFF" size={26} />
            </TouchableOpacity>
        ),
        }}
      />
    </Tab.Navigator>
  );
}